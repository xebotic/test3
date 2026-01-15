/**
 * AI and machine learning types
 */

export interface VerseEmbedding {
  verseId: number;
  embedding: number[];
  modelVersion: string;
  createdAt: Date;
}

export interface SemanticMatch {
  verseId: number;
  reference: string;
  text: string;
  similarity: number;
  explanation?: string;
}

export interface SemanticSearchRequest {
  query: string;
  filters?: SemanticSearchFilters;
  limit?: number;
}

export interface SemanticSearchFilters {
  testament?: 'OT' | 'NT';
  books?: string[];
  translation?: string;
  minSimilarity?: number;
}

export interface AIQuestionRequest {
  question: string;
  context?: {
    book: string;
    chapter: number;
    verse?: number;
  };
}

export interface AIResponse {
  answer: string;
  sources: Array<{
    verseId: number;
    reference: string;
    text: string;
  }>;
  confidence: number;
  relatedQuestions?: string[];
}

export interface Topic {
  id: number;
  name: string;
  description?: string;
  keywords: string[];
  parentTopicId?: number;
  createdBy: string;
}

export interface VerseTopic {
  id: number;
  verseId: number;
  topicId: number;
  relevanceScore: number;
}

export interface SummaryRequest {
  book: string;
  startChapter: number;
  startVerse: number;
  endChapter: number;
  endVerse: number;
  length?: 'short' | 'medium' | 'long';
}

export interface Summary {
  reference: string;
  summary: string;
  keyThemes: string[];
  outlinePoints?: string[];
}
