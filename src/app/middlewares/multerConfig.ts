import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request, Response } from 'express';

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload
