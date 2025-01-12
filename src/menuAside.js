import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiAccountSwitch,
  mdiBell,
  mdiHomeGroup,
  mdiCommentProcessing,
  mdiPhoneSettings,
} from '@mdi/js';

export default [
  {
    to: '/Dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    to: '/Vols',
    icon: mdiHomeGroup,
    label: 'Vols',
  },
  {
    to: '/Reservations',
    label: 'Reservations',
    icon: mdiAccountSwitch,
  },
  {
    to: '/Utilisateurs',
    label: 'Utilisateurs',
    icon: mdiAccountSwitch,
  },

  {
    to: '/New-Reservation',
    label: 'Reservation',
    icon: mdiAccountSwitch,
  },
  {
    to: '/Parametre',
    label: 'Parametre',
    icon: mdiAccountSwitch,
  },
];
