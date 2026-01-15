import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middleware/errorHandler';
import { bibleRepository } from '../repositories/bibleRepository';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bibleRepository.getAllBooks();
    res.json({
      data: books,
      count: books.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const book = await bibleRepository.getBookByCode(code);

    if (!book) {
      throw new ApiError(404, `Book with code '${code}' not found`);
    }

    res.json({ data: book });
  } catch (error) {
    next(error);
  }
};

export const getVerse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, chapter, verse } = req.params;
    const { translation = 'KJV' } = req.query;

    const verseData = await bibleRepository.getVerse(
      book,
      parseInt(chapter),
      parseInt(verse),
      translation as string
    );

    if (!verseData) {
      throw new ApiError(
        404,
        `Verse ${book} ${chapter}:${verse} not found in ${translation}`
      );
    }

    res.json({ data: verseData });
  } catch (error) {
    next(error);
  }
};

export const getChapter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, chapter } = req.params;
    const { translation = 'KJV' } = req.query;

    const verses = await bibleRepository.getChapter(
      book,
      parseInt(chapter),
      translation as string
    );

    if (verses.length === 0) {
      throw new ApiError(404, `Chapter ${book} ${chapter} not found in ${translation}`);
    }

    res.json({
      data: verses,
      count: verses.length,
      reference: `${book} ${chapter}`,
    });
  } catch (error) {
    next(error);
  }
};

export const searchVerses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, translation, testament, limit = 100 } = req.query;

    if (!q || typeof q !== 'string') {
      throw new ApiError(400, 'Query parameter "q" is required');
    }

    const result = await bibleRepository.searchVerses(
      q,
      translation as string | undefined,
      testament as 'OT' | 'NT' | undefined,
      parseInt(limit as string)
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getTranslations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const translations = await bibleRepository.getAllTranslations();
    res.json({
      data: translations,
      count: translations.length,
    });
  } catch (error) {
    next(error);
  }
};
