import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
export const useMainStore = defineStore('main', {
  state: () => ({
    name: null,
    email: null,
    usertype: null,
    id: null,
    userAvatar: null,
    token: null,
    refreshToken: null, // Ajout de la propriété pour la durée de vie du token
    user: null,
    isFieldFocusRegistered: false,

    clients: [],
    history: [],
    listAgregator: [],
    listProjet: [],
    listLivraisons: [],
  }),
  actions: {
    setToken(access_token) {
      this.access_token = access_token;
      localStorage.setItem('access_token', this.access_token);
    },
    setUser(user) {
      user;
      if (user) {
        this.user = user;
        localStorage.setItem('user', this.user);
      }
      if (user.name) {
        this.name = user.name;
        localStorage.setItem('name', this.name);
      }
      if (user.id) {
        this.id = user.id;
        localStorage.setItem('id', this.id);
        console.log('user-----------------', this.id, this.user);
      }
      if (user.usertype) {
        this.usertype = user.usertype;
        localStorage.setItem('usertype', this.usertype);
      }
      if (user.email) {
        this.email = user.email;
        localStorage.setItem('email', this.email);
      }

      this.userAvatar =
        'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93';

      localStorage.setItem('userAvatar', this.userAvatar);
    },
    clear() {
      this.name = null;
      this.email = null;
      this.access_token = null;
      this.usertype = null;
      this.id = null;
      localStorage.clear();
    },
    onCreated() {
      localStorage.setItem(
        'userAvatar',
        'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
      );

      // Récupérer les informations de l'utilisateur à partir du localStorage
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const name = localStorage.getItem('name');

      const usertype = localStorage.getItem('usertype');
      const email = localStorage.getItem('email');
      const userAvatar = localStorage.getItem('userAvatar');

      // Mettre à jour les informations de l'utilisateur dans le store
      console.log(token);
      if (token != null) {
        this.setUser({
          access_token: localStorage.getItem('access_token'),
        });
        this.setToken(token, refreshToken);
      }
    },
    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
