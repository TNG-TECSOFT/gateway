import { ApiPropertyOptional } from '@nestjs/swagger';

export class paginationQuery {
  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  fromId: number;

  @ApiPropertyOptional()
  stages?: string;
}
