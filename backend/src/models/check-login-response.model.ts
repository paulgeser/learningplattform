import { BasicUser } from "./basic-user.model";

export class CheckLoginResponse {
    token: string;
    user: BasicUser;
}