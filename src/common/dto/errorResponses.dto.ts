import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorDTO {
  @ApiProperty({ example: 'Forbidden resource' })
  message: string;
  @ApiProperty({
    type: 'object',
    properties: {
      title: {
        type: 'string',
        example: 'Sesion expirada, inicie sesión nuevamente.',
      },
    },
  })
  error: { title: string };
}
