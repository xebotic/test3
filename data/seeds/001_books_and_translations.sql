-- ============================================================================
-- SEED DATA: Books and Translations
-- ============================================================================

-- Insert Bible Books
INSERT INTO books (code, name, testament, original_language, genre, canonical_order, chapter_count) VALUES
-- Old Testament
('GEN', 'Genesis', 'OT', 'Hebrew', 'Law', 1, 50),
('EXO', 'Exodus', 'OT', 'Hebrew', 'Law', 2, 40),
('LEV', 'Leviticus', 'OT', 'Hebrew', 'Law', 3, 27),
('NUM', 'Numbers', 'OT', 'Hebrew', 'Law', 4, 36),
('DEU', 'Deuteronomy', 'OT', 'Hebrew', 'Law', 5, 34),
('JOS', 'Joshua', 'OT', 'Hebrew', 'History', 6, 24),
('JDG', 'Judges', 'OT', 'Hebrew', 'History', 7, 21),
('RUT', 'Ruth', 'OT', 'Hebrew', 'History', 8, 4),
('1SA', '1 Samuel', 'OT', 'Hebrew', 'History', 9, 31),
('2SA', '2 Samuel', 'OT', 'Hebrew', 'History', 10, 24),
('1KI', '1 Kings', 'OT', 'Hebrew', 'History', 11, 22),
('2KI', '2 Kings', 'OT', 'Hebrew', 'History', 12, 25),
('1CH', '1 Chronicles', 'OT', 'Hebrew', 'History', 13, 29),
('2CH', '2 Chronicles', 'OT', 'Hebrew', 'History', 14, 36),
('EZR', 'Ezra', 'OT', 'Hebrew', 'History', 15, 10),
('NEH', 'Nehemiah', 'OT', 'Hebrew', 'History', 16, 13),
('EST', 'Esther', 'OT', 'Hebrew', 'History', 17, 10),
('JOB', 'Job', 'OT', 'Hebrew', 'Wisdom', 18, 42),
('PSA', 'Psalms', 'OT', 'Hebrew', 'Wisdom', 19, 150),
('PRO', 'Proverbs', 'OT', 'Hebrew', 'Wisdom', 20, 31),
('ECC', 'Ecclesiastes', 'OT', 'Hebrew', 'Wisdom', 21, 12),
('SNG', 'Song of Solomon', 'OT', 'Hebrew', 'Wisdom', 22, 8),
('ISA', 'Isaiah', 'OT', 'Hebrew', 'Prophecy', 23, 66),
('JER', 'Jeremiah', 'OT', 'Hebrew', 'Prophecy', 24, 52),
('LAM', 'Lamentations', 'OT', 'Hebrew', 'Prophecy', 25, 5),
('EZK', 'Ezekiel', 'OT', 'Hebrew', 'Prophecy', 26, 48),
('DAN', 'Daniel', 'OT', 'Hebrew', 'Prophecy', 27, 12),
('HOS', 'Hosea', 'OT', 'Hebrew', 'Prophecy', 28, 14),
('JOL', 'Joel', 'OT', 'Hebrew', 'Prophecy', 29, 3),
('AMO', 'Amos', 'OT', 'Hebrew', 'Prophecy', 30, 9),
('OBA', 'Obadiah', 'OT', 'Hebrew', 'Prophecy', 31, 1),
('JON', 'Jonah', 'OT', 'Hebrew', 'Prophecy', 32, 4),
('MIC', 'Micah', 'OT', 'Hebrew', 'Prophecy', 33, 7),
('NAM', 'Nahum', 'OT', 'Hebrew', 'Prophecy', 34, 3),
('HAB', 'Habakkuk', 'OT', 'Hebrew', 'Prophecy', 35, 3),
('ZEP', 'Zephaniah', 'OT', 'Hebrew', 'Prophecy', 36, 3),
('HAG', 'Haggai', 'OT', 'Hebrew', 'Prophecy', 37, 2),
('ZEC', 'Zechariah', 'OT', 'Hebrew', 'Prophecy', 38, 14),
('MAL', 'Malachi', 'OT', 'Hebrew', 'Prophecy', 39, 4),
-- New Testament
('MAT', 'Matthew', 'NT', 'Greek', 'Gospel', 40, 28),
('MRK', 'Mark', 'NT', 'Greek', 'Gospel', 41, 16),
('LUK', 'Luke', 'NT', 'Greek', 'Gospel', 42, 24),
('JHN', 'John', 'NT', 'Greek', 'Gospel', 43, 21),
('ACT', 'Acts', 'NT', 'Greek', 'History', 44, 28),
('ROM', 'Romans', 'NT', 'Greek', 'Epistle', 45, 16),
('1CO', '1 Corinthians', 'NT', 'Greek', 'Epistle', 46, 16),
('2CO', '2 Corinthians', 'NT', 'Greek', 'Epistle', 47, 13),
('GAL', 'Galatians', 'NT', 'Greek', 'Epistle', 48, 6),
('EPH', 'Ephesians', 'NT', 'Greek', 'Epistle', 49, 6),
('PHP', 'Philippians', 'NT', 'Greek', 'Epistle', 50, 4),
('COL', 'Colossians', 'NT', 'Greek', 'Epistle', 51, 4),
('1TH', '1 Thessalonians', 'NT', 'Greek', 'Epistle', 52, 5),
('2TH', '2 Thessalonians', 'NT', 'Greek', 'Epistle', 53, 3),
('1TI', '1 Timothy', 'NT', 'Greek', 'Epistle', 54, 6),
('2TI', '2 Timothy', 'NT', 'Greek', 'Epistle', 55, 4),
('TIT', 'Titus', 'NT', 'Greek', 'Epistle', 56, 3),
('PHM', 'Philemon', 'NT', 'Greek', 'Epistle', 57, 1),
('HEB', 'Hebrews', 'NT', 'Greek', 'Epistle', 58, 13),
('JAS', 'James', 'NT', 'Greek', 'Epistle', 59, 5),
('1PE', '1 Peter', 'NT', 'Greek', 'Epistle', 60, 5),
('2PE', '2 Peter', 'NT', 'Greek', 'Epistle', 61, 3),
('1JN', '1 John', 'NT', 'Greek', 'Epistle', 62, 5),
('2JN', '2 John', 'NT', 'Greek', 'Epistle', 63, 1),
('3JN', '3 John', 'NT', 'Greek', 'Epistle', 64, 1),
('JUD', 'Jude', 'NT', 'Greek', 'Epistle', 65, 1),
('REV', 'Revelation', 'NT', 'Greek', 'Apocalyptic', 66, 22);

-- Insert Translations
INSERT INTO translations (code, name, language, year_published, translation_philosophy, license_type, is_original_language) VALUES
('KJV', 'King James Version', 'English', 1611, 'formal', 'Public Domain', FALSE),
('WEB', 'World English Bible', 'English', 2000, 'formal', 'Public Domain', FALSE),
('ASV', 'American Standard Version', 'English', 1901, 'formal', 'Public Domain', FALSE),
('YLT', 'Youngs Literal Translation', 'English', 1898, 'formal', 'Public Domain', FALSE),
('WLC', 'Westminster Leningrad Codex', 'Hebrew', NULL, 'formal', 'Public Domain', TRUE),
('NA28', 'Nestle-Aland 28th Edition', 'Greek', 2012, 'formal', 'Licensed', TRUE);

-- Sample Cross References (just a few examples)
INSERT INTO cross_references (from_book_id, from_chapter, from_verse, to_book_id, to_chapter, to_verse, reference_type, strength) VALUES
-- John 3:16 -> Genesis 22:2 (God's only son)
(43, 3, 16, 1, 22, 2, 'thematic', 4),
-- Matthew 1:23 -> Isaiah 7:14 (Virgin birth prophecy)
(40, 1, 23, 23, 7, 14, 'quotation', 5),
-- Romans 3:23 -> Romans 6:23 (Sin and salvation)
(45, 3, 23, 45, 6, 23, 'thematic', 4);

-- Sample Topics
INSERT INTO topics (name, description, keywords, created_by) VALUES
('Salvation', 'The doctrine of salvation through Jesus Christ', ARRAY['salvation', 'saved', 'redemption', 'grace'], 'system'),
('Faith', 'Trust and belief in God', ARRAY['faith', 'believe', 'trust'], 'system'),
('Love', 'God''s love and love for others', ARRAY['love', 'agape', 'charity'], 'system'),
('Prayer', 'Communication with God', ARRAY['prayer', 'pray', 'supplication'], 'system'),
('Prophecy', 'Prophetic utterances and fulfillments', ARRAY['prophecy', 'prophet', 'foretell'], 'system'),
('Creation', 'The creation of the world and humanity', ARRAY['creation', 'created', 'made'], 'system'),
('Covenant', 'God''s covenants with His people', ARRAY['covenant', 'promise', 'testament'], 'system'),
('Judgment', 'Divine judgment and justice', ARRAY['judgment', 'judge', 'justice'], 'system'),
('Kingdom of God', 'The reign and rule of God', ARRAY['kingdom', 'reign', 'rule'], 'system'),
('Resurrection', 'The resurrection of Christ and believers', ARRAY['resurrection', 'risen', 'raised'], 'system');
