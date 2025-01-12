<script setup>
import {
  mdiHomeGroup,
  mdiArrowDownBoldHexagonOutline,
  mdiTableBorder,
  mdiStateMachine,
  mdiEye,
  mdiCogOutline,
  mdiReload,
  mdiTrashCan,
  mdiPlusBox,
  mdiInformationVariantCircle,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButton from "@/components/BaseButton.vue";
// import UserAvatar from "@/components/UserAvatar.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { onMounted, computed, ref } from "vue";
import { RequestApi } from "@/boot/RequestApi";
let request = new RequestApi();

const isModalActive = ref(false);
const isModalUpdate = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);
let loading = ref(true);
let titre = ref("");
let webhook = ref("");
let description = ref("");
let reloading = ref(true);
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

const newVol = async () => {
  loadingUpdate.value = true;
  let data = {
    titre: titre.value,
    description: description.value,
    webhook: webhook.value,
  };
  const response = await request.newVol(data);
  if (response.status) {
    await getVolList();
    toast.success("Succes !", {
      autoClose: 2000,
    });
    titre.value = "";
    webhook.value = "";
    description.value = "";
    isModalActive.value = false;
    loadingUpdate.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingUpdate.value = false;
  }
};

const regeneateVolKey = async (MissionsecretKey) => {
  loadingUpdate.value = true;

  const response = await request.keyRefreshVol(MissionsecretKey);
  if (response.status) {
    await getVolList();
    toast.success("Succes !", {
      autoClose: 2000,
    });
    loadingUpdate.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingUpdate.value = false;
  }
};

let MissionsecretKey = ref("");
const seeInfoVol = async (Vol) => {
  titre.value = Vol.titre;
  webhook.value = Vol.webhook;
  MissionsecretKey.value = Vol.MissionsecretKey;

  description.value = "";
  isModalUpdate.value = true;
};

const updaeVol = async () => {
  loadingUpdate.value = true;
  let data = {
    titre: titre.value,
    description: description.value,
    webhook: webhook.value,
    MissionsecretKey: MissionsecretKey.value,
  };
  const response = await request.updateVol(data);
  if (response.status) {
    await getVolList();
    toast.success("Succes !", {
      autoClose: 2000,
    });
    isModalUpdate.value = false;
    titre.value = "";
    webhook.value = "";
    description.value = "";
    loadingUpdate.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    titre.value = "";
    webhook.value = "";
    isModalUpdate.value = false;

    description.value = "";
    loadingUpdate.value = false;
  }
};

const stateVol = async () => {
  loadingUpdate.value = true;

  const response = await request.changestatusVol(MissionsecretKey.value);
  if (response.status) {
    await getVolList();
    toast.success("Succes !", {
      autoClose: 2000,
    });
    isModalUpdate.value = false;
    titre.value = "";
    webhook.value = "";
    description.value = "";
    loadingUpdate.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    titre.value = "";
    webhook.value = "";
    isModalUpdate.value = false;
    description.value = "";
    loadingUpdate.value = false;
  }
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Nouveau Vol">
    <div class="mb-2 max-h-96 overflow-y-auto">
      <CardBox form @submit.prevent="submit">
        <FormField label="Titre" help="Do not enter the leading zero">
          <FormControl v-model="titre" type="titre" />
        </FormField>

        <FormField label="Webhook (url)" help="Do not enter the leading zero">
          <FormControl v-model="webhook" type="webhook" />
        </FormField>
        <!-- <FormField label="Description" help="The description. Max 255 characters">
          <FormControl type="textarea" v-model="description" />
        </FormField> -->
        <BaseButton
          target="_blank"
          :loading="loadingUpdate"
          :icon="mdiArrowDownBoldHexagonOutline"
          label="Creer"
          color="info"
          small
          @click="newVol"
        />
      </CardBox>
    </div>
  </CardBoxModal>

  <CardBoxModal v-model="isModalUpdate" title="Please confirm" button="danger">
    <div class="mb-2 max-h-96 overflow-y-auto">
      <CardBox form @submit.prevent="submit">
        <FormField label="Titre" help="Do not enter the leading zero">
          <FormControl v-model="titre" type="titre" />
        </FormField>

        <FormField label="Webhook (url)" help="Do not enter the leading zero">
          <FormControl v-model="webhook" type="webhook" />
        </FormField>
        <!-- <FormField label="Description" help="The description. Max 255 characters">
          <FormControl type="textarea" v-model="description" />
        </FormField> -->
        <BaseButton
          target="_blank"
          :loading="loadingUpdate"
          :icon="mdiArrowDownBoldHexagonOutline"
          label="Mettre a jour"
          color="info"
          small
          @click="updaeVol"
        />
        <BaseButton
          target="_blank"
          :loading="loadingUpdate"
          class="mx-2"
          :icon="mdiStateMachine"
          label="Changer le status"
          color="info"
          small
          @click="stateVol"
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
              <th>Titre</th>
              <th>Solde</th>
              <th>webhook</th>
              <th>Status</th>
              <th>Vol Secret Key</th>

              <th>Date de Creation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in Datas" :key="data.id">
              <td data-label="titre">
                {{ data.titre }}
              </td>
              <td data-label="solde">{{ data.solde }} XAF</td>
              <td data-label="webhook">
                {{ data.webhook }}
              </td>
              <td data-label="status">
                {{ data.status }}
              </td>
              <td data-label="MissionsecretKey ">
                {{ data.MissionsecretKey }}
              </td>
              <td data-label="dateCreated">
                {{ data.dateCreated }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="info"
                    :icon="mdiReload"
                    small
                    @click="regeneateVolKey(data.MissionsecretKey)"
                  />
                  <BaseButton
                    class="mx-1"
                    color="danger"
                    :icon="mdiInformationVariantCircle"
                    small
                    @click="seeInfoVol(data)"
                  />
                </BaseButtons>
              </td>
              <!-- <td data-label="codedata" class="lg:w-32">
          <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="data.progress">
            {{ produit.progress }}
          </progress>
        </td> -->
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
