/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyzedWordsModel } from 'src/schemas/analyzed-words.model';
import { ImageWordInputModel } from 'src/schemas/image-word-input.model';
import { LearnSet } from 'src/schemas/learnset.schema';
import { LearnSetStatus } from 'src/schemas/status.enum';
import { Word } from 'src/schemas/word.schema';

@Injectable()
export class DataService {

  constructor(
    @InjectModel(LearnSet.name) private learnSetModel: Model<LearnSet>,
    @InjectModel(Word.name) private wordModel: Model<Word>) { }

  public createLearnSet(learnSet: LearnSet): Promise<LearnSet> {
    const createdLearnSet = new this.learnSetModel(learnSet);
    return createdLearnSet.save();
  }

  public getAllLearnSets(): Promise<LearnSet[]> {
    return this.learnSetModel.find();
  }

  public getLearnSetById(id: string): Promise<LearnSet> {
    return this.learnSetModel.findById(id);
  }

  public async addWordsToLearnSet(id: string, words: AnalyzedWordsModel[]): Promise<Word[]> {
    const createdWords: Word[] = [];
    for (const word of words) {
      const newWord = new this.wordModel({
        learnSetId: id,
        english: word.english,
        malagasy: word.malagasy
      });
      const savedWord = await newWord.save();
      createdWords.push(savedWord);
    }
    await this.learnSetModel.updateOne({ _id: id }, {
      status: LearnSetStatus.TEXT
    });
    return createdWords;
  }

  public getWordsByLearnSetId(id: string): Promise<Word[]> {
    return this.wordModel.find({ learnSetId: id });
  }

  public async addPictureToWord(word: ImageWordInputModel): Promise<boolean> {
    console.log(word.wordId)
    const updatedWord = await this.wordModel.updateOne({ _id: word.wordId }, {
      picture: word.picture
    });
    return updatedWord.acknowledged;
  }

  public async updateStatusOfLearnSet(id: string, status: LearnSetStatus): Promise<boolean> {
    await this.learnSetModel.updateOne({ _id: id }, {
      status: status
    });
    return true;
  }
}
