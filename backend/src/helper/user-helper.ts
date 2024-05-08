import { BasicUser } from "src/models/user/basic-user.model";
import { AppUser } from "src/schemas/app-user.schema";


export function removeAllRestrictedDataFromUser(user: AppUser): BasicUser {
    return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        studyLanguage: user.studyLanguage,
        appRole: user.appRole,
        active: user.active
    }
}