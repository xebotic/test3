-- ============================================================================
-- BIBLE STUDY APP - INITIAL DATABASE SCHEMA
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- BIBLE TEXTS & STRUCTURE
-- ============================================================================

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    testament VARCHAR(2) NOT NULL CHECK (testament IN ('OT', 'NT')),
    original_language VARCHAR(20) NOT NULL,
    genre VARCHAR(50),
    author VARCHAR(100),
    date_written_early INT,
    date_written_late INT,
    canonical_order INT UNIQUE NOT NULL,
    chapter_count INT NOT NULL
);

CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    language VARCHAR(50) NOT NULL,
    year_published INT,
    copyright_info TEXT,
    translation_philosophy VARCHAR(50),
    license_type VARCHAR(50),
    is_original_language BOOLEAN DEFAULT FALSE
);

CREATE TABLE verses (
    id BIGSERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    chapter INT NOT NULL,
    verse INT NOT NULL,
    translation_id INT REFERENCES translations(id),
    text TEXT NOT NULL,
    text_tsv tsvector,
    UNIQUE(book_id, chapter, verse, translation_id)
);

CREATE INDEX idx_verses_reference ON verses(book_id, chapter, verse);
CREATE INDEX idx_verses_translation ON verses(translation_id);
CREATE INDEX idx_verses_fts ON verses USING GIN(text_tsv);

-- Auto-update full-text search vector
CREATE OR REPLACE FUNCTION verses_text_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.text_tsv := to_tsvector('english', NEW.text);
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER verses_text_tsv_update
  BEFORE INSERT OR UPDATE ON verses
  FOR EACH ROW EXECUTE FUNCTION verses_text_tsv_trigger();

-- ============================================================================
-- ORIGINAL LANGUAGE DATA
-- ============================================================================

CREATE TABLE original_words (
    id BIGSERIAL PRIMARY KEY,
    verse_id BIGINT REFERENCES verses(id),
    word_order INT NOT NULL,
    word TEXT NOT NULL,
    lemma TEXT NOT NULL,
    strong_number VARCHAR(10),
    morphology JSONB,
    gloss TEXT,
    transliteration TEXT,
    UNIQUE(verse_id, word_order)
);

CREATE INDEX idx_original_words_verse ON original_words(verse_id);
CREATE INDEX idx_original_words_lemma ON original_words(lemma);
CREATE INDEX idx_original_words_strong ON original_words(strong_number);
CREATE INDEX idx_original_words_morphology ON original_words USING GIN(morphology);

CREATE TABLE lexicon_entries (
    id SERIAL PRIMARY KEY,
    lemma TEXT NOT NULL,
    language VARCHAR(20) NOT NULL,
    strong_number VARCHAR(10),
    part_of_speech VARCHAR(50),
    definition TEXT NOT NULL,
    etymology TEXT,
    semantic_domain VARCHAR(100),
    louw_nida_number VARCHAR(20),
    frequency INT,
    cognates TEXT[],
    UNIQUE(lemma, language)
);

CREATE INDEX idx_lexicon_lemma ON lexicon_entries(lemma);
CREATE INDEX idx_lexicon_strong ON lexicon_entries(strong_number);

-- ============================================================================
-- LINGUISTIC ANALYSIS
-- ============================================================================

CREATE TABLE syntax_trees (
    id BIGSERIAL PRIMARY KEY,
    verse_id BIGINT REFERENCES verses(id) UNIQUE,
    tree_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE discourse_segments (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    start_chapter INT,
    start_verse INT,
    end_chapter INT,
    end_verse INT,
    segment_type VARCHAR(50),
    title VARCHAR(200),
    theme VARCHAR(200),
    rhetorical_structure JSONB
);

CREATE TABLE literary_devices (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    start_chapter INT,
    start_verse INT,
    end_chapter INT,
    end_verse INT,
    device_type VARCHAR(50),
    description TEXT,
    structure JSONB,
    confidence_score FLOAT
);

-- ============================================================================
-- TEXTUAL CRITICISM
-- ============================================================================

CREATE TABLE manuscripts (
    id SERIAL PRIMARY KEY,
    siglum VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(200),
    manuscript_type VARCHAR(50),
    date_early INT,
    date_late INT,
    location VARCHAR(100),
    text_type VARCHAR(50),
    testament VARCHAR(2) CHECK (testament IN ('OT', 'NT')),
    content_description TEXT,
    significance_rating INT CHECK (significance_rating BETWEEN 1 AND 5)
);

CREATE TABLE text_variants (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    chapter INT,
    verse INT,
    variant_unit INT,
    reading TEXT NOT NULL,
    manuscript_support TEXT[],
    probability VARCHAR(20),
    external_evidence_rating VARCHAR(2),
    internal_evidence_rating VARCHAR(2),
    notes TEXT,
    UNIQUE(book_id, chapter, verse, variant_unit, reading)
);

CREATE INDEX idx_variants_reference ON text_variants(book_id, chapter, verse);

-- ============================================================================
-- CROSS REFERENCES & CONNECTIONS
-- ============================================================================

CREATE TABLE cross_references (
    id SERIAL PRIMARY KEY,
    from_book_id INT REFERENCES books(id),
    from_chapter INT,
    from_verse INT,
    to_book_id INT REFERENCES books(id),
    to_chapter INT,
    to_verse INT,
    reference_type VARCHAR(50),
    strength INT CHECK (strength BETWEEN 1 AND 5),
    notes TEXT
);

CREATE INDEX idx_xref_from ON cross_references(from_book_id, from_chapter, from_verse);
CREATE INDEX idx_xref_to ON cross_references(to_book_id, to_chapter, to_verse);
CREATE INDEX idx_xref_type ON cross_references(reference_type);

-- ============================================================================
-- AI & SEMANTIC FEATURES
-- ============================================================================

CREATE TABLE verse_embeddings (
    verse_id BIGINT PRIMARY KEY REFERENCES verses(id),
    embedding_id VARCHAR(100),
    model_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    keywords TEXT[],
    parent_topic_id INT REFERENCES topics(id),
    created_by VARCHAR(50)
);

CREATE TABLE verse_topics (
    id BIGSERIAL PRIMARY KEY,
    verse_id BIGINT REFERENCES verses(id),
    topic_id INT REFERENCES topics(id),
    relevance_score FLOAT CHECK (relevance_score BETWEEN 0 AND 1),
    UNIQUE(verse_id, topic_id)
);

-- ============================================================================
-- HISTORICAL & ARCHAEOLOGICAL DATA
-- ============================================================================

CREATE TABLE historical_events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    date_early INT,
    date_late INT,
    date_certainty VARCHAR(20),
    location VARCHAR(200),
    event_type VARCHAR(50),
    geojson JSONB
);

CREATE TABLE event_references (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES historical_events(id),
    book_id INT REFERENCES books(id),
    chapter INT,
    verse INT,
    reference_type VARCHAR(50)
);

CREATE TABLE archaeological_sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    modern_name VARCHAR(200),
    location_lat FLOAT,
    location_lon FLOAT,
    description TEXT,
    periods TEXT[],
    significance TEXT,
    excavation_status VARCHAR(50)
);

CREATE TABLE site_references (
    id SERIAL PRIMARY KEY,
    site_id INT REFERENCES archaeological_sites(id),
    book_id INT REFERENCES books(id),
    chapter INT,
    verse INT,
    reference_type VARCHAR(50)
);

-- ============================================================================
-- COMMENTARIES & SCHOLARLY RESOURCES
-- ============================================================================

CREATE TABLE commentaries (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(200),
    year_published INT,
    publisher VARCHAR(200),
    theological_tradition VARCHAR(100),
    commentary_type VARCHAR(50),
    license_type VARCHAR(50),
    is_public_domain BOOLEAN DEFAULT FALSE
);

CREATE TABLE commentary_entries (
    id BIGSERIAL PRIMARY KEY,
    commentary_id INT REFERENCES commentaries(id),
    book_id INT REFERENCES books(id),
    chapter INT,
    verse INT,
    content TEXT NOT NULL,
    content_tsv tsvector
);

CREATE INDEX idx_commentary_ref ON commentary_entries(book_id, chapter, verse);
CREATE INDEX idx_commentary_fts ON commentary_entries USING GIN(content_tsv);

-- Auto-update full-text search vector for commentaries
CREATE OR REPLACE FUNCTION commentary_content_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.content_tsv := to_tsvector('english', NEW.content);
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER commentary_content_tsv_update
  BEFORE INSERT OR UPDATE ON commentary_entries
  FOR EACH ROW EXECUTE FUNCTION commentary_content_tsv_trigger();

-- ============================================================================
-- USER DATA SCHEMA
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE,
    display_name VARCHAR(100),
    auth_provider VARCHAR(50),
    auth_provider_id VARCHAR(255),
    preferences JSONB DEFAULT '{}',
    subscription_tier VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP
);

CREATE TABLE user_annotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id INT REFERENCES books(id),
    chapter INT,
    verse INT,
    annotation_type VARCHAR(50),
    content TEXT,
    color VARCHAR(20),
    tags TEXT[],
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_annotations_user ON user_annotations(user_id);
CREATE INDEX idx_annotations_ref ON user_annotations(book_id, chapter, verse);

CREATE TABLE reading_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT FALSE,
    duration_days INT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reading_plan_items (
    id SERIAL PRIMARY KEY,
    plan_id UUID REFERENCES reading_plans(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    book_id INT REFERENCES books(id),
    start_chapter INT,
    start_verse INT,
    end_chapter INT,
    end_verse INT,
    notes TEXT
);

CREATE TABLE user_reading_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES reading_plans(id) ON DELETE CASCADE,
    day_number INT,
    completed_at TIMESTAMP,
    UNIQUE(user_id, plan_id, day_number)
);

-- ============================================================================
-- COMMUNITY FEATURES
-- ============================================================================

CREATE TABLE study_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id),
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

CREATE TABLE discussions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id),
    book_id INT REFERENCES books(id),
    chapter INT,
    verse INT,
    title VARCHAR(200),
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE discussion_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- ANALYTICS & CACHING
-- ============================================================================

CREATE TABLE query_cache (
    cache_key VARCHAR(255) PRIMARY KEY,
    result JSONB,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usage_analytics (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    event_type VARCHAR(100),
    event_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_user ON usage_analytics(user_id);
CREATE INDEX idx_analytics_type ON usage_analytics(event_type);
CREATE INDEX idx_analytics_time ON usage_analytics(created_at);

-- ============================================================================
-- FUNCTIONS AND UTILITIES
-- ============================================================================

-- Function to get verse reference as string
CREATE OR REPLACE FUNCTION get_verse_reference(
    p_book_id INT,
    p_chapter INT,
    p_verse INT
) RETURNS TEXT AS $$
DECLARE
    v_book_code VARCHAR(10);
BEGIN
    SELECT code INTO v_book_code FROM books WHERE id = p_book_id;
    RETURN v_book_code || ' ' || p_chapter::TEXT || ':' || p_verse::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Function to search verses with full-text search
CREATE OR REPLACE FUNCTION search_verses(
    p_query TEXT,
    p_translation_id INT DEFAULT NULL,
    p_limit INT DEFAULT 100
) RETURNS TABLE (
    verse_id BIGINT,
    book_code VARCHAR(10),
    chapter INT,
    verse INT,
    text TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        v.id,
        b.code,
        v.chapter,
        v.verse,
        v.text,
        ts_rank(v.text_tsv, plainto_tsquery('english', p_query)) AS rank
    FROM verses v
    JOIN books b ON v.book_id = b.id
    WHERE
        v.text_tsv @@ plainto_tsquery('english', p_query)
        AND (p_translation_id IS NULL OR v.translation_id = p_translation_id)
    ORDER BY rank DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to get verses in a range
CREATE OR REPLACE FUNCTION get_verse_range(
    p_book_code VARCHAR(10),
    p_start_chapter INT,
    p_start_verse INT,
    p_end_chapter INT,
    p_end_verse INT,
    p_translation_id INT
) RETURNS TABLE (
    verse_id BIGINT,
    chapter INT,
    verse INT,
    text TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        v.id,
        v.chapter,
        v.verse,
        v.text
    FROM verses v
    JOIN books b ON v.book_id = b.id
    WHERE
        b.code = p_book_code
        AND v.translation_id = p_translation_id
        AND (
            (v.chapter > p_start_chapter AND v.chapter < p_end_chapter)
            OR (v.chapter = p_start_chapter AND v.verse >= p_start_verse)
            OR (v.chapter = p_end_chapter AND v.verse <= p_end_verse)
        )
    ORDER BY v.chapter, v.verse;
END;
$$ LANGUAGE plpgsql;
