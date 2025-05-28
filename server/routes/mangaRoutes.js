const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', mangaController.getAllManga);
router.get('/featured', mangaController.getFeaturedManga);
router.get('/trending', mangaController.getTrendingManga);
router.get('/latest', mangaController.getLatestManga);
router.get('/genre/:genre', mangaController.getMangaByGenre);
router.get('/search', mangaController.searchManga);
router.get('/:mangaId', mangaController.getMangaById);
router.get('/:mangaId/chapters', mangaController.getMangaChapters);

// Chapter access - may require authentication for premium content
router.get('/:mangaId/chapters/:chapterNumber', authMiddleware, mangaController.getChapter);

// Admin routes - require admin role
router.post('/', 
  authMiddleware, 
  adminMiddleware, 
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
  ]), 
  mangaController.createManga
);

router.put('/:mangaId', 
  authMiddleware, 
  adminMiddleware, 
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
  ]), 
  mangaController.updateManga
);

router.delete('/:mangaId', authMiddleware, adminMiddleware, mangaController.deleteManga);

// Chapter management
router.post('/:mangaId/chapters', 
  authMiddleware, 
  adminMiddleware, 
  upload.array('images'), 
  mangaController.addChapter
);

router.put('/:mangaId/chapters/:chapterNumber', 
  authMiddleware, 
  adminMiddleware, 
  upload.array('images'), 
  mangaController.updateChapter
);

router.delete('/:mangaId/chapters/:chapterNumber', 
  authMiddleware, 
  adminMiddleware, 
  mangaController.deleteChapter
);

module.exports = router;
