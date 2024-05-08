import { ApiProperty } from "@nestjs/swagger";
import { StudyCycleStatus } from "./study-cycle-status.enum";

export class UpdateStudyCycleStatus {
    @ApiProperty()
    status: StudyCycleStatus;
}