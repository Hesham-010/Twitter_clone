import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadImage(file) {
    if (!file.length) {
      throw new BadRequestException('incorrect file');
    }
    const path = file[0].path;
    return path;
  }
}
