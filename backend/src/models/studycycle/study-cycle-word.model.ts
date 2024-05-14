import { ApiProperty } from "@nestjs/swagger";

export class StudyCycleWord {
    @ApiProperty()
    learnSetWordId: string;
    @ApiProperty()
    attempts: number;
}