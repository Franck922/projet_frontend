/* eslint-disable prettier/prettier */
import { api } from './axios';
import { ApiEndPoint } from './ApiEndPoint';
// import VueCookies from 'vue-cookies'
import jwt_decode from 'jwt-decode';
import { useMainStore } from '@/stores/main';

// import { ref } from '@vue/runtime-core';
export class RequestApi {
  constructor() {
    this.clientId = 0; // VueCookies.get('id');
    this.number = 0; //VueCookies.get('phone');
    this.ApiEndPoint = new ApiEndPoint();
  }

  /**
   *
   * @param {*} data   les donnees de l'utilisateur pour se connecter
   * @returns
   */
  logIn = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    const mainStore = useMainStore();
    api.defaults.headers.common['Authorization'] = null;
    await api
      .post(this.ApiEndPoint.login, data)
      .then(async (response) => {
        // let keySecret = jwt_decode(String(response.data.token)).keySecret;
        console.log(response.data.user);
        mainStore.setUser(response.data.user);
        mainStore.setToken(response.data.access_token);
        dataRes = {
          status: true,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*} data   les donnees de l'utilisateur pour se connecter
   * @returns
   */
  registerUsers = async (data) => {
    let dataRes = { status: true };

    api.defaults.headers.common['Authorization'] = null;
    await api
      .post(this.ApiEndPoint.user, data)
      .then(async (response) => {
        dataRes = {
          status: true,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  getStats = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.dashboard_stats)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   *
   * VOl
   *
   * @param {*}
   * @returns
   */
  newVol = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .post(this.ApiEndPoint.vol, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };

  /**
   *
   *
   * @param {*}
   * @returns
   */
  updateVol = async (idVol, data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .patch(this.ApiEndPoint.vol + '/' + idVol, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  deleteVol = async (idVol) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .delete(this.ApiEndPoint.vol + '/' + idVol)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };
  /**
   *
   * @param {*}
   * @returns
   */
  getListVol = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.vol)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   *
   * User
   *
   * @param {*}
   * @returns
   */
  newUser = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .post(this.ApiEndPoint.user, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };

  /**
   *
   *
   * @param {*}
   * @returns
   */
  updateUser = async (idUser, data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .patch(this.ApiEndPoint.user + '/update-role/' + idUser, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  changeStatus = async (idUser) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .delete(this.ApiEndPoint.user + '/' + idUser)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };
  /**
   *
   * @param {*}
   * @returns
   */
  getListUser = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.user)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  // reservation

  /**
   *
   * @param {*}
   * @returns
   */
  getListReservations = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.reservation)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  getListReservationsUser = async (idUser) => {
    let dataRes = { status: true };

    await api
      .get('/reservations-user/' + idUser)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   *
   * User
   *
   * @param {*}
   * @returns
   */
  newReservation = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: '' };

    await api
      .post(this.ApiEndPoint.reservation, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: '',
        };
      });
    return dataRes;
  };
}
