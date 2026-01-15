# Bible Study App

A world-class Bible study application with advanced linguistic analysis, original language support, and AI-powered features.

## 🌟 Features

### Current (Phase 1 - Foundation)
- ✅ Monorepo architecture with multiple services
- ✅ Database schema for comprehensive Bible data
- ✅ Next.js 14 web application
- ✅ Content API service with Express
- ✅ Docker development environment

### Planned Features
- **Original Language Analysis**: Hebrew, Greek, and Aramaic texts with full morphological parsing
- **Linguistic Tools**: Syntax trees, discourse analysis, literary device detection
- **Textual Criticism**: Manuscript variants and critical apparatus
- **AI-Powered Features**: Semantic search, question answering, topic modeling
- **Historical Context**: Timeline, archaeological sites, cultural background
- **Community Features**: Study groups, discussions, shared annotations
- **Mobile Apps**: iOS and Android applications

## 🏗️ Architecture

```
bible-study-app/
├── apps/
│   ├── web/                 # Next.js web application
│   └── mobile/              # React Native app (planned)
├── services/
│   ├── content-service/     # Bible content API (Node.js)
│   ├── nlp-service/         # NLP and linguistic analysis (Python)
│   ├── api-gateway/         # GraphQL gateway
│   └── user-service/        # User management and auth
├── packages/
│   ├── types/               # Shared TypeScript types
│   ├── ui/                  # Shared UI components
│   └── utils/               # Shared utilities
├── data/
│   ├── migrations/          # Database migrations
│   ├── seeds/               # Seed data
│   └── scripts/             # Data import scripts
└── infrastructure/
    └── docker/              # Docker configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- PostgreSQL 15+ (via Docker)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bible-study-app
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start the database with Docker:
```bash
docker-compose up -d postgres redis
```

4. Install dependencies:
```bash
npm install
```

5. Run database migrations:
```bash
# The migrations will run automatically when PostgreSQL starts
# Or manually run:
docker exec -i bible-study-postgres psql -U bibleuser -d bible_study < data/migrations/001_initial_schema.sql
docker exec -i bible-study-postgres psql -U bibleuser -d bible_study < data/seeds/001_books_and_translations.sql
```

6. Start the development servers:
```bash
# Start all services
npm run dev

# Or start individually:
# Web app
cd apps/web && npm run dev

# Content service
cd services/content-service && npm run dev
```

### Accessing the Application

- **Web App**: http://localhost:3000
- **Content API**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **pgAdmin**: http://localhost:5050 (admin@biblestudy.local / admin)

## 📦 Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **TanStack Query**: Server state management
- **Zustand**: Client state management

### Backend
- **Node.js + Express**: Content API service
- **Python + FastAPI**: NLP service (planned)
- **GraphQL**: API gateway (planned)
- **PostgreSQL**: Primary database
- **Redis**: Caching and sessions

### Infrastructure
- **Docker**: Containerization
- **Turbo**: Monorepo build system
- **GitHub Actions**: CI/CD (planned)

## 🗄️ Database Schema

The database includes comprehensive tables for:
- **Bible Content**: Books, translations, verses
- **Original Languages**: Hebrew/Greek words with morphology
- **Linguistic Data**: Syntax trees, discourse segments, literary devices
- **Textual Criticism**: Manuscripts and text variants
- **Cross References**: Quotations, allusions, thematic links
- **AI Features**: Embeddings, topics, semantic connections
- **User Data**: Annotations, reading plans, preferences
- **Community**: Study groups, discussions

See `data/migrations/001_initial_schema.sql` for full schema.

## 📚 API Endpoints

### Health Check
```
GET /health              # Service health status
GET /health/ready        # Readiness check
```

### Bible Content
```
GET /api/bible/books                    # List all books
GET /api/bible/books/:code              # Get specific book
GET /api/bible/verses/:book/:chapter    # Get chapter
GET /api/bible/verses/:book/:chapter/:verse  # Get verse
GET /api/bible/search?q=query           # Search verses
GET /api/bible/translations             # List translations
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in specific package
cd apps/web && npm test
cd services/content-service && npm test
```

## 🎨 Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Format all files
npm run format

# Lint all files
npm run lint
```

## 📖 Development Roadmap

### Phase 1: Foundation (Months 1-3) ✅ In Progress
- [x] Project setup and architecture
- [x] Database schema
- [x] Basic web application
- [x] Content API service
- [ ] Bible text data import
- [ ] Basic reading interface

### Phase 2: Original Languages (Months 4-6)
- [ ] Hebrew and Greek text import
- [ ] Morphological analysis
- [ ] Interlinear display
- [ ] Lexicon integration

### Phase 3: Advanced Linguistics (Months 7-9)
- [ ] Syntax tree visualization
- [ ] Discourse analysis
- [ ] Literary device detection

### Phase 4: AI Features (Months 10-15)
- [ ] Semantic search
- [ ] Question answering
- [ ] Topic modeling
- [ ] AI study guides

### Phase 5: Community & Mobile (Months 16-24)
- [ ] Study groups
- [ ] Mobile applications
- [ ] Reading plans
- [ ] Social features

See `docs/architecture/` for detailed implementation plans.

## 🤝 Contributing

This project is currently in early development. Contribution guidelines will be added soon.

## 📄 License

[To be determined]

## 🙏 Acknowledgments

This project leverages several open-source resources:
- Public domain Bible translations (KJV, WEB, ASV)
- OpenScriptures morphological data
- CLTK for linguistic analysis
- And many other open-source tools and libraries

## 📧 Contact

[Contact information to be added]

---

Built with ❤️ for Bible study and scholarly research.
