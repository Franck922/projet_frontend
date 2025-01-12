import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '@/stores/main';

// import Style from "@/views/StyleView.vue";
import Home from '@/views/HomeView.vue';

const routes = [
  // {
  //   meta: {
  //     title: "Select style",
  //   },
  //   path: "/",
  //   name: "style",
  //   component: Style,
  // },

  {
    meta: {
      title: 'Login',
    },
    path: '/',
    name: 'login',
    component: () => import('@/views/View.vue'),
  },

  {
    meta: {
      title: 'Register',
    },
    path: '/Register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
  },

  {
    meta: {
      title: 'Login',
    },
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    meta: {
      title: 'Dashboard',
    },
    path: '/Dashboard',
    name: 'Employe',
    component: () => import('@/views/HomeView.vue'),
  },

  {
    meta: {
      title: 'Gestion des Vols',
    },
    path: '/Vols',
    name: 'Gestion des Vols',
    component: () => import('@/views/Vols/DashBoardVolView.vue'),
  },

  {
    meta: {
      title: 'Gestion des Utilisateurs',
    },
    path: '/Utilisateurs',
    name: 'Gestion des Utilisateurs',
    component: () =>
      import('@/views/Utilisateurs/DashBoardUtilisateurView.vue'),
  },
  {
    meta: {
      title: 'Nouvelle Reservations',
    },
    path: '/New-Reservation',
    name: 'Nouvelle Reservations',
    component: () => import('@/views/Reservation/ReservationUserView.vue'),
  },

  {
    meta: {
      title: 'Gestion des Reservations',
    },
    path: '/Reservations',
    name: 'Gestion des Reservations',
    component: () => import('@/views/Reservation/DashboardReservationView.vue'),
  },

  {
    meta: {
      title: 'Error',
    },
    path: '/:catchAll(.*)*',
    name: 'error',
    component: () => import('@/views/ErrorView.vue'),
  },
];

const router = createRouter({
  base: '/',
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to) => {
  // const mainStore = useMainStore();
  // if (to.name != "login") {
  //   console.log("connecge------------------", mainStore.id, to.name);
  //   if (mainStore.id == null) {
  //     router.push("/");
  //   }
  // }
  // if (to.name == "login") {
  //   if (mainStore.id != null) {
  //     console.log("is login------------------");
  //     router.push("/");
  //   }
  // }
});
export default router;
