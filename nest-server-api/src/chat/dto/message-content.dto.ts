import { ApiProperty } from '@nestjs/swagger';

export class MessageContentDto {
  @ApiProperty({ description: 'The content of the message' })
  content: string;

  @ApiProperty({ description: 'Optional file associated with the message' })
  file?: string;

  @ApiProperty({ description: 'Timestamp of the message' })
  timestamp: Date;
}
