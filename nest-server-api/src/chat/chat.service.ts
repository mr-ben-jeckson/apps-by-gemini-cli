import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject('FIRESTORE') private firestore: Firestore,
  ) {}

  async chat(message: string, userId: string) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const data = {
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    };

    const geminiResponse = await this.httpService.post(url, data).pipe(
      map((response) => response.data),
    ).toPromise();

    const messageCollection = this.firestore.collection('messages');
    await messageCollection.add({
      message,
      response: geminiResponse,
      userId,
      timestamp: new Date(),
    });

    return geminiResponse;
  }
}
