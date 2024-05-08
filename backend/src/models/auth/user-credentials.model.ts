import { ApiProperty } from "@nestjs/swagger";

export class UserCredentials {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}