import { AnalyzedWordsModel } from "./analyzed-words.model";

export interface Word extends AnalyzedWordsModel {
    _id: string;
    learnSetId: string;
    image: string;
}