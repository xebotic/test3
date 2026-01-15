'use client';

import { useState, useEffect } from 'react';
import { api, type Book, type Verse } from '@/lib/api';

export default function ReadPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('JHN');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load books on mount
  useEffect(() => {
    api
      .getBooks()
      .then(setBooks)
      .catch((err) => console.error('Failed to load books:', err));
  }, []);

  // Load chapter when selection changes
  useEffect(() => {
    if (!selectedBook || !selectedChapter) return;

    setLoading(true);
    setError(null);

    api
      .getChapter(selectedBook, selectedChapter, 'KJV')
      .then((data) => {
        setVerses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load chapter:', err);
        setError(err.message || 'Failed to load chapter');
        setVerses([]);
        setLoading(false);
      });
  }, [selectedBook, selectedChapter]);

  const currentBook = books.find((b) => b.code === selectedBook);

  const handleBookChange = (bookCode: string) => {
    setSelectedBook(bookCode);
    setSelectedChapter(1);
  };

  const handlePreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentBook && selectedChapter < currentBook.chapterCount) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Bible Reader</h1>

        {/* Book and Chapter Selector */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Book</label>
            <select
              value={selectedBook}
              onChange={(e) => handleBookChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {books.map((book) => (
                <option key={book.code} value={book.code}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium mb-2">Chapter</label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {currentBook &&
                Array.from({ length: currentBook.chapterCount }, (_, i) => i + 1).map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button
            onClick={handlePreviousChapter}
            disabled={selectedChapter <= 1}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          >
            ← Previous
          </button>
          <button
            onClick={handleNextChapter}
            disabled={!currentBook || selectedChapter >= currentBook.chapterCount}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="border rounded-lg p-6 bg-card">
        {loading && (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-destructive mb-2">{error}</div>
            <div className="text-sm text-muted-foreground">
              Make sure the database is running and contains data.
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Run: <code className="bg-muted px-2 py-1 rounded">npm run db:import data/sample/john-kjv-sample.json KJV</code>
            </div>
          </div>
        )}

        {!loading && !error && verses.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No verses found. Please import Bible data first.
          </div>
        )}

        {!loading && !error && verses.length > 0 && (
          <div>
            <h2 className="chapter-heading">
              {currentBook?.name} {selectedChapter}
            </h2>
            <div className="space-y-3">
              {verses.map((verse) => (
                <div key={verse.id} className="verse-text">
                  <span className="verse-number">{verse.verse}</span>
                  {verse.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
        <p className="font-semibold mb-2">Getting Started:</p>
        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
          <li>Make sure Docker is running: <code className="bg-background px-2 py-0.5 rounded">docker-compose up -d</code></li>
          <li>Import sample data: <code className="bg-background px-2 py-0.5 rounded">npm run db:import data/sample/john-kjv-sample.json KJV</code></li>
          <li>Start the API: <code className="bg-background px-2 py-0.5 rounded">cd services/content-service && npm run dev</code></li>
        </ol>
      </div>
    </div>
  );
}
