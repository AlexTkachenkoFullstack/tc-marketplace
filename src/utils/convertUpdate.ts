export const convertUpdate = (date: string) => {
  if (!date) return '';
  const specifiedDate = new Date(date);
  // console.log('specifiedDate :>> ', specifiedDate.toLocaleString());
  specifiedDate.setUTCHours(specifiedDate.getUTCHours() + 3);
  const currentDate = new Date();
//   const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
// console.log(`Смещение часового пояса: ${timezoneOffsetMinutes} минут`);
  const timeDifference = currentDate.getTime() - specifiedDate.getTime();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(timeDifference / millisecondsPerDay);
  const hours = specifiedDate.getHours();
  const minutes = specifiedDate.getMinutes();
  switch (days) {
    case 0:
      return `Оновлено сьогодні о ${hours}:${String(minutes).padStart(2, '0')}`;
    case 1:
      return `Оновлено вчора о ${hours}:${String(minutes).padStart(2, '0')}`;
    default:
      return `Оновлено ${days} днів тому`;
  }
}
// const utcTime = currentDate.getTime(); // Получаем время в UTC в миллисекундах
// const timezoneOffsetMilliseconds = currentDate.getTimezoneOffset() * 60000; // Смещение часового пояса в миллисекундах

// let localTime;

// if (timezoneOffsetMilliseconds < 0) {
//     // Если смещение отрицательное, значит часовой пояс находится на востоке, поэтому прибавляем смещение
//     localTime = utcTime + Math.abs(timezoneOffsetMilliseconds);
// } else {
//     // Если смещение положительное, значит часовой пояс находится на западе, поэтому вычитаем смещение
//     localTime = utcTime - timezoneOffsetMilliseconds;
// }

// // Создаем новый объект Date на основе локального времени
// const localDate = new Date(localTime);

// console.log(`Время в вашем часовом поясе: ${localDate}`);