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
  await getUserList();
});
const loadingUpdate = ref(false);

async function getUserList() {
  reloading.value = true;
  const response = await request.getListUser();
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

let idUser = ref(0);
const changeStatus = async (dataUser) => {
  loadingUpdate.value = true;

  let data = {
    usertype: dataUser.usertype == 'admin' ? 'user' : 'admin',
  };
  const response = await request.updateUser(dataUser.id, data);
  if (response.status) {
    await getUserList();
    toast.success('Succes !', {
      autoClose: 2000,
    });
    isModalUpdate.value = false;

    loadingUpdate.value = false;
  } else {
    toast.error('Une erreur est survenue !', {
      autoClose: 2000,
    });

    loadingUpdate.value = false;
  }
};

const close = () => {
  loadingUpdate.value = false;
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Reservation"
        main
      >
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox v-else class="mb-2" has-table>
        <table>
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Adrese mail l'utilisateur</th>
              <th>Role de l'utilisateur</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in itemsPaginated" :key="data.id">
              <td data-label="name">
                {{ data.name }}
              </td>
              <td data-label="email">
                {{ data.email }}
              </td>

              <td data-label="usertype">
                {{ data.usertype }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="info"
                    :icon="mdiStateMachine"
                    :label="
                      data.usertype === 'admin'
                        ? 'Retirer' + ' admin'
                        : 'Nommer' + ' admin'
                    "
                    small
                    @click="changeStatus(data)"
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
