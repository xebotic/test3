/**
 * Core Bible data types
 */

export enum Testament {
  OT = 'OT',
  NT = 'NT',
}

export enum Language {
  HEBREW = 'Hebrew',
  GREEK = 'Greek',
  ARAMAIC = 'Aramaic',
  ENGLISH = 'English',
}

export enum TranslationPhilosophy {
  FORMAL_EQUIVALENCE = 'formal',
  DYNAMIC_EQUIVALENCE = 'dynamic',
  PARAPHRASE = 'paraphrase',
}

export interface Book {
  id: number;
  code: string;
  name: string;
  testament: Testament;
  originalLanguage: Language;
  genre?: string;
  author?: string;
  dateWrittenEarly?: number;
  dateWrittenLate?: number;
  canonicalOrder: number;
  chapterCount: number;
}

export interface Translation {
  id: number;
  code: string;
  name: string;
  language: string;
  yearPublished?: number;
  copyrightInfo?: string;
  translationPhilosophy: TranslationPhilosophy;
  licenseType?: string;
  isOriginalLanguage: boolean;
}

export interface Verse {
  id: number;
  bookId: number;
  chapter: number;
  verse: number;
  translationId: number;
  text: string;
}

export interface VerseReference {
  book: string;
  chapter: number;
  verse: number;
  translation?: string;
}

export interface VerseRange {
  book: string;
  startChapter: number;
  startVerse: number;
  endChapter: number;
  endVerse: number;
  translation?: string;
}

export interface Chapter {
  bookCode: string;
  number: number;
  verseCount: number;
  verses: Verse[];
}

export interface CrossReference {
  id: number;
  fromBookId: number;
  fromChapter: number;
  fromVerse: number;
  toBookId: number;
  toChapter: number;
  toVerse: number;
  referenceType: ReferenceType;
  strength: number;
  notes?: string;
}

export enum ReferenceType {
  DIRECT_QUOTATION = 'quotation',
  ALLUSION = 'allusion',
  THEMATIC = 'thematic',
  SEMANTIC = 'semantic',
  PARALLEL = 'parallel',
  PROPHETIC_FULFILLMENT = 'prophetic_fulfillment',
}

export interface SearchFilters {
  testament?: Testament;
  books?: string[];
  translation?: string;
  originalLanguage?: Language;
}

export interface SearchResult {
  verses: Verse[];
  total: number;
  query: string;
  filters?: SearchFilters;
}
