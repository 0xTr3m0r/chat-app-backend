import {v2 as cloufdinary} from 'cloudinary';
import {config} from 'dotenv';
config();
cloufdinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export default cloufdinary;
