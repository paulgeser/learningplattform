import { AppRole } from "./app-role.enum";
import { StudyLanguage } from "./study-language.enum";

export class BasicUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studyLanguage: StudyLanguage;
    appRole: AppRole;
    active: boolean
}