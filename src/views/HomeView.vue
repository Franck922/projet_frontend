<script setup>
import { computed, ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiChartPie,
} from '@mdi/js';
import * as chartConfig from '@/components/Charts/chart.config.js';
import LineChart from '@/components/Charts/LineChart.vue';
import SectionMain from '@/components/SectionMain.vue';
import CardBoxWidget from '@/components/CardBoxWidget.vue';
import CardBox from '@/components/CardBox.vue';
import TableSampleClients from '@/components/TableSampleClients.vue';
import NotificationBar from '@/components/NotificationBar.vue';
import BaseButton from '@/components/BaseButton.vue';
import CardBoxTransaction from '@/components/CardBoxTransaction.vue';
import CardBoxClient from '@/components/CardBoxClient.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import { RequestApi } from '@/boot/RequestApi';
let request = new RequestApi();
import router from '@/router';

const chartData = ref(null);
const dashData = ref({
  total_users: 0,
  total_flights: 0,
  total_admins: 0,
  total_reservations: 0,
});

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
onMounted(async () => {
  await getDashBoard();
  fillChartData();
});

let loading = ref(true);
let total_flights = ref(0);
let total_admins = ref(0);
let total_users = ref(0);
let total_reservations = ref(0);
async function getDashBoard() {
  console.log('------');

  loading.value = false;
  const response = await request.getStats();
  console.log('------', response);

  if (response.status == true) {
    total_users.value = response.data.total_users;
    total_flights.value = response.data.total_flights;
    total_admins.value = response.data.total_admins;
    total_reservations.value = response.data.total_reservations;
    loading.value = false;
  } else {
    loading.value = false;
  }
  console.log('------', dashData.value);
}
function projet() {
  console.log('------');
  router.push('utilisateurs');
}
function commande() {
  console.log('------');
  router.push('commandes');
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="DashBoard"
        main
      >
        <BaseButton
          target="_blank"
          :icon="mdiReload"
          label="Actualise"
          color="contrast"
          rounded-full
          small
          @click="getDashBoard"
        />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="total_users"
          label="Clients"
          :navigate="projet"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="total_admins"
          label="Administrateur"
          :navigate="boutique"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="total_reservations"
          :navigate="commande"
          label="Reservations"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="total_flights"
          suffix=""
          :navigate="projet"
          label="Vols"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
