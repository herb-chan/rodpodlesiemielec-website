import {
  faUserTie,
  faUserPen,
  faUser,
  faUserTag,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

export const getBoardMemberIcon = (role) => {
  switch (role.toLowerCase()) {
    case 'prezes':
    case 'v-ce prezes':
      return faUserTie;
    case 'sekretarz':
      return faUserPen;
    case 'kasjer':
      return faUserTag;
    case 'elektryk':
      return faUserGear;
    case 'członek':
    default:
      return faUser;
  }
};

export const boardMembers = () => {
  return [
    {
      name: 'Janusz Cisło',
      role: 'Prezes',
      phone: null,
    },
    {
      name: 'Ćwięka Dawid',
      role: 'V-ce Prezes',
      phone: '662 378 716',
    },
    {
      name: 'Rafał Laskowski',
      role: 'Sekretarz',
      phone: null,
    },
    {
      name: 'Bieleń Józef',
      role: 'Członek',
      phone: null,
    },
    {
      name: 'Trybulec Józef',
      role: 'Członek',
      phone: null,
    },
  ];
};

export const revisionComissionMembers = () => {
  return [
    {
      name: 'Kalicki Jerzy',
      role: 'Przewodniczący',
      phone: null,
    },
    {
      name: 'Cisło Bogdan',
      role: 'Z-ca Przewodniczącego',
      phone: null,
    },
    {
      name: 'Jędrzejowski Julian',
      role: 'Sekretarz',
      phone: null,
    },
  ];
};

export const problemComissionMembers = () => {
  return [
    {
      name: 'Szymański Zbigniew',
      role: 'Przewodniczący Komisji',
      phone: null,
    },
    {
      name: 'Dybski Eugeniusz',
      role: 'Członek Komisji',
      phone: null,
    },
  ];
};

export const additionalMembers = () => {
  return [
    {
      name: 'Tomecka Dorota',
      role: 'Kasjer',
      phone: '510 100 526',
    },
    {
      name: 'Pogoda Henryk',
      role: 'Elektryk',
      phone: '692 341 182',
    },
  ];
};
