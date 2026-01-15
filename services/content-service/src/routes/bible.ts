import { Router } from 'express';
import * as bibleController from '../controllers/bibleController';

const router = Router();

// Books
router.get('/books', bibleController.getBooks);
router.get('/books/:code', bibleController.getBook);

// Verses
router.get('/verses/:book/:chapter/:verse', bibleController.getVerse);
router.get('/verses/:book/:chapter', bibleController.getChapter);

// Search
router.get('/search', bibleController.searchVerses);

// Translations
router.get('/translations', bibleController.getTranslations);

export default router;
