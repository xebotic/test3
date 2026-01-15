/**
 * User and annotation types
 */

export enum SubscriptionTier {
  FREE = 'free',
  SCHOLAR = 'scholar',
  PREMIUM = 'premium',
}

export enum AnnotationType {
  NOTE = 'note',
  HIGHLIGHT = 'highlight',
  BOOKMARK = 'bookmark',
}

export interface User {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  authProvider: string;
  authProviderId?: string;
  preferences: UserPreferences;
  subscriptionTier: SubscriptionTier;
  createdAt: Date;
  lastActive?: Date;
}

export interface UserPreferences {
  defaultTranslation?: string;
  theme?: 'light' | 'dark' | 'auto';
  fontSize?: number;
  showVerseNumbers?: boolean;
  showRedLetters?: boolean;
  highlightColor?: string;
}

export interface Annotation {
  id: string;
  userId: string;
  bookId: number;
  chapter: number;
  verse: number;
  annotationType: AnnotationType;
  content?: string;
  color?: string;
  tags?: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingPlan {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  isPublic: boolean;
  durationDays: number;
  createdAt: Date;
}

export interface ReadingPlanItem {
  id: number;
  planId: string;
  dayNumber: number;
  bookId: number;
  startChapter: number;
  startVerse: number;
  endChapter: number;
  endVerse: number;
  notes?: string;
}

export interface UserReadingProgress {
  id: string;
  userId: string;
  planId: string;
  dayNumber: number;
  completedAt?: Date;
}
