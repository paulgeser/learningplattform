/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Word } from 'src/schemas/word.schema';

@Injectable()
export class LearnsetWordService {

    constructor(
        @InjectModel(Word.name) private wordModel: Model<Word>) { }

    public getAllByLearnSetId(learnSetId: string): Promise<Word[]> {
        return this.wordModel.find({ learnSetId: learnSetId });
    }

    public create(word: Word): Promise<Word> {
        const createdWord = new this.wordModel(word);
        return createdWord.save();
    }

    public update(id: string, word: Word): Promise<any> {
        return this.wordModel.updateOne({ _id: new mongoose.Types.ObjectId(id), }, {
            learnSetId: word.learnSetId,
            english: word.english,
            french: word.french,
            malagasy: word.malagasy,
            picture: word.picture,
            audio: word.audio
        });
    }

    public delete(id: string): Promise<any> {
        return this.wordModel.deleteOne({ _id: new mongoose.Types.ObjectId(id), });
    }
}
