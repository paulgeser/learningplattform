/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LearnSet } from 'src/schemas/learnset.schema';

@Injectable()
export class LearnsetService {

    constructor(
        @InjectModel(LearnSet.name) private learnSetModel: Model<LearnSet>) { }

    public getAll(): Promise<LearnSet[]> {
        return this.learnSetModel.find().populate('type').exec();

    }

    public createLearnSet(learnSet: LearnSet): Promise<LearnSet> {
        const createdLearnSet = new this.learnSetModel(learnSet);
        return createdLearnSet.save();
    }

    public updateLearnSet(id: string, learnSet: LearnSet): Promise<any> {
        return this.learnSetModel.updateOne({ _id: new mongoose.Types.ObjectId(id), }, {
            name: learnSet.name,
            type: learnSet.type,
            week: learnSet.week,
            status: learnSet.status
        });
    }

    public delete(id: string): Promise<any> {
        return this.learnSetModel.deleteOne({ _id: new mongoose.Types.ObjectId(id), });
    }
}