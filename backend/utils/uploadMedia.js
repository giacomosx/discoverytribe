const multer = require("multer");
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DT-users_avatar',
        format: async (req, file) => 'png',
        public_id: (req, file) => req.file,
    },
});

const coverStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DT-users_cover',
        format: async (req, file) => 'png',
        public_id: (req, file) => req.file
    },
});

const mediaStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DT-users_media',
        format: async (req, file) => 'png',
        public_id: (req, file) => req.file
    },
});


const uploadAvatar = multer({storage: avatarStorage});
const uploadCover = multer({storage: coverStorage});
const uploadMedia = multer({storage: mediaStorage});

module.exports = {
    uploadAvatar,
    uploadCover,
    uploadMedia
};

