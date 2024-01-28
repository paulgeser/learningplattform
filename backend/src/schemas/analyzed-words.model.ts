/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";


export class AnalyzedWordsModel {

  @ApiProperty()
  english: string;

  @ApiProperty()
  malagasy: string;
}
