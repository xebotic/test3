const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Book {
  id: number;
  code: string;
  name: string;
  testament: 'OT' | 'NT';
  originalLanguage: string;
  chapterCount: number;
}

export interface Verse {
  id: number;
  bookId: number;
  chapter: number;
  verse: number;
  translationId: number;
  text: string;
}

export interface Translation {
  id: number;
  code: string;
  name: string;
  language: string;
  isOriginalLanguage: boolean;
}

export interface SearchResult {
  verses: Array<Verse & { bookCode: string; bookName: string; rank: number }>;
  total: number;
  query: string;
}

export const api = {
  async getBooks(): Promise<Book[]> {
    const res = await fetch(`${API_URL}/api/bible/books`);
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return data.data;
  },

  async getBook(code: string): Promise<Book> {
    const res = await fetch(`${API_URL}/api/bible/books/${code}`);
    if (!res.ok) throw new Error(`Failed to fetch book ${code}`);
    const data = await res.json();
    return data.data;
  },

  async getChapter(
    bookCode: string,
    chapter: number,
    translation: string = 'KJV'
  ): Promise<Verse[]> {
    const res = await fetch(
      `${API_URL}/api/bible/verses/${bookCode}/${chapter}?translation=${translation}`
    );
    if (!res.ok) throw new Error(`Failed to fetch ${bookCode} ${chapter}`);
    const data = await res.json();
    return data.data;
  },

  async getVerse(
    bookCode: string,
    chapter: number,
    verse: number,
    translation: string = 'KJV'
  ): Promise<Verse> {
    const res = await fetch(
      `${API_URL}/api/bible/verses/${bookCode}/${chapter}/${verse}?translation=${translation}`
    );
    if (!res.ok) throw new Error(`Failed to fetch ${bookCode} ${chapter}:${verse}`);
    const data = await res.json();
    return data.data;
  },

  async getTranslations(): Promise<Translation[]> {
    const res = await fetch(`${API_URL}/api/bible/translations`);
    if (!res.ok) throw new Error('Failed to fetch translations');
    const data = await res.json();
    return data.data;
  },

  async searchVerses(
    query: string,
    translation?: string,
    testament?: 'OT' | 'NT',
    limit: number = 100
  ): Promise<SearchResult> {
    const params = new URLSearchParams({ q: query, limit: limit.toString() });
    if (translation) params.append('translation', translation);
    if (testament) params.append('testament', testament);

    const res = await fetch(`${API_URL}/api/bible/search?${params}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },
};
