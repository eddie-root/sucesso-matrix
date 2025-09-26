import multer from 'multer';

// Storage on cloudinary online

export const upload = multer({
    storage: multer.diskStorage({})}
);
