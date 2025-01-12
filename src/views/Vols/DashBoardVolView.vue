<script setup>
import {
  mdiHomeGroup,
  mdiArrowDownBoldHexagonOutline,
  mdiTableBorder,
  mdiStateMachine,
  mdiGamepadCircle,
  mdiCogOutline,
  mdiLock,
  mdiReload,
  mdiTrashCan,
  mdiPlusBox,
  mdiInformationVariantCircle,
} from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import CardBox from '@/components/CardBox.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';

import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import CardBoxModal from '@/components/CardBoxModal.vue';
import BaseLevel from '@/components/BaseLevel.vue';
import BaseButton from '@/components/BaseButton.vue';
// import UserAvatar from "@/components/UserAvatar.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onMounted, computed, ref } from 'vue';
import { RequestApi } from '@/boot/RequestApi';
let request = new RequestApi();

const isModalActive = ref(false);
const isModalUpdate = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const listVille = [
  { label: 'Business development' },
  { label: 'Marketing' },
  { label: 'Sales' },
];
const currentPage = ref(0);
let loading = ref(true);
let reloading = ref(false);
let flight_number = ref('');
let departure_city = ref('');
let arrival_city = ref('');
let departure_time = ref('');
let arrival_time = ref('');
let price = ref(0);
let seats_available = ref(0);
let Datas = ref([]);

const itemsPaginated = computed(() =>
  Datas.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(Datas.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

onMounted(async () => {
  await getVolList();
});
const loadingUpdate = ref(false);

async function getVolList() {
  reloading.value = true;
  const response = await request.getListVol();
  if (response.status) {
    reloading.value = false;
    loading.value = false;
    Datas.value = response.data;
  } else {
    reloading.value = false;

    loading.value = false;
  }
}
const formatDate = (date, time) => {
  const [hours, minutes] = time.split(':'); // Sépare les heures et minutes
  const newDate = new Date(date); // Crée un objet Date à partir de la date
  newDate.setHours(hours, minutes); // Définit les heures et minutes
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Mois : 01-12
  const day = String(newDate.getDate()).padStart(2, '0'); // Jour : 01-31
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}`; // Heure : HH:mm
  return `${year}/${month}/${day} ${formattedTime}`;
};
const submit = async () => {
  loadingUpdate.value = true;
  let data = {
    flight_number: flight_number.value,
    departure_city: departure_city.value.label,
    arrival_city: arrival_city.value.label,
    departure_time: formatDate(new Date(), departure_time.value),
    arrival_time: formatDate(new Date(), arrival_time.value),
    price: price.value,
    seats_available: seats_available.value,
  };
  console.log(data);
  const response = await request.newVol(data);
  if (response.status) {
    await getVolList();
    toast.success('Succes !', {
      autoClose: 2000,
    });
    flight_number.value = '';
    departure_city.value = '';
    arrival_city.value = '';
    departure_time.value = '';
    price.value = '';
    arrival_time.value = '';
    seats_available.value = '';

    isModalActive.value = false;
    loadingUpdate.value = false;
  } else {
    toast.error('Une erreur est survenue !', {
      autoClose: 2000,
    });
    loadingUpdate.value = false;
  }
};

const seeInfoVol = async (Vol) => {
  // titre.value = Vol.titre;
  // webhook.value = Vol.webhook;
  // MissionsecretKey.value = Vol.MissionsecretKey;
  // description.value = '';
  // isModalUpdate.value = true;
};

const updateVol = async () => {
  loadingUpdate.value = true;
  let data = {
    flight_number: flight_number.value,
    departure_city: departure_city.value.label,
    arrival_city: arrival_city.value.label,
    departure_time: formatDate(new Date(), departure_time.value),
    arrival_time: formatDate(new Date(), arrival_time.value),
    price: price.value,
    seats_available: seats_available.value,
  };
  console.log(data);
  const response = await request.updateVol(idVol.value, data);
  if (response.status) {
    await getVolList();
    toast.success('Succes !', {
      autoClose: 2000,
    });
    isModalUpdate.value = false;
    flight_number.value = '';
    departure_city.value = '';
    arrival_city.value = '';
    departure_time.value = '';
    price.value = '';
    arrival_time.value = '';
    seats_available.value = '';
    loadingUpdate.value = false;
  } else {
    toast.error('Une erreur est survenue !', {
      autoClose: 2000,
    });
    flight_number.value = '';
    departure_city.value = '';
    arrival_city.value = '';
    departure_time.value = '';
    price.value = '';
    arrival_time.value = '';
    seats_available.value = '';

    loadingUpdate.value = false;
  }
};

const deleteVol = async (id) => {
  loadingUpdate.value = true;

  const response = await request.deleteVol(id);
  if (response.status) {
    await getVolList();
    toast.success('Succes !', {
      autoClose: 2000,
    });
    isModalUpdate.value = false;

    loadingUpdate.value = false;
  } else {
    toast.error('Une erreur est survenue !', {
      autoClose: 2000,
    });
    flight_number.value = '';
    departure_city.value = '';
    arrival_city.value = '';
    departure_time.value = '';
    price.value = '';
    arrival_time.value = '';
    seats_available.value = '';

    loadingUpdate.value = false;
  }
};

let idVol = ref(0);
const setToUpdate = async (vol) => {
  flight_number.value = vol.flight_number;
  departure_city.value = { label: vol.departure_city };
  arrival_city.value = { label: vol.departure_city };
  departure_time.value = vol.departure_time.split(' ')[1];
  arrival_time.value = vol.arrival_time.split(' ')[1];
  price.value = vol.price;
  seats_available.value = vol.seats_available;
  idVol.value = vol.id;
  isModalUpdate.value = true;
};

const close = () => {
  loadingUpdate.value = false;
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Nouveau Vol">
    <div class="mb-2 max-h-96 overflow-y-auto">
      <CardBox form @submit.prevent="submit">
        <FormField label="Numero de vol" help="Do not enter the leading zero">
          <FormControl v-model="flight_number" type="titre" />
        </FormField>

        <FormField label="Ville de depart" help="Do not enter the leading zero">
          <FormControl v-model="departure_city" :options="listVille" />
        </FormField>

        <FormField
          label="heure de depart"
          help="The description. Max 255 characters"
        >
          <FormControl v-model="departure_time" type="time" />
        </FormField>

        <FormField label="Ville d'arrive" help="Do not enter the leading zero">
          <FormControl v-model="arrival_city" :options="listVille" />
        </FormField>

        <FormField label="heure d'arrive" help="Do not enter the leading zero">
          <FormControl v-model="arrival_time" type="time" />
        </FormField>
        <FormField label="Prix (FCFA)" help="Do not enter the leading zero">
          <FormControl v-model="price" type="number" />
        </FormField>
        <FormField label="Nombre de place" help="Do not enter the leading zero">
          <FormControl v-model="seats_available" type="number" />
        </FormField>
        <BaseButton
          target="_blank"
          :loading="loadingUpdate"
          :icon="mdiArrowDownBoldHexagonOutline"
          label="Creer"
          color="info"
          small
          @click="submit"
        />
      </CardBox>
    </div>
  </CardBoxModal>

  <CardBoxModal v-model="isModalUpdate" title="Mettre a jour un Vol">
    <div class="mb-2 max-h-96 overflow-y-auto">
      <CardBox form @submit.prevent="submit">
        <FormField label="Numero de vol" help="Do not enter the leading zero">
          <FormControl v-model="flight_number" type="titre" />
        </FormField>

        <FormField label="Ville de depart" help="Do not enter the leading zero">
          <FormControl v-model="departure_city" :options="listVille" />
        </FormField>

        <FormField
          label="heure de depart"
          help="The description. Max 255 characters"
        >
          <FormControl v-model="departure_time" type="time" />
        </FormField>

        <FormField label="Ville d'arrive" help="Do not enter the leading zero">
          <FormControl v-model="arrival_city" :options="listVille" />
        </FormField>

        <FormField label="heure d'arrive" help="Do not enter the leading zero">
          <FormControl v-model="arrival_time" type="time" />
        </FormField>
        <FormField label="Prix (FCFA)" help="Do not enter the leading zero">
          <FormControl v-model="price" type="number" />
        </FormField>
        <FormField label="Nombre de place" help="Do not enter the leading zero">
          <FormControl v-model="seats_available" type="number" />
        </FormField>

        <BaseButton
          target="_blank"
          :loading="loadingUpdate"
          :icon="mdiStateMachine"
          label="Mettre a jour"
          color="info"
          small
          @click="updateVol"
        />
        <BaseButton
          target="_blank"
          :loading="loadingUpdate"
          class="mx-2"
          :icon="mdiLock"
          label="Retour"
          color="danger"
          small
          @click="close"
        />
      </CardBox>
    </div>
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Vol" main>
        <BaseButton
          :loading="reloading"
          target="_blank"
          :icon="mdiPlusBox"
          label="Nouveau"
          color="contrast"
          rounded-full
          small
          @click="isModalActive = true"
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox v-else class="mb-2" has-table>
        <table>
          <thead>
            <tr>
              <th>Numero de vol</th>
              <th>Ville de depart</th>
              <th>heure de depart</th>
              <th>Ville d'arrive</th>
              <th>heure d'arrive</th>
              <th>Prix</th>
              <th>Nombre de place</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in itemsPaginated" :key="data.id">
              <td data-label="flight_number">
                {{ data.flight_number }}
              </td>
              <td data-label="departure_city">
                {{ data.departure_city }}
              </td>

              <td data-label="departure_time">
                {{ data.departure_time }}
              </td>
              <td data-label="arrival_city">
                {{ data.arrival_city }}
              </td>
              <td data-label="arrival_time">
                {{ data.arrival_time }}
              </td>

              <td data-label="price">{{ data.price }} XAF</td>

              <td data-label="seats_available">
                {{ data.seats_available }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="info"
                    :icon="mdiStateMachine"
                    label="Modifier"
                    small
                    @click="setToUpdate(data)"
                  />
                  <BaseButton
                    target="_blank"
                    :loading="loadingUpdate"
                    class="mx-2"
                    :icon="mdiLock"
                    label="Supprimer"
                    color="danger"
                    small
                    @click="deleteVol(data.id)"
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
