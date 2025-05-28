const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  episodeNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
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

const AnimeSchema = new mongoose.Schema({
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
  studio: {
    type: String,
    required: true
  },
  director: {
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
    enum: ['ongoing', 'completed', 'upcoming'],
    default: 'ongoing'
  },
  type: {
    type: String,
    enum: ['tv', 'movie', 'ova', 'special'],
    required: true
  },
  season: {
    year: Number,
    season: {
      type: String,
      enum: ['winter', 'spring', 'summer', 'fall']
    }
  },
  episodes: [EpisodeSchema],
  totalEpisodes: {
    type: Number,
    default: 0
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

// Add virtual for episode count
AnimeSchema.virtual('episodeCount').get(function() {
  return this.episodes.length;
});

// Add index for text search
AnimeSchema.index({ 
  title: 'text', 
  alternativeTitles: 'text', 
  description: 'text' 
});

const Anime = mongoose.model('Anime', AnimeSchema);

module.exports = Anime;
