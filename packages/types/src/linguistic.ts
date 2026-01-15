/**
 * Linguistic analysis types for original language study
 */

export interface OriginalWord {
  id: number;
  verseId: number;
  wordOrder: number;
  word: string;
  lemma: string;
  strongNumber?: string;
  morphology: Morphology;
  gloss?: string;
  transliteration?: string;
}

export interface Morphology {
  partOfSpeech: string;
  gender?: string;
  number?: string;
  case?: string;
  tense?: string;
  voice?: string;
  mood?: string;
  person?: string;
  state?: string;
}

export interface LexiconEntry {
  id: number;
  lemma: string;
  language: string;
  strongNumber?: string;
  partOfSpeech: string;
  definition: string;
  etymology?: string;
  semanticDomain?: string;
  louwNidaNumber?: string;
  frequency: number;
  cognates?: string[];
}

export interface WordStudy {
  lemma: string;
  language: string;
  lexiconEntry: LexiconEntry;
  occurrences: WordOccurrence[];
  semanticRange: string[];
  collocations: Collocation[];
  etymology: Etymology;
  relatedWords: LexiconEntry[];
}

export interface WordOccurrence {
  verseId: number;
  reference: string;
  word: string;
  context: string;
}

export interface Collocation {
  words: string[];
  frequency: number;
  examples: string[];
}

export interface Etymology {
  root: string;
  derivation: string;
  cognates: string[];
  semanticShift?: string;
}

export enum TreeType {
  DEPENDENCY = 'dependency',
  CONSTITUENCY = 'constituency',
}

export interface SyntaxTree {
  verseId: number;
  treeType: TreeType;
  tree: SyntaxNode;
}

export interface SyntaxNode {
  id: string;
  label: string;
  word?: string;
  lemma?: string;
  morphology?: Morphology;
  children?: SyntaxNode[];
  relation?: string;
  parent?: string;
}

export interface DiscourseSegment {
  id: number;
  bookId: number;
  startChapter: number;
  startVerse: number;
  endChapter: number;
  endVerse: number;
  segmentType: SegmentType;
  title?: string;
  theme?: string;
  rhetoricalStructure?: Record<string, unknown>;
}

export enum SegmentType {
  PERICOPE = 'pericope',
  DISCOURSE_UNIT = 'discourse_unit',
  NARRATIVE_SECTION = 'narrative_section',
}

export enum LiteraryDeviceType {
  PARALLELISM = 'parallelism',
  CHIASM = 'chiasm',
  METAPHOR = 'metaphor',
  SIMILE = 'simile',
  ALLUSION = 'allusion',
  WORDPLAY = 'wordplay',
  INCLUSIO = 'inclusio',
}

export interface LiteraryDevice {
  id: number;
  bookId: number;
  startChapter: number;
  startVerse: number;
  endChapter: number;
  endVerse: number;
  deviceType: LiteraryDeviceType;
  description: string;
  structure?: Record<string, unknown>;
  confidenceScore: number;
}
