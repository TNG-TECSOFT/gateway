import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OnlyIdParamDTO {
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
