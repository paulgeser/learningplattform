/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearnSet } from 'src/schemas/learnset.schema';

@Injectable()
export class DataService {

  constructor(@InjectModel(LearnSet.name) private learnSetModel: Model<LearnSet>) { }

  public createLearnSet(learnSet: LearnSet) {
    const createdLearnSet = new this.learnSetModel(learnSet);
    return createdLearnSet.save();
  }
}
