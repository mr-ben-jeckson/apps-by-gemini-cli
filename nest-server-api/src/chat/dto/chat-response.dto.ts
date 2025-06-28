import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty({ description: 'The response from the chat AI' })
  response: any; // You might want to define a more specific type here
}
