# Quick Start Guide

Get the Bible Study App running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Git

## Step 1: Start the Database

```bash
# Start PostgreSQL and Redis with Docker
docker-compose up -d postgres redis

# Wait a few seconds for the database to be ready
sleep 5
```

## Step 2: Initialize the Database

The database schema and seed data will be automatically loaded when PostgreSQL starts.

If you need to manually run migrations:

```bash
# Run schema migration
docker exec -i bible-study-postgres psql -U bibleuser -d bible_study < data/migrations/001_initial_schema.sql

# Run seed data
docker exec -i bible-study-postgres psql -U bibleuser -d bible_study < data/seeds/001_books_and_translations.sql
```

## Step 3: Install Dependencies

```bash
# Install all dependencies for the monorepo
npm install
```

## Step 4: Import Sample Bible Data

```bash
# Import sample KJV verses (Genesis 1, Matthew 5, John 1, 3, 14)
npm run db:import data/sample/john-kjv-sample.json KJV
```

You should see output like:
```
✓ Imported 33 verses for JHN
✓ Imported 6 verses for MAT
✓ Imported 3 verses for GEN
✅ Import completed successfully!
```

## Step 5: Start the Services

Open **three terminal windows**:

### Terminal 1: Content API Service
```bash
cd services/content-service
npm install
npm run dev
```

You should see: `Content service running on port 3001`

### Terminal 2: Next.js Web App
```bash
cd apps/web
npm install
npm run dev
```

You should see: `Ready - started server on 0.0.0.0:3000`

### Terminal 3: (Optional) Watch for changes
```bash
# From the root directory
npm run dev
```

## Step 6: Open the App

Open your browser and navigate to:
- **Web App**: http://localhost:3000
- **Bible Reader**: http://localhost:3000/read
- **API Health Check**: http://localhost:3001/health
- **pgAdmin** (Database UI): http://localhost:5050

## Verify Everything Works

1. Go to http://localhost:3000/read
2. Select "John" from the book dropdown
3. Select chapter "1"
4. You should see John 1:1-18 displayed!

Try:
- Navigating between chapters
- Selecting different books (Genesis, Matthew, John)
- The "Previous" and "Next" buttons

## Troubleshooting

### Database Connection Failed
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs bible-study-postgres

# Restart the database
docker-compose restart postgres
```

### API Not Starting
```bash
# Make sure DATABASE_URL is set
echo $DATABASE_URL

# Or create .env file
cp .env.example .env
# Edit .env and ensure DATABASE_URL is correct
```

### No Verses Showing
```bash
# Verify data was imported
docker exec -i bible-study-postgres psql -U bibleuser -d bible_study -c "SELECT COUNT(*) FROM verses;"

# Should show: count = 33 (or more)

# Re-import if needed
npm run db:import data/sample/john-kjv-sample.json KJV
```

## Next Steps

### Import More Bible Data

You can import additional Bible data by creating JSON files in the same format:

```json
[
  {
    "book": "ROM",
    "chapter": 8,
    "verse": 28,
    "text": "And we know that all things work together for good..."
  }
]
```

Then import:
```bash
npm run db:import your-data.json KJV
```

### Explore the API

Try these API endpoints:

```bash
# Get all books
curl http://localhost:3001/api/bible/books

# Get a specific verse
curl "http://localhost:3001/api/bible/verses/JHN/3/16?translation=KJV"

# Search for verses
curl "http://localhost:3001/api/bible/search?q=love&translation=KJV"

# Get all translations
curl http://localhost:3001/api/bible/translations
```

### Database Management

Access pgAdmin at http://localhost:5050:
- Email: admin@biblestudy.local
- Password: admin

Add a server:
- Host: postgres
- Port: 5432
- Database: bible_study
- Username: bibleuser
- Password: biblepass

## Development Workflow

### Making Changes

1. Edit files in `apps/web/` or `services/content-service/`
2. Changes will hot-reload automatically
3. Database schema changes require running migrations

### Running Tests (Coming Soon)
```bash
npm test
```

### Linting and Formatting
```bash
npm run lint
npm run format
```

## What's Next?

Check out the main [README.md](./README.md) for:
- Full feature list
- Architecture overview
- Development roadmap
- Contributing guidelines

## Support

For issues or questions:
- Check the [README.md](./README.md)
- Review the [documentation](./docs/)
- Open an issue on GitHub

---

Happy Bible studying! 📖✨
