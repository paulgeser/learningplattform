import { LearnSetStudyLanguage } from "../learnset/learnset-study-language.enum";
import { AppRole } from "./app-role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUser {
    @ApiProperty()
    username: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    studyLanguage: LearnSetStudyLanguage;
    @ApiProperty()
    appRole: AppRole;
    @ApiProperty()
    password: string;
}