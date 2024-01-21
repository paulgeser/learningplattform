/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class AnalysisService {
  async analyzeImage(file: Express.Multer.File): Promise<string[]>{ 
    const worker = await createWorker('eng');
    const ret = await worker.recognize(file.buffer, {}, { blocks: true });
    await worker.terminate();
    return Promise.resolve(ret.data.text.split("\n").filter(x => !!x));
  }
}
