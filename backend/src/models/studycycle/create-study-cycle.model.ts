import { ApiProperty } from "@nestjs/swagger";
import { StudyCycleType } from "./study-cycle-type.enum";

export class CreateStudyCycle {
    @ApiProperty()
    learnSetIds: string[];
    @ApiProperty()
    studyCycleType: StudyCycleType;
    @ApiProperty()
    neededAttemps: number;
}