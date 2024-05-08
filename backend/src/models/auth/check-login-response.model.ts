import { ApiProperty } from "@nestjs/swagger";
import { BasicUser } from "../user/basic-user.model";

export class CheckLoginResponse {
    @ApiProperty()
    token: string;
    @ApiProperty()
    user: BasicUser;
}