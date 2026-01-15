# Bible Text Import Scripts

This directory contains scripts for importing Bible text data into the database.

## Prerequisites

- PostgreSQL database running (via Docker or local)
- Database initialized with schema from `data/migrations/001_initial_schema.sql`
- Seed data loaded from `data/seeds/001_books_and_translations.sql`

## Import Bible Text

### Using the TypeScript Import Script

```bash
# Install dependencies first
npm install

# Run the import script
npx tsx data/scripts/importBibleText.ts <json-file> <translation-code>

# Example: Import sample KJV data
npx tsx data/scripts/importBibleText.ts data/sample/john-kjv-sample.json KJV
```

### JSON File Format

The JSON file should contain an array of verse objects:

```json
[
  {
    "book": "JHN",
    "chapter": 1,
    "verse": 1,
    "text": "In the beginning was the Word..."
  },
  ...
]
```

**Fields:**
- `book`: 3-letter book code (e.g., "GEN", "JHN", "ROM")
- `chapter`: Chapter number (integer)
- `verse`: Verse number (integer)
- `text`: The verse text (string)

## Data Sources

For production use, you can import Bible text from various sources:

### Public Domain Translations
- **King James Version (KJV)**: Available from multiple sources
- **World English Bible (WEB)**: https://ebible.org/web/
- **American Standard Version (ASV)**: Public domain

### APIs and Datasets
- **API.Bible**: https://scripture.api.bible/
- **Berean Bible**: https://berean.bible/downloads.htm
- **Open Scriptures**: https://github.com/openscriptures

## Creating Your Own Import Script

You can create custom import scripts for different formats:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Your custom import logic here
```

See `importBibleText.ts` for a complete example.
