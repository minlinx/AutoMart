import cloudinary from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'min-automart-images',
	allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
	filename: function(request, file, cb) {
		cb(undefined, Date.now() + file.originalname);
	}
});
const fileFilter = function(request, file, cb) {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return cb(new Error('Only image files are allowed!'), false);
	}
	cb(null, true);
};
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET
});
const parser = multer({ storage, fileFilter });
export default parser;
