import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://bibleuser:biblepass@localhost:5432/bible_study',
});

interface VerseData {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

async function getBookId(bookCode: string): Promise<number> {
  const result = await pool.query('SELECT id FROM books WHERE code = $1', [bookCode]);
  if (result.rows.length === 0) {
    throw new Error(`Book with code ${bookCode} not found`);
  }
  return result.rows[0].id;
}

async function getTranslationId(translationCode: string): Promise<number> {
  const result = await pool.query('SELECT id FROM translations WHERE code = $1', [
    translationCode,
  ]);
  if (result.rows.length === 0) {
    throw new Error(`Translation with code ${translationCode} not found`);
  }
  return result.rows[0].id;
}

async function importVerses(
  verses: VerseData[],
  translationCode: string
): Promise<void> {
  const translationId = await getTranslationId(translationCode);

  // Group verses by book
  const versesByBook = verses.reduce((acc, verse) => {
    if (!acc[verse.book]) {
      acc[verse.book] = [];
    }
    acc[verse.book].push(verse);
    return acc;
  }, {} as Record<string, VerseData[]>);

  for (const [bookCode, bookVerses] of Object.entries(versesByBook)) {
    console.log(`Importing ${bookVerses.length} verses for ${bookCode}...`);
    const bookId = await getBookId(bookCode);

    // Insert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < bookVerses.length; i += batchSize) {
      const batch = bookVerses.slice(i, i + batchSize);

      const values = batch
        .map((_, idx) => {
          const offset = idx * 5;
          return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`;
        })
        .join(', ');

      const params = batch.flatMap((v) => [bookId, v.chapter, v.verse, translationId, v.text]);

      await pool.query(
        `
        INSERT INTO verses (book_id, chapter, verse, translation_id, text)
        VALUES ${values}
        ON CONFLICT (book_id, chapter, verse, translation_id)
        DO UPDATE SET text = EXCLUDED.text
      `,
        params
      );
    }

    console.log(`✓ Imported ${bookVerses.length} verses for ${bookCode}`);
  }
}

async function importFromJSON(filePath: string, translationCode: string): Promise<void> {
  console.log(`Reading ${filePath}...`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!Array.isArray(data)) {
    throw new Error('JSON file must contain an array of verses');
  }

  console.log(`Found ${data.length} verses to import`);
  await importVerses(data, translationCode);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: ts-node importBibleText.ts <json-file> <translation-code>');
    console.error('Example: ts-node importBibleText.ts john-kjv.json KJV');
    process.exit(1);
  }

  const [jsonFile, translationCode] = args;
  const filePath = path.resolve(process.cwd(), jsonFile);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  try {
    await importFromJSON(filePath, translationCode);
    console.log('\n✅ Import completed successfully!');
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
