import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config';
import { UploadService } from './upload.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @UseGuards(AuthGuard)
  @Post('/avatarImage')
  @UseInterceptors(
    FilesInterceptor('avatarImage', null, multerOptions('avatarImage')),
  )
  async uploadUserFile(@UploadedFiles() file) {
    return this.uploadService.uploadImage(file);
  }

  @UseGuards(AuthGuard)
  @Post('/tweetImage')
  @UseInterceptors(
    FilesInterceptor('tweetImage', null, multerOptions('tweetImage')),
  )
  async uploadTweetFile(@UploadedFiles() file) {
    return this.uploadService.uploadImage(file);
  }
}
