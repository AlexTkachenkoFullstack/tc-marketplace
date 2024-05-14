const titleCreator = (title: { [key: string]: string[] }) => {
  if (Object.entries(title).length === 1) {
    return Object.entries(title).map(item =>
      item[1].length > 0 ? `${item[0]}: ${item[1].join(', ')}` : `${item[0]}`,
    );
  } else {
    return Object.entries(title)
      .map(item => {
        if (item[1].length === 0) {
          return null;
        } else {
          return `${item[0]}: ${item[1].join(', ')}`;
        }
      })
      .filter(item => item !== null)
      .join('; ');
  }
};

const offerCreator = (totalAdverts: number | null) => {
  const offerText = (totalAdverts: number | null) => {
    if (!totalAdverts) {
      return;
    } else if (totalAdverts === 1) {
      return 'пропозиція';
    } else if (totalAdverts > 1 && totalAdverts < 5) {
      return 'пропозиції';
    } else if (totalAdverts >= 5 && totalAdverts < 21) {
      return 'пропозицій';
    } else {
      const lastDigit = totalAdverts % 10;
      const lastTwoDigits = totalAdverts % 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) {
        return 'пропозиція';
      } else if (
        [2, 3, 4].includes(lastDigit) &&
        ![12, 13, 14].includes(lastTwoDigits)
      ) {
        return 'пропозиції';
      } else {
        return 'пропозицій';
      }
    }
  };
  return !totalAdverts
    ? '- оголошення не знайдені'
    : `- знайдено ${totalAdverts} ${offerText(totalAdverts)}`;
};

export const fullTitle = (
  titleCategory: string,
  totalAdverts: number | null,
  title: { [key: string]: string[] },
) => {
  return `Пошук: ${titleCategory} ${titleCreator(title)} ${offerCreator(
    totalAdverts,
  )}`;
};
