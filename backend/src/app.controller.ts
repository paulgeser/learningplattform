/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { createWorker } from 'tesseract.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/test")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @UseInterceptors(FileInterceptor('file'))
  async getTest(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log(file);
    const worker = await createWorker('eng');
    const ret = await worker.recognize(file.buffer, {}, { blocks: true });
    console.log(ret.data.text);
    await worker.terminate();
    return Promise.resolve(ret.data.text);
    return Promise.resolve("test");
  }

}
