import { Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';

export const FirestoreProvider: Provider = {
  provide: 'FIRESTORE',
  useFactory: () => {
    if (!admin.apps.length) {
      const serviceAccount = require('../../firebase-service-account-key.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    return admin.firestore();
  },
};
