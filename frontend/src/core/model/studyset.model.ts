import { StudySetStatus } from "../enum/studyset-status.enum";
import { StudySetType } from "../enum/studyset-type.enum";
import { StudySetWord } from "./study-cycle-word.model";

export interface StudySet {
  _id: string;
  learnSetIds: string[];
  username: string;
  learnStatus: StudySetStatus;
  studyCycleType: StudySetType;
  learnSetWords: StudySetWord[];
  neededAttemps: number;
  dateCreated: string;
  dateFinished: string | null;
}
