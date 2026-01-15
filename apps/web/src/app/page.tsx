import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Bible Study App
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          World-class Bible study with advanced linguistic analysis and AI-powered features
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <FeatureCard
          title="Original Languages"
          description="Study Hebrew, Greek, and Aramaic texts with full morphological analysis and interlinear display"
          icon="📖"
        />
        <FeatureCard
          title="Advanced Search"
          description="Semantic search powered by AI to find passages by meaning, not just keywords"
          icon="🔍"
        />
        <FeatureCard
          title="Linguistic Analysis"
          description="Syntax trees, discourse analysis, and literary device detection"
          icon="🌳"
        />
        <FeatureCard
          title="Textual Criticism"
          description="Compare manuscript variants and explore the critical apparatus"
          icon="📜"
        />
        <FeatureCard
          title="AI-Powered Insights"
          description="Ask questions, get summaries, and discover connections with AI assistance"
          icon="🤖"
        />
        <FeatureCard
          title="Community Study"
          description="Join study groups, share notes, and discuss passages with others"
          icon="👥"
        />
      </div>

      <div className="text-center">
        <Link
          href="/read"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Start Reading
        </Link>
      </div>

      <div className="mt-16 p-6 border rounded-lg bg-muted/50">
        <h2 className="text-2xl font-bold mb-4">Current Status: Phase 2 In Progress</h2>
        <p className="text-muted-foreground mb-4">
          This is an ambitious project to create the most advanced Bible study application in the world.
          We're implementing features in phases:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            <span>Phase 1: Core foundation and project setup - Complete!</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚧</span>
            <span>Phase 2: Basic Bible reading and search (Current) - Database connected, Reader built</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span>Phase 3: Original language integration</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span>Phase 4: Advanced linguistic features</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">⏳</span>
            <span>Phase 5: AI-powered analysis and insights</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="p-6 border rounded-lg hover:border-primary/50 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
