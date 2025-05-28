const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.post('/create-payment-intent', authMiddleware, paymentController.createPaymentIntent);
router.post('/process-payment', authMiddleware, paymentController.processPayment);

// Coin packages
router.get('/coin-packages', paymentController.getCoinPackages);

// Subscription plans
router.get('/subscription-plans', paymentController.getSubscriptionPlans);
router.post('/create-subscription', authMiddleware, paymentController.createSubscription);
router.put('/cancel-subscription', authMiddleware, paymentController.cancelSubscription);

// Content purchase
router.post('/purchase-content', authMiddleware, paymentController.purchaseContent);

// Webhook for Stripe events
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
