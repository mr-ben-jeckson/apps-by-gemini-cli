<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.sender }}:</strong> {{ msg.text }}
      </div>
      <ion-item>
        <ion-input v-model="newMessage" placeholder="Type your message"></ion-input>
        <ion-button @click="sendMessage">Send</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue';
import axios from 'axios';

export default defineComponent({
  name: 'ChatPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
  },
  setup() {
    const newMessage = ref('');
    const messages = ref<{ sender: string; text: string }[]>([]);

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      messages.value.push({ sender: 'You', text: newMessage.value });

      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('No JWT token found. Please log in.');
        // Redirect to login page
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:3000/v1/chat', // Your NestJS chat endpoint
          { message: newMessage.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        messages.value.push({ sender: 'AI', text: response.data.candidates[0].content.parts[0].text });
      } catch (error) {
        console.error('Error sending message:', error);
        messages.value.push({ sender: 'System', text: 'Error: Could not get response.' });
      } finally {
        newMessage.value = '';
      }
    };

    return {
      newMessage,
      messages,
      sendMessage,
    };
  },
});
</script>
