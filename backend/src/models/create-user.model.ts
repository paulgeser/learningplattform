import { StudyLanguage } from "./study-language.enum";
import { AppRole } from "./app-role.enum";

export class CreateUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studyLanguage: StudyLanguage;
    appRole: AppRole;
    password: string;
}