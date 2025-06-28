import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Firestore } from '@google-cloud/firestore';
import { ChatMessageDto } from './dto/chat-message.dto';
import { MessageContentDto } from './dto/message-content.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject('FIRESTORE') private firestore: Firestore,
  ) {}

  async chat(userMessage: string, userId: string): Promise<any> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const data = {
      contents: [
        {
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
    };

    const geminiResponse = await this.httpService.post(url, data).pipe(
      map((response) => response.data),
    ).toPromise();

    const userMessageContent: MessageContentDto = {
      content: userMessage,
      file: undefined, // Assuming no file for user's initial message
      timestamp: new Date(),
    };

    const geminiResponseText = geminiResponse.candidates[0].content.parts[0].text;
    const geminiMessageContent: MessageContentDto = {
      content: geminiResponseText,
      file: undefined, // Assuming no file for Gemini's response
      timestamp: new Date(),
    };

    const chatHistoryDocument: ChatMessageDto = {
      senderId: userId,
      messages: [userMessageContent, geminiMessageContent],
      timestamp: new Date(),
    };

    const chatCollection = this.firestore.collection('user').doc(userId).collection('ChatHistories');
    await chatCollection.add(chatHistoryDocument);

    return geminiResponse;
  }
}
