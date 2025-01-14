<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import CardBox from '@/components/CardBox.vue';
// import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import LayoutGuest from '@/layouts/LayoutGuest.vue';
import { useMainStore } from '@/stores/main';
import { RequestApi } from '@/boot/RequestApi';
let request = new RequestApi();
onMounted(() => {
  // connected();
});

const mainStore = useMainStore();

const router = useRouter();
let loading = ref(false);
// let remember = ref(true);
let email = ref('');
let password = ref('');

async function submit() {
  loading.value = true;

  let data = { email: email.value, password: password.value };
  const response = await request.logIn(data);
  console.log(response.status);
  if (response.status == true) {
    router.push('/Dashboard');
    loading.value = false;
  } else {
    loading.value = false;
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Adresse email" help="Entrer votre adfesse email">
          <FormControl
            v-model="email"
            :icon="mdiAccount"
            name="email"
            autocomplete="email"
          />
        </FormField>

        <FormField label="Mot de passe" help="Definissez votre mot de passe">
          <FormControl
            v-model="password"
            :icon="mdiAsterisk"
            type="password"
            name="Mot de passe"
            autocomplete="current-password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              :loading="loading"
              color="info"
              label="Se Connecter"
            />
          </BaseButtons>
        </template>

        <a href="/Register" rel="noopener noreferrer">S'inscrire</a>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
