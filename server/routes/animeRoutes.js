const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', animeController.getAllAnime);
router.get('/featured', animeController.getFeaturedAnime);
router.get('/trending', animeController.getTrendingAnime);
router.get('/latest', animeController.getLatestAnime);
router.get('/genre/:genre', animeController.getAnimeByGenre);
router.get('/search', animeController.searchAnime);
router.get('/:animeId', animeController.getAnimeById);
router.get('/:animeId/episodes', animeController.getAnimeEpisodes);

// Episode access - may require authentication for premium content
router.get('/:animeId/episodes/:episodeNumber', authMiddleware, animeController.getEpisode);

// Admin routes - require admin role
router.post('/', 
  authMiddleware, 
  adminMiddleware, 
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
  ]), 
  animeController.createAnime
);

router.put('/:animeId', 
  authMiddleware, 
  adminMiddleware, 
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
  ]), 
  animeController.updateAnime
);

router.delete('/:animeId', authMiddleware, adminMiddleware, animeController.deleteAnime);

// Episode management
router.post('/:animeId/episodes', 
  authMiddleware, 
  adminMiddleware, 
  upload.single('thumbnail'), 
  animeController.addEpisode
);

router.put('/:animeId/episodes/:episodeNumber', 
  authMiddleware, 
  adminMiddleware, 
  upload.single('thumbnail'), 
  animeController.updateEpisode
);

router.delete('/:animeId/episodes/:episodeNumber', 
  authMiddleware, 
  adminMiddleware, 
  animeController.deleteEpisode
);

module.exports = router;
