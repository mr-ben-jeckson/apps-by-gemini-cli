import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

@ApiTags('Chat')
@Controller('v1/chat')
@UseGuards(FirebaseAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: ChatMessageDto })
  @ApiResponse({ status: 200, description: 'Successful chat response', type: ChatResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  chat(@Body('message') message: string, @Req() request) {
    const userId = request.user.uid;
    return this.chatService.chat(message, userId);
  }
}
