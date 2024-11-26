const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  const polish_month_names = [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia',
  ];

  const month_name = polish_month_names[date.getMonth()];

  return `${day} ${month_name} ${year}`;
};

export default formatDate;
