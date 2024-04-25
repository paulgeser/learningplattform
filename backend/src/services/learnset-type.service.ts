/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LearnSetType } from 'src/schemas/learnset-type.schema';

@Injectable()
export class LearnsetTypeService {

    constructor(
        @InjectModel(LearnSetType.name) private learnSetTypeModel: Model<LearnSetType>) { }

    public getAll(): Promise<LearnSetType[]> {
        return this.learnSetTypeModel.find();
    }

    public create(learnsetType: LearnSetType): Promise<LearnSetType> {
        const createdLearnSetType = new this.learnSetTypeModel(learnsetType);
        return createdLearnSetType.save();
    }

    public update(id: string, learnsetType: LearnSetType): Promise<any> {
        return this.learnSetTypeModel.updateOne({ _id: new mongoose.Types.ObjectId(id), }, {
            name: learnsetType.name,
            description: learnsetType.description,
        });
    }

    public delete(id: string): Promise<any> {
        return this.learnSetTypeModel.deleteOne({ _id: new mongoose.Types.ObjectId(id), });
    }
}
