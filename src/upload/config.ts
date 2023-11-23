import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export function multerOptions(field) {
  let dest: string;
  if (field === 'avatarImage') {
    dest = './public/Uploads/Avatar';
  } else if (field === 'tweetImage') {
    dest = './public/Uploads/tweetImage';
  }
  return {
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new BadRequestException(), false);
      }
    },
    storage: diskStorage({
      destination: dest,

      filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
      },
    }),
  };
}
