// utils/dayInfoUtils.js

export const daysOfWeekShort = [
  'pon.',
  'wt.',
  'śr.',
  'czw.',
  'pt.',
  'sob.',
  'niedz.',
];

export const officeHours = [
  { day: 'Poniedziałek', open: null, close: null }, // Zamknięte
  { day: 'Wtorek', open: 16, close: 17 },
  { day: 'Środa', open: null, close: null },
  { day: 'Czwartek', open: null, close: null },
  { day: 'Piątek', open: null, close: null },
  { day: 'Sobota', open: null, close: null },
  { day: 'Niedziela', open: null, close: null },
];

export const gateHours = [
  { day: 'Poniedziałek', open: null, close: null }, // Zamknięte
  { day: 'Wtorek', open: null, close: null },
  { day: 'Środa', open: null, close: null },
  { day: 'Czwartek', open: null, close: null },
  { day: 'Piątek', open: null, close: null },
  { day: 'Sobota', open: 8, close: 15 },
  { day: 'Niedziela', open: null, close: null },
];

export const formatTimeLeft = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours} godz. ${mins} min.`;
  }
  return `${minutes} min.`;
};

export const getDayIndex = (day) => {
  // Zamiana niedzieli jako 0 na niedzielę jako 6, aby poniedziałek był 0
  return day === 0 ? 6 : day - 1;
};

export const findNextOpenDay = (hours) => {
  const now = new Date();
  const currentDay = getDayIndex(now.getDay());
  const nextOpenDay = hours.findIndex(
    (entry, idx) => idx > currentDay && entry.open !== null
  );

  if (nextOpenDay === -1) {
    const firstOpenDay = hours.findIndex((entry) => entry.open !== null);
    return firstOpenDay !== -1 ? firstOpenDay : null;
  }
  return nextOpenDay;
};
