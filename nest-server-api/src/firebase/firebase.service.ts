import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      const serviceAccount = require('../../firebase-service-account-key.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
}