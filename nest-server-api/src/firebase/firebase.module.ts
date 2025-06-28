import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirestoreProvider } from './firestore.provider';

@Module({
  providers: [FirebaseService, FirestoreProvider],
  exports: [FirebaseService, FirestoreProvider],
})
export class FirebaseModule {}
