import { ApiProperty } from '@nestjs/swagger';
export class PaginatedResponseDTO<T> {
  @ApiProperty()
  data: T[];
  @ApiProperty()
  count: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageCount: number;
}
