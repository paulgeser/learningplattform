import { BasicUser } from "./basic-user.model";

export interface CheckLoginResponse {
    token: string;
    user: BasicUser;
}