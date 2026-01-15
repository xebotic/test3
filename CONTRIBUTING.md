# Contributing to Bible Pro

Thank you for your interest in contributing to Bible Pro! We welcome contributions from developers, theologians, linguists, designers, and Bible enthusiasts.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Data Contributions](#data-contributions)
- [Community](#community)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@biblepro.app](mailto:conduct@biblepro.app).

## How Can I Contribute?

### 🐛 Reporting Bugs

Before submitting a bug report:
- Check the [issue tracker](https://github.com/xebotic/test3/issues) for existing reports
- Update to the latest version to see if the bug persists
- Gather relevant information (browser, OS, steps to reproduce)

**Submit bugs using our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)**

Include:
- Clear, descriptive title
- Detailed steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

### ✨ Suggesting Features

We love new ideas! Before suggesting a feature:
- Check existing [feature requests](https://github.com/xebotic/test3/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
- Review our [roadmap](docs/ROADMAP.md) to see if it's planned
- Consider if it aligns with our [vision](VISION.md)

**Submit feature requests using our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)**

Include:
- Use case and problem statement
- Proposed solution
- Alternative solutions considered
- Mock-ups or examples if applicable

### 💻 Code Contributions

We accept contributions in these areas:

**Frontend (TypeScript/React)**
- UI components and pages
- State management
- API integration
- Responsive design
- Accessibility improvements

**Backend (Node.js/TypeScript)**
- API endpoints
- Database queries
- Performance optimization
- Testing
- Documentation

**Infrastructure**
- Docker configurations
- CI/CD pipelines
- Deployment scripts
- Monitoring and logging

**NLP & Linguistics (Python) - Coming Soon**
- Morphological analysis
- Syntax parsing
- Linguistic algorithms
- ML models

### 📚 Data Contributions

**Bible Texts**
- Public domain translations
- Original language texts
- Text alignment data
- Variant readings

**Linguistic Data**
- Morphological tagging
- Lexicon entries
- Etymology
- Semantic domains

**Historical Data**
- Archaeological information
- Historical timelines
- Cultural context
- Maps and geography

**Metadata**
- Cross-references
- Topic categorization
- Literary structures
- Book introductions

### 📖 Documentation

- README improvements
- API documentation
- Tutorial content
- Code comments
- Translation to other languages

### 🎨 Design

- UI/UX improvements
- Icons and graphics
- Accessibility enhancements
- Mobile designs
- Brand materials

## Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- Git
- PostgreSQL 15+ (via Docker)

### Getting Started

1. **Fork and Clone**
```bash
git clone https://github.com/YOUR_USERNAME/test3.git
cd test3
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Database**
```bash
docker-compose up -d postgres redis
```

4. **Import Sample Data**
```bash
npm run db:import data/sample/john-kjv-sample.json KJV
```

5. **Start Development Servers**

Terminal 1 - API:
```bash
cd services/content-service
npm run dev
```

Terminal 2 - Web App:
```bash
cd apps/web
npm run dev
```

6. **Verify Setup**
- Web: http://localhost:3000
- API: http://localhost:3001/health
- Reader: http://localhost:3000/read

### Development Workflow

1. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions

2. **Make Changes**
- Write code following our [coding standards](#coding-standards)
- Add tests for new functionality
- Update documentation as needed

3. **Test Locally**
```bash
# Run linter
npm run lint

# Format code
npm run format

# Run tests (when available)
npm test
```

4. **Commit Changes**

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add verse highlighting feature"
git commit -m "fix: resolve search pagination bug"
git commit -m "docs: update API documentation"
```

Commit message format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

5. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of your code
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added for new functionality
- [ ] All tests passing
- [ ] No console warnings or errors
- [ ] Commit messages follow conventions

### Submitting

1. **Create Pull Request** from your fork to our `main` branch

2. **Fill Out PR Template** with:
   - Description of changes
   - Related issue numbers
   - Type of change (bug fix, feature, etc.)
   - Testing performed
   - Screenshots (for UI changes)

3. **Request Review** from maintainers

4. **Address Feedback**
   - Respond to review comments
   - Make requested changes
   - Push updates to your branch

5. **Merge**
   - Maintainer will merge when approved
   - Your PR will be squash-merged
   - Branch will be deleted

### PR Guidelines

**Good PR:**
- Focused on single issue or feature
- <500 lines of code changes
- Clear description and testing notes
- Up-to-date with main branch
- Passing CI checks

**Avoid:**
- Multiple unrelated changes
- Massive PRs (>1000 lines)
- Missing tests for new features
- Unclear descriptions
- Reformatting unrelated code

## Coding Standards

### TypeScript/JavaScript

```typescript
// Use TypeScript strict mode
// Prefer functional components
// Use async/await over promises
// Destructure props

// Good
interface Props {
  bookCode: string;
  chapter: number;
}

export function BookChapter({ bookCode, chapter }: Props) {
  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    async function loadVerses() {
      const data = await api.getChapter(bookCode, chapter);
      setVerses(data);
    }
    loadVerses();
  }, [bookCode, chapter]);

  return <div>{/* ... */}</div>;
}
```

**Style Guidelines:**
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line
- Max line length: 100 characters

### React

- Use hooks, not classes
- Extract reusable logic to custom hooks
- Keep components focused and small
- Use TypeScript for props
- Avoid prop drilling (use context)
- Memoize expensive computations

### Database

- Use prepared statements
- Avoid N+1 queries
- Add indexes for common queries
- Use transactions for data integrity
- Document complex queries

### API Design

- RESTful conventions
- Consistent error responses
- Pagination for lists
- Versioning in URL
- Proper HTTP status codes

### Testing (Coming Soon)

- Unit tests for utilities
- Integration tests for API
- E2E tests for critical flows
- >80% code coverage
- Test edge cases

## Data Contributions

### Bible Text Format

JSON format for Bible text imports:

```json
[
  {
    "book": "JHN",
    "chapter": 1,
    "verse": 1,
    "text": "In the beginning was the Word..."
  }
]
```

**Requirements:**
- Valid book code (see `data/seeds/001_books_and_translations.sql`)
- Correct chapter and verse numbers
- Clean, UTF-8 encoded text
- Source attribution in PR description
- License verification

### Linguistic Data Format

Coming soon - formats for:
- Morphological tags
- Lexicon entries
- Syntax trees
- Cross-references

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community chat
- **Discord** (coming soon): Real-time collaboration
- **Email**: [dev@biblepro.app](mailto:dev@biblepro.app)

### Getting Help

- Check [QUICKSTART.md](QUICKSTART.md) for setup help
- Search [existing issues](https://github.com/xebotic/test3/issues)
- Ask in [Discussions](https://github.com/xebotic/test3/discussions)
- Read the [docs](docs/)

### Recognition

Contributors are recognized:
- Listed in [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Mentioned in release notes
- Featured in community spotlight
- Access to contributor Discord channel

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

Don't hesitate to ask! We're here to help:
- Open an issue with the `question` label
- Start a discussion in GitHub Discussions
- Email us at [dev@biblepro.app](mailto:dev@biblepro.app)

Thank you for contributing to Bible Pro! 🙏

---

[Back to README](README.md) | [Code of Conduct](CODE_OF_CONDUCT.md) | [Vision](VISION.md)
