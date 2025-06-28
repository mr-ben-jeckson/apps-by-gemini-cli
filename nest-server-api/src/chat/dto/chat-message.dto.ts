import { ApiProperty } from '@nestjs/swagger';
import { MessageContentDto } from './message-content.dto';

export class ChatMessageDto {
  @ApiProperty({ description: 'The ID of the sender' })
  senderId: string;

  @ApiProperty({ type: [MessageContentDto], description: 'Array of chat messages' })
  messages: MessageContentDto[];

  @ApiProperty({ description: 'Timestamp of the chat message document' })
  timestamp: Date;
}
