const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  chapterNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  priceCoins: {
    type: Number,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  }
});

const MangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  alternativeTitles: [String],
  description: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  bannerImage: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    default: ''
  },
  genres: [{
    type: String,
    required: true
  }],
  tags: [String],
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'hiatus', 'cancelled'],
    default: 'ongoing'
  },
  type: {
    type: String,
    enum: ['manga', 'manhwa', 'manhua', 'webtoon'],
    required: true
  },
  releaseYear: {
    type: Number
  },
  publisher: {
    type: String,
    default: ''
  },
  rating: {
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    votes: {
      type: Number,
      default: 0
    }
  },
  chapters: [ChapterSchema],
  isPremium: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
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

// Add virtual for chapter count
MangaSchema.virtual('chapterCount').get(function() {
  return this.chapters.length;
});

// Add index for text search
MangaSchema.index({ 
  title: 'text', 
  alternativeTitles: 'text', 
  description: 'text' 
});

const Manga = mongoose.model('Manga', MangaSchema);

module.exports = Manga;
