import { ApiProperty } from "@nestjs/swagger";

export class StudyCycleWord {
    @ApiProperty()
    learnSetWordId: string;
    @ApiProperty()
    learned: boolean;
    @ApiProperty()
    tempTries: number;
    @ApiProperty()
    fullTries: number;
}