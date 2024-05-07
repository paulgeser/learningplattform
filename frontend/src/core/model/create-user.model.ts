import { AppRole } from "../enum/app-role.enum";
import { StudyLanguage } from "../enum/study-language.enum";


export interface CreateUserModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studyLanguage: StudyLanguage;
  appRole: AppRole;
  password: string;
  active: boolean;
}