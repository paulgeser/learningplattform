import { ApiProperty } from "@nestjs/swagger";
import { AppRole } from "./app-role.enum";
import { LearnSetStudyLanguage } from "../learnset/learnset-study-language.enum";

export class BasicUser {
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
    active: boolean
}