const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemType: {
    type: String,
    enum: ['coins', 'subscription', 'chapter', 'episode'],
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'itemModel',
    required: function() {
      return this.itemType === 'chapter' || this.itemType === 'episode';
    }
  },
  itemModel: {
    type: String,
    enum: ['Manga', 'Anime'],
    required: function() {
      return this.itemType === 'chapter' || this.itemType === 'episode';
    }
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: function() {
      return this.itemType === 'chapter' || this.itemType === 'episode';
    }
  },
  chapterNumber: {
    type: Number,
    required: function() {
      return this.itemType === 'chapter';
    }
  },
  episodeNumber: {
    type: Number,
    required: function() {
      return this.itemType === 'episode';
    }
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['coins', 'usd'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['coins', 'stripe', 'other'],
    required: true
  },
  stripePaymentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add method to check if a user has purchased a specific chapter/episode
PurchaseSchema.statics.hasPurchased = async function(userId, itemType, contentId, number) {
  const filter = {
    user: userId,
    itemType,
    contentId,
    status: 'completed'
  };
  
  if (itemType === 'chapter') {
    filter.chapterNumber = number;
  } else if (itemType === 'episode') {
    filter.episodeNumber = number;
  }
  
  const purchase = await this.findOne(filter);
  return !!purchase;
};

// Add method to get all user purchases
PurchaseSchema.statics.getUserPurchases = async function(userId, limit = 10, skip = 0) {
  return this.find({ user: userId, status: 'completed' })
    .sort({ date: -1 })
    .limit(limit)
    .skip(skip)
    .populate('itemId')
    .populate('contentId');
};

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
