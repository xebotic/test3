# Bible Pro

**The World's Most Advanced Bible Study Platform**

Bible Pro is a next-generation Bible study application that combines cutting-edge technology with deep biblical scholarship. Built for everyone from casual readers to professional theologians, Bible Pro offers unprecedented access to original languages, linguistic analysis, historical context, and AI-powered insights.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

> *"Making the deepest biblical scholarship accessible to everyone."*

## ✨ What Makes Bible Pro Different

### 🎯 For Everyone
- **Casual Readers**: Beautiful, distraction-free reading experience
- **Bible Study Groups**: Collaborative tools and shared insights
- **Seminary Students**: Advanced linguistic analysis and research tools
- **Scholars**: Manuscript variants, textual criticism, and original languages
- **Pastors**: Sermon preparation with cross-references and contextual insights

### 🚀 Current Features (v0.2 - Phase 2)

**Core Reading Experience**
- ✅ Clean, responsive Bible reader
- ✅ 66 books of the Bible (Old & New Testament)
- ✅ Multiple translations support (KJV, WEB, ASV)
- ✅ Chapter navigation with Previous/Next
- ✅ Fast full-text search across all verses
- ✅ Verse-by-verse display with reference numbers

**Technical Foundation**
- ✅ Enterprise-grade PostgreSQL database
- ✅ RESTful API with comprehensive endpoints
- ✅ Modern Next.js 14 web application
- ✅ Type-safe TypeScript throughout
- ✅ Docker containerization for easy deployment
- ✅ Scalable microservices architecture

### 🔮 Coming Soon - Revolutionary Features

**Original Language Mastery** (Phase 3-4)
- 📚 Hebrew Old Testament (Masoretic Text)
- 📚 Greek New Testament (NA28, Textus Receptus)
- 🔤 Complete morphological parsing
- 📖 Interlinear word-by-word translation
- 📕 Comprehensive lexicons (BDAG, BDB, HALOT)
- 🌳 Syntax tree visualization
- 💬 Etymology and semantic domains

**Advanced Linguistic Analysis** (Phase 4-5)
- 🎭 Literary device detection (chiasms, parallelism, metaphors)
- 📊 Discourse analysis and structure
- 🔗 Cross-reference network visualization
- 📜 Textual criticism with manuscript variants
- 🏛️ Historical and cultural context
- 🗺️ Interactive biblical maps and timelines

**AI-Powered Intelligence** (Phase 5-6)
- 🤖 Natural language question answering
- 🔍 Semantic search (find concepts, not just words)
- 🏷️ Automatic topic modeling and categorization
- 📝 AI-generated study guides and summaries
- 💡 Contextual insights and connections
- 🎓 Personalized learning paths

**Community & Collaboration** (Phase 6-7)
- 👥 Study groups with real-time collaboration
- 💬 Discussion forums by book and topic
- ✍️ Shared annotations and highlights
- 📱 Mobile apps (iOS & Android)
- 🔄 Cross-device synchronization
- 📊 Reading plans and progress tracking

## 🏗️ Architecture

Bible Pro uses a modern, scalable microservices architecture designed for performance and extensibility.

```
bible-pro/
├── apps/
│   ├── web/                 # Next.js 14 web application
│   │   ├── src/app/         # App router pages
│   │   ├── src/components/  # React components
│   │   └── src/lib/         # Client utilities
│   └── mobile/              # React Native (iOS & Android) - Planned
│
├── services/
│   ├── content-service/     # Bible content REST API (Node.js + Express)
│   ├── nlp-service/         # NLP & linguistic analysis (Python + FastAPI) - Planned
│   ├── api-gateway/         # GraphQL Federation gateway - Planned
│   └── user-service/        # Authentication & user management - Planned
│
├── packages/
│   ├── types/               # Shared TypeScript type definitions
│   ├── ui/                  # Reusable UI component library - Planned
│   └── utils/               # Shared utility functions - Planned
│
├── data/
│   ├── migrations/          # PostgreSQL schema migrations
│   ├── seeds/               # Initial data (books, translations)
│   ├── sample/              # Sample Bible verses for testing
│   └── scripts/             # Data import and maintenance scripts
│
└── infrastructure/
    ├── docker/              # Docker configurations
    └── kubernetes/          # K8s manifests - Planned
```

### Technology Stack

**Frontend**
- ⚛️ **Next.js 14** - React framework with App Router
- 📘 **TypeScript** - Type safety throughout
- 🎨 **Tailwind CSS** - Utility-first styling
- 🔄 **TanStack Query** - Server state management
- 🐻 **Zustand** - Client state management

**Backend**
- 🟢 **Node.js + Express** - Content API service
- 🐍 **Python + FastAPI** - NLP service (planned)
- 🔷 **GraphQL** - Unified API gateway (planned)
- 🗄️ **PostgreSQL 15** - Primary database
- 📦 **Redis** - Caching layer

**Infrastructure**
- 🐳 **Docker** - Containerization
- ☸️ **Kubernetes** - Orchestration (planned)
- 🔄 **Turbo** - Monorepo build system
- 🚀 **Vercel** - Frontend deployment (planned)
- ☁️ **AWS/GCP** - Cloud hosting (planned)

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

## 🤝 Contributing

We welcome contributions from developers, theologians, linguists, and Bible enthusiasts! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute
- 💻 Code contributions (features, bug fixes)
- 📚 Bible data and translations
- 🌍 Translations and internationalization
- 📖 Documentation improvements
- 🐛 Bug reports and feature requests
- 💡 Ideas and suggestions

## 📄 License

Bible Pro is open source software licensed under the MIT License. See [LICENSE](LICENSE) for details.

### Data Licenses
- Public domain Bible translations (KJV, ASV, WEB)
- Licensed translations require separate agreements
- See [DATA_SOURCES.md](docs/DATA_SOURCES.md) for full attribution

## 🙏 Acknowledgments

Bible Pro stands on the shoulders of giants. We're grateful to:

**Data Sources**
- [eBible.org](https://ebible.org/) - World English Bible and other translations
- [OpenScriptures](https://github.com/openscriptures) - Morphological analysis data
- [Berean Bible](https://berean.bible/) - Interlinear resources
- [API.Bible](https://scripture.api.bible/) - Bible API inspiration

**Tools & Libraries**
- [Classical Language Toolkit (CLTK)](http://cltk.org/) - Ancient language NLP
- [Stanford NLP](https://stanfordnlp.github.io/stanza/) - Linguistic analysis
- All the amazing open-source projects we depend on

**Community**
- Biblical scholars who've digitized ancient texts
- Translators who've made the Bible accessible
- The open-source community

## 🌟 Supporters

Want to support Bible Pro development?
- ⭐ Star this repository
- 🐦 Share with your community
- 💝 Sponsor development (coming soon)
- 🤝 Contribute code or data

## 📞 Contact & Community

- **Website**: [biblepro.app](https://biblepro.app) *(coming soon)*
- **Issues**: [GitHub Issues](https://github.com/xebotic/test3/issues)
- **Discussions**: [GitHub Discussions](https://github.com/xebotic/test3/discussions)
- **Twitter**: [@BibleProApp](https://twitter.com/BibleProApp) *(coming soon)*

## 📊 Project Status

**Current Version**: 0.2.0 (Phase 2 - Foundation Complete)
**Status**: Active Development
**Next Release**: v0.3.0 (Q2 2026) - Original Language Support

See [ROADMAP.md](docs/ROADMAP.md) for detailed development timeline.

---

<div align="center">

**Built with ❤️ for the glory of God and the advancement of biblical scholarship**

*"Your word is a lamp to my feet and a light to my path." - Psalm 119:105*

[⬆ Back to Top](#bible-pro)

</div>
