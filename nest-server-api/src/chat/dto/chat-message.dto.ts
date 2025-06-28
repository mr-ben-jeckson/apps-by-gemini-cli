import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({ description: 'The message to send to the chat AI' })
  message: string;
}
