import { LearnSetType } from "./learnset-type.model";
import { LearnSetStatus } from "../enum/status.enum";


export interface CreateLearnSet {
    name: string;
    type: LearnSetType;
    week: number;
    chapter: number;
    status: LearnSetStatus;
}