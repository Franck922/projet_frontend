<script setup>
import {
  mdiAccountSwitch,
  mdiAsterisk,
  mdiCogOutline,
  mdiAccount,
  mdiContentCopy,
  mdiLock,
  mdiEye,
  mdiAccountAlertOutline,
  mdiGamepadCircle,
} from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import CardBox from '@/components/CardBox.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import FormControl from '@/components/FormControl.vue';

import CardBoxModal from '@/components/CardBoxModal.vue';
import BaseLevel from '@/components/BaseLevel.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '@/stores/main';
import { onMounted, computed, ref } from 'vue';
import { RequestApi } from '@/boot/RequestApi';

import FormField from '@/components/FormField.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
let request = new RequestApi();

const isModalActive = ref(false);
const isModalActiveNewPoste = ref(false);
const isModalPoste = ref(false);
const isModalCreateCB = ref(false);
const perPage = ref(5);
const perPageFilter = ref(5);
const currentPage = ref(0);
const currentPageFilter = ref(0);
let listEmploye = ref([]);
let listReservation = ref([]);
let listPlace = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
let listVol = ref([]);
let typePoste = ref([]);
let loading = ref(true);
let loadingAction = ref(false);
let place = ref('');
let vol = ref('');
const mainStore = useMainStore();

async function getVolList() {
  const response = await request.getListVol();
  if (response.status) {
    response.data.forEach((element) => {
      listVol.value.push({
        id: element.id,
        label: ' Vol numero : ' + element.flight_number,
        description:
          'Départ:  ' +
          element.departure_city +
          ' à ' +
          element.departure_time +
          ' Arrivée : ' +
          element.arrival_city +
          ' à ' +
          element.arrival_time,
      });
    });
  } else {
    // loading.value = false;
  }
}
const itemsPaginated = computed(() =>
  listReservation.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listReservation.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  console.log(pagesList);
  return pagesList;
});
const router = useRouter();

onMounted(async () => {
  await getVolList();
  await getListReservations();
});

const newReservation = async () => {
  loadingAction.value = true;
  let data = {
    user_id: mainStore.id,
    flight_id: vol.value.id,
    seats: place.value,
  };
  const response = await request.newReservation(data);
  if (response.status) {
    toast.success('Succes !', {
      autoClose: 2000,
    });
    await getListReservations();
    loadingAction.value = false;
    isModalActive.value = false;
  } else {
    toast.error('Une erreur est survenue !', {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
};
const getListReservations = async () => {
  listReservation.value = [];
  loading.value = true;

  const response = await request.getListReservations(mainStore.id);
  if (response.status) {
    listReservation.value = response.data;

    loading.value = false;
    isModalActive.value = false;
  } else {
    toast.error('Une erreur est survenue !', {
      autoClose: 2000,
    });
    loading.value = false;
  }
};
</script>

<template>
  <CardBoxModal v-model="isModalActiveNewPoste" title="Reserver une place">
    <p>
      Vous allez
      <b>reserver un vol</b>
    </p>
    {{ vol.description }}
    <FormField label="Selectionner le vol ">
      <FormControl v-model="vol" :options="listVol" />
    </FormField>
    <FormField label="Selectionner une place ">
      <FormControl v-model="place" :options="listPlace" />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingAction"
      :icon="mdiCogOutline"
      label="Enregistrer"
      color="bg-blue-400"
      small
      @click="newReservation"
    />
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountSwitch"
        title="Gestion des reservations"
        main
      >
        <BaseButton
          target="_blank"
          label="Nouvelle reservation"
          color="contrast"
          rounded-full
          small
          @click="isModalActiveNewPoste = true"
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox v-else class="mb-2" has-table>
        <table>
          <thead>
            <tr>
              <th>Nom</th>

              <th>email</th>

              <th>Numero de vol</th>
              <th>seats</th>
              <th>prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="posteUser in itemsPaginated" :key="posteUser.id">
              <td data-label="nom">
                {{ posteUser.user.name }}
              </td>

              <td data-label="email">
                {{ posteUser.user.email }}
              </td>

              <td data-label="flight_number">
                {{ posteUser.flight.flight_number }}
              </td>
              <td data-label="seats">
                {{ posteUser.seats }}
              </td>

              <td data-label="total_price">
                {{ posteUser.total_price }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    color="warning"
                    :icon="mdiGamepadCircle"
                    small
                    @click="setAction(posteUser)"
                  />

                  <BaseButton
                    color="info"
                    :icon="mdiEye"
                    small
                    @click="setAction1(posteUser)"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
          <BaseLevel>
            <BaseButtons>
              <BaseButton
                v-for="page in pagesList"
                :key="page"
                :active="page === currentPage"
                :label="page + 1"
                :color="page === currentPage ? 'lightDark' : 'whiteDark'"
                small
                @click="currentPage = page"
              />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
          </BaseLevel>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
