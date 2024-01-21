/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';


@Controller('/analysis')
@ApiTags("analysis")
export class AnalysisController {

  constructor(private readonly analysisService: AnalysisService) { }

  @Post("/image")
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
    return this.analysisService.analyzeImage(file);
  }

}
