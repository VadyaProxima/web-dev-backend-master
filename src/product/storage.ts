import { diskStorage } from 'multer';

const fileName = (req, file, callback) => {
  callback(null, file.originalname);
};

export const fileStorage = diskStorage({
  destination: './db_images/product',
  filename: fileName,
});
