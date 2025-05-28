const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.post('/check', userController.checkUserExists);

// Protected routes - require authentication
router.post('/', userController.createUser);
router.get('/:userId', authMiddleware, userController.getUser);
router.put('/:userId', authMiddleware, userController.updateUser);

// Library management
router.get('/:userId/library', authMiddleware, userController.getUserLibrary);
router.post('/:userId/library', authMiddleware, userController.addToLibrary);
router.delete('/:userId/library/:contentType/:contentId', authMiddleware, userController.removeFromLibrary);
router.put('/:userId/library/:contentType/:contentId/progress', authMiddleware, userController.updateProgress);

// Favorites management
router.get('/:userId/favorites', authMiddleware, userController.getUserFavorites);
router.post('/:userId/favorites', authMiddleware, userController.addToFavorites);
router.delete('/:userId/favorites/:contentType/:contentId', authMiddleware, userController.removeFromFavorites);

// Purchase history
router.get('/:userId/purchases', authMiddleware, userController.getPurchaseHistory);

// Coin management
router.post('/:userId/coins/add', authMiddleware, userController.addCoins);
router.post('/:userId/coins/use', authMiddleware, userController.useCoins);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete('/:userId', authMiddleware, adminMiddleware, userController.deleteUser);
router.put('/:userId/role', authMiddleware, adminMiddleware, userController.updateUserRole);

module.exports = router;
