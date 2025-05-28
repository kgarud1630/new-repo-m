const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage engine for manga/anime covers
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      // Determine folder based on file purpose
      if (file.fieldname === 'cover') {
        return 'otakuverse/covers';
      } else if (file.fieldname === 'bannerImage') {
        return 'otakuverse/banners';
      } else if (file.fieldname === 'images') {
        return 'otakuverse/chapters';
      } else if (file.fieldname === 'thumbnail') {
        return 'otakuverse/thumbnails';
      } else {
        return 'otakuverse/uploads';
      }
    },
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { quality: 'auto:good' }
    ]
  }
});

// File filter to validate images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed.'), false);
  }
};

// Configure multer with storage and file limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter
});

module.exports = upload;
