<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button expand="full" @click="loginWithGoogle">Login with Google</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const loginWithGoogle = () => {
      // Redirect to your NestJS Google OAuth endpoint
      window.location.href = 'http://localhost:3000/auth/google';
    };

    // Handle the callback from NestJS
    const handleGoogleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token'); // Assuming NestJS sends token as query param

      if (token) {
        localStorage.setItem('jwt_token', token);
        router.replace('/tabs/tab1'); // Redirect to a protected route
      }
    };

    // Call handleGoogleCallback on component mount to check for token in URL
    // This might need to be in your main.ts or a global router guard depending on your setup
    // For simplicity, I'm putting it here, but consider a more robust solution.
    if (window.location.pathname === '/auth/google/callback') {
      handleGoogleCallback();
    }

    return {
      loginWithGoogle,
    };
  },
});
</script>
