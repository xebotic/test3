import { query } from '../utils/database';
import { Book, Translation, Verse, SearchResult } from '@bible-study/types';

export class BibleRepository {
  async getAllBooks(): Promise<Book[]> {
    const result = await query(`
      SELECT
        id, code, name, testament, original_language as "originalLanguage",
        genre, author, date_written_early as "dateWrittenEarly",
        date_written_late as "dateWrittenLate", canonical_order as "canonicalOrder",
        chapter_count as "chapterCount"
      FROM books
      ORDER BY canonical_order
    `);
    return result.rows;
  }

  async getBookByCode(code: string): Promise<Book | null> {
    const result = await query(
      `
      SELECT
        id, code, name, testament, original_language as "originalLanguage",
        genre, author, date_written_early as "dateWrittenEarly",
        date_written_late as "dateWrittenLate", canonical_order as "canonicalOrder",
        chapter_count as "chapterCount"
      FROM books
      WHERE code = $1
    `,
      [code.toUpperCase()]
    );
    return result.rows[0] || null;
  }

  async getAllTranslations(): Promise<Translation[]> {
    const result = await query(`
      SELECT
        id, code, name, language, year_published as "yearPublished",
        copyright_info as "copyrightInfo", translation_philosophy as "translationPhilosophy",
        license_type as "licenseType", is_original_language as "isOriginalLanguage"
      FROM translations
      ORDER BY name
    `);
    return result.rows;
  }

  async getTranslationByCode(code: string): Promise<Translation | null> {
    const result = await query(
      `
      SELECT
        id, code, name, language, year_published as "yearPublished",
        copyright_info as "copyrightInfo", translation_philosophy as "translationPhilosophy",
        license_type as "licenseType", is_original_language as "isOriginalLanguage"
      FROM translations
      WHERE code = $1
    `,
      [code.toUpperCase()]
    );
    return result.rows[0] || null;
  }

  async getVerse(
    bookCode: string,
    chapter: number,
    verse: number,
    translationCode: string = 'KJV'
  ): Promise<Verse | null> {
    const result = await query(
      `
      SELECT
        v.id, v.book_id as "bookId", v.chapter, v.verse,
        v.translation_id as "translationId", v.text
      FROM verses v
      JOIN books b ON v.book_id = b.id
      JOIN translations t ON v.translation_id = t.id
      WHERE b.code = $1 AND v.chapter = $2 AND v.verse = $3 AND t.code = $4
    `,
      [bookCode.toUpperCase(), chapter, verse, translationCode.toUpperCase()]
    );
    return result.rows[0] || null;
  }

  async getChapter(
    bookCode: string,
    chapter: number,
    translationCode: string = 'KJV'
  ): Promise<Verse[]> {
    const result = await query(
      `
      SELECT
        v.id, v.book_id as "bookId", v.chapter, v.verse,
        v.translation_id as "translationId", v.text
      FROM verses v
      JOIN books b ON v.book_id = b.id
      JOIN translations t ON v.translation_id = t.id
      WHERE b.code = $1 AND v.chapter = $2 AND t.code = $3
      ORDER BY v.verse
    `,
      [bookCode.toUpperCase(), chapter, translationCode.toUpperCase()]
    );
    return result.rows;
  }

  async getVerseRange(
    bookCode: string,
    startChapter: number,
    startVerse: number,
    endChapter: number,
    endVerse: number,
    translationCode: string = 'KJV'
  ): Promise<Verse[]> {
    const result = await query(
      `
      SELECT
        v.id, v.book_id as "bookId", v.chapter, v.verse,
        v.translation_id as "translationId", v.text
      FROM verses v
      JOIN books b ON v.book_id = b.id
      JOIN translations t ON v.translation_id = t.id
      WHERE b.code = $1
        AND t.code = $2
        AND (
          (v.chapter > $3 AND v.chapter < $4)
          OR (v.chapter = $3 AND v.verse >= $5)
          OR (v.chapter = $4 AND v.verse <= $6)
        )
      ORDER BY v.chapter, v.verse
    `,
      [
        bookCode.toUpperCase(),
        translationCode.toUpperCase(),
        startChapter,
        endChapter,
        startVerse,
        endVerse,
      ]
    );
    return result.rows;
  }

  async searchVerses(
    searchQuery: string,
    translationCode?: string,
    testament?: 'OT' | 'NT',
    limit: number = 100
  ): Promise<SearchResult> {
    let whereClause = 'v.text_tsv @@ plainto_tsquery($1)';
    const params: any[] = [searchQuery];
    let paramIndex = 2;

    if (translationCode) {
      whereClause += ` AND t.code = $${paramIndex}`;
      params.push(translationCode.toUpperCase());
      paramIndex++;
    }

    if (testament) {
      whereClause += ` AND b.testament = $${paramIndex}`;
      params.push(testament);
      paramIndex++;
    }

    // Get total count
    const countResult = await query(
      `
      SELECT COUNT(*) as total
      FROM verses v
      JOIN books b ON v.book_id = b.id
      JOIN translations t ON v.translation_id = t.id
      WHERE ${whereClause}
    `,
      params
    );

    const total = parseInt(countResult.rows[0].total);

    // Get results with ranking
    params.push(limit);
    const result = await query(
      `
      SELECT
        v.id, v.book_id as "bookId", v.chapter, v.verse,
        v.translation_id as "translationId", v.text,
        b.code as "bookCode", b.name as "bookName",
        ts_rank(v.text_tsv, plainto_tsquery($1)) as rank
      FROM verses v
      JOIN books b ON v.book_id = b.id
      JOIN translations t ON v.translation_id = t.id
      WHERE ${whereClause}
      ORDER BY rank DESC, b.canonical_order, v.chapter, v.verse
      LIMIT $${paramIndex}
    `,
      params
    );

    return {
      verses: result.rows,
      total,
      query: searchQuery,
    };
  }

  async getChapterVerseCount(bookCode: string, chapter: number): Promise<number> {
    const result = await query(
      `
      SELECT COUNT(*) as count
      FROM verses v
      JOIN books b ON v.book_id = b.id
      WHERE b.code = $1 AND v.chapter = $2
      GROUP BY v.chapter
    `,
      [bookCode.toUpperCase(), chapter]
    );
    return result.rows[0]?.count || 0;
  }

  async bulkInsertVerses(verses: Array<{
    bookId: number;
    chapter: number;
    verse: number;
    translationId: number;
    text: string;
  }>): Promise<void> {
    if (verses.length === 0) return;

    const values = verses.map((v, i) => {
      const offset = i * 5;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`;
    }).join(', ');

    const params = verses.flatMap(v => [
      v.bookId,
      v.chapter,
      v.verse,
      v.translationId,
      v.text,
    ]);

    await query(
      `
      INSERT INTO verses (book_id, chapter, verse, translation_id, text)
      VALUES ${values}
      ON CONFLICT (book_id, chapter, verse, translation_id) DO NOTHING
    `,
      params
    );
  }
}

export const bibleRepository = new BibleRepository();
