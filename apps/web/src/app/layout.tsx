import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bible Study App - Advanced Biblical Analysis',
  description: 'World-class Bible study application with original language analysis, linguistic tools, and AI-powered features',
  keywords: ['Bible', 'Bible Study', 'Hebrew', 'Greek', 'Biblical Analysis', 'Theology'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Bible Study App</h1>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t py-6 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Bible Study App. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
