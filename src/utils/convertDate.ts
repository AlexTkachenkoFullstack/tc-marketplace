export const convertDate = (date: string) => {
  const dateNow = Date.now();
  const dateUnix = new Date(date).getTime();
  const timeDifference = dateNow - dateUnix;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (dateUnix % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((dateUnix % (1000 * 60 * 60)) / (1000 * 60));
  switch (days) {
    case 0:
      return `Створено сьогодні о ${hours}:${String(minutes).padStart(2, '0')}`;
    case 1:
      return `Створено вчора о ${hours}:${String(minutes).padStart(2, '0')}`;
    case 2:
      //   return `Позавчора о ${hours}:${String(minutes).padStart(2, '0')}`;
      return `Створено ${days} дні тому`;
    case 3:
      return `Створено ${days} дні тому`;
    case 4:
      return `Створено ${days} дні тому`;
    default:
      return `Створено ${days} днів тому`;
  }
};
