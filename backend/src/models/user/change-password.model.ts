import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordModel {
    @ApiProperty()
    password: string;
}