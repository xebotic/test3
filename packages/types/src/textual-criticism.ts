/**
 * Textual criticism and manuscript types
 */

export enum ManuscriptType {
  PAPYRUS = 'papyrus',
  UNCIAL = 'uncial',
  MINUSCULE = 'minuscule',
  LECTIONARY = 'lectionary',
}

export enum Probability {
  CERTAIN = 'certain',
  VERY_PROBABLE = 'very_probable',
  PROBABLE = 'probable',
  POSSIBLE = 'possible',
}

export enum EvidenceRating {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export interface Manuscript {
  id: number;
  siglum: string;
  fullName?: string;
  manuscriptType: ManuscriptType;
  dateEarly?: number;
  dateLate?: number;
  location?: string;
  textType?: string;
  testament: 'OT' | 'NT';
  contentDescription?: string;
  significanceRating: number;
}

export interface TextVariant {
  id: number;
  bookId: number;
  chapter: number;
  verse: number;
  variantUnit: number;
  reading: string;
  manuscriptSupport: string[];
  probability: Probability;
  externalEvidenceRating: EvidenceRating;
  internalEvidenceRating: EvidenceRating;
  notes?: string;
}

export interface VariantReading {
  text: string;
  manuscripts: Manuscript[];
  probability: Probability;
  externalEvidenceRating: EvidenceRating;
  internalEvidenceRating: EvidenceRating;
  isPreferred: boolean;
}
