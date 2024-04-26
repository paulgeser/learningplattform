/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LearnSetWord } from 'src/schemas/learnset-word.schema';

@Injectable()
export class LearnsetWordService {

    constructor(
        @InjectModel(LearnSetWord.name) private learnSetWordModel: Model<LearnSetWord>) { }

    public getAllByLearnSetId(learnSetId: string): Promise<LearnSetWord[]> {
        return this.learnSetWordModel.find({ learnSetId: learnSetId });
    }

    public create(learnSetWord: LearnSetWord): Promise<LearnSetWord> {
        const createdWord = new this.learnSetWordModel(learnSetWord);
        return createdWord.save();
    }

    public update(id: string, learnSetWord: LearnSetWord): Promise<any> {
        return this.learnSetWordModel.updateOne({ _id: new mongoose.Types.ObjectId(id), }, {
            learnSetId: learnSetWord.learnSetId,
            english: learnSetWord.english,
            french: learnSetWord.french,
            malagasy: learnSetWord.malagasy,
            picture: learnSetWord.picture,
            audio: learnSetWord.audio
        });
    }

    public delete(id: string): Promise<any> {
        return this.learnSetWordModel.deleteOne({ _id: new mongoose.Types.ObjectId(id), });
    }
}
