import { LearnSetStatus } from "./status.enum";
import { LearnSetType } from "./type.enum";


export interface CreateLearnSet {
    name: string;
    type: LearnSetType;
    week: number;
    status: LearnSetStatus;
}