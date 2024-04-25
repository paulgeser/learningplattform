import { LearnSetType } from "./learnset-type.model";
import { LearnSetStatus } from "./status.enum";


export interface CreateLearnSet {
    name: string;
    type: LearnSetType;
    week: number;
    status: LearnSetStatus;
}