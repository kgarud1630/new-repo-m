const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  photoURL: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  bio: {
    type: String,
    default: ''
  },
  coins: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  subscriptionId: {
    type: String,
    default: null
  },
  subscriptionEnd: {
    type: Date,
    default: null
  },
  favorites: [{
    contentType: {
      type: String,
      enum: ['manga', 'anime']
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'favorites.contentType'
    }
  }],
  library: [{
    contentType: {
      type: String,
      enum: ['manga', 'anime']
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'library.contentType'
    },
    progress: {
      currentChapter: Number,
      currentEpisode: Number,
      lastRead: Date,
      lastWatched: Date
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Method to check if user is premium
UserSchema.methods.isPremiumUser = function() {
  if (this.isPremium && this.subscriptionEnd) {
    return new Date() < this.subscriptionEnd;
  }
  return false;
};

// Method to add coins to user
UserSchema.methods.addCoins = function(amount) {
  this.coins += amount;
  return this.save();
};

// Method to use coins for a purchase
UserSchema.methods.useCoins = function(amount) {
  if (this.coins < amount) {
    throw new Error('Insufficient coins');
  }
  this.coins -= amount;
  return this.save();
};

// Method to add content to favorites
UserSchema.methods.addToFavorites = function(contentType, contentId) {
  // Check if already in favorites
  const isAlreadyFavorite = this.favorites.some(
    fav => fav.contentType === contentType && fav.contentId.equals(contentId)
  );
  
  if (!isAlreadyFavorite) {
    this.favorites.push({ contentType, contentId });
  }
  
  return this.save();
};

// Method to remove content from favorites
UserSchema.methods.removeFromFavorites = function(contentType, contentId) {
  this.favorites = this.favorites.filter(
    fav => !(fav.contentType === contentType && fav.contentId.equals(contentId))
  );
  
  return this.save();
};

// Method to add content to library
UserSchema.methods.addToLibrary = function(contentType, contentId, progress = {}) {
  // Check if already in library
  const existingEntry = this.library.find(
    item => item.contentType === contentType && item.contentId.equals(contentId)
  );
  
  if (existingEntry) {
    // Update progress
    existingEntry.progress = { ...existingEntry.progress, ...progress };
  } else {
    // Add new entry
    this.library.push({ 
      contentType, 
      contentId, 
      progress 
    });
  }
  
  return this.save();
};

// Method to remove content from library
UserSchema.methods.removeFromLibrary = function(contentType, contentId) {
  this.library = this.library.filter(
    item => !(item.contentType === contentType && item.contentId.equals(contentId))
  );
  
  return this.save();
};

// Method to update reading/watching progress
UserSchema.methods.updateProgress = function(contentType, contentId, progress) {
  const libraryItem = this.library.find(
    item => item.contentType === contentType && item.contentId.equals(contentId)
  );
  
  if (libraryItem) {
    libraryItem.progress = { ...libraryItem.progress, ...progress };
    
    if (contentType === 'manga' && progress.currentChapter) {
      libraryItem.progress.lastRead = Date.now();
    } else if (contentType === 'anime' && progress.currentEpisode) {
      libraryItem.progress.lastWatched = Date.now();
    }
  } else {
    // If not in library, add it
    this.addToLibrary(contentType, contentId, progress);
  }
  
  return this.save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
