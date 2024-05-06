import { AppRole } from "../enum/app-role.enum";
import { StudyLanguage } from "../enum/study-language.enum";


export interface BasicUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studyLanguage: StudyLanguage;
    appRole: AppRole;
    active: boolean
}