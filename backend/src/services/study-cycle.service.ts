/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateStudyCycle } from 'src/models/studycycle/create-study-cycle.model';
import { StudyCycleStatus } from 'src/models/studycycle/study-cycle-status.enum';
import { StudyCycle } from 'src/schemas/study-cycle.schema';
import { LearnsetWordService } from './learnset-word.service';
import { StudyCycleWord } from 'src/models/studycycle/study-cycle-word.model';
import { UpdateStudyCycleStatus } from 'src/models/studycycle/update-study-cycle-status.model';

@Injectable()
export class StudyCycleService {

    constructor(
        @InjectModel(StudyCycle.name) private studyCycleModel: Model<StudyCycle>,
        private learnSetWordService: LearnsetWordService
    ) { }

    public async createStudyCycle(createStudyCycle: CreateStudyCycle, username: string): Promise<StudyCycle> {
        let fullListOfWords: StudyCycleWord[] = [];
        for (const learnSetId of createStudyCycle.learnSetIds) {
            const words = await this.learnSetWordService.getAllByLearnSetId(learnSetId);
            const wordIds = words.map((word: any) => word._id as string);
            const mappedWords = wordIds.map(wordId => ({
                learnSetWordId: String(wordId),
                attempts: 0
            } as StudyCycleWord));
            fullListOfWords = fullListOfWords.concat(mappedWords);
        }
        const newStudyCycle: StudyCycle = {
            learnSetIds: createStudyCycle.learnSetIds,
            learnStatus: StudyCycleStatus.NOT_STARTED,
            dateCreated: new Date(),
            dateFinished: null,
            username: username,
            studyCycleType: createStudyCycle.studyCycleType,
            learnSetWords: fullListOfWords,
            neededAttemps: createStudyCycle.neededAttemps
        }
        const createdStudyCycle = new this.studyCycleModel(newStudyCycle);
        return createdStudyCycle.save();
    }

    public getStudyCyclesByUsername(username: string): Promise<StudyCycle[]> {
        return this.studyCycleModel.find({ username: username });
    }

    public async delete(id: string, username: string): Promise<mongoose.mongo.DeleteResult> {
        const result = await this.studyCycleModel.deleteOne({ _id: new mongoose.Types.ObjectId(id), username: username });
        if (result.deletedCount === 0) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return result;
    }

    public async updateStudyCycleStatus(id: string, updateStudyCycleStatus: UpdateStudyCycleStatus, username: string): Promise<mongoose.UpdateWriteOpResult> {
        let result: mongoose.UpdateWriteOpResult;
        if (updateStudyCycleStatus.status === StudyCycleStatus.DONE) {
            result = await this.studyCycleModel.updateOne({ _id: new mongoose.Types.ObjectId(id), username: username }, {
                learnStatus: updateStudyCycleStatus.status,
                dateFinished: new Date()
            });
        } else {
            result = await this.studyCycleModel.updateOne({ _id: new mongoose.Types.ObjectId(id), username: username }, {
                learnStatus: updateStudyCycleStatus.status,
                dateFinished: null
            });
        }
        if (result.matchedCount === 0) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return result;
    }

    public async updateStudyCycleWords(id: string, toBeUpdatedWords: StudyCycleWord[], username: string): Promise<mongoose.UpdateWriteOpResult> {
        const findResult = await this.studyCycleModel.findOne({ _id: new mongoose.Types.ObjectId(id), username: username });
        if (findResult) {
            const studyCycle: StudyCycle = findResult;
            const newLearnSetWords: StudyCycleWord[] = [];
            studyCycle.learnSetWords.forEach(learnSetWord => {
                const findWordResult = toBeUpdatedWords.find(updateWord => updateWord.learnSetWordId === learnSetWord.learnSetWordId);
                if (findWordResult) {
                    newLearnSetWords.push(findWordResult);
                } else {
                    newLearnSetWords.push(learnSetWord);
                }
            });
            studyCycle.learnSetWords = newLearnSetWords;
            const updateResult: mongoose.UpdateWriteOpResult = await this.studyCycleModel.updateOne({ _id: new mongoose.Types.ObjectId(id), username: username }, studyCycle);
            return updateResult;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
