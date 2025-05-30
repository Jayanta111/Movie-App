import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

// File Filter for Images

const fileFilter = (req, file, cb) => {
    const filetypes = /\.(jpe?g|png|webp)$/i;
const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname);
    const mimetype = file.mimetype;
    
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
};

// Multer Configuration
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// Route to Handle Image Upload
router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message });
        } else if (req.file) {
            res.status(200).send({
                message: "Image Uploaded Successfully",
                image: `/${req.file.path}`,
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    });
});

export default router;
