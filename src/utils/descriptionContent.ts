export const subscriptionContent = (parameterResponse: any) => {
  const {
    yearsFrom,
    yearsTo,
    mileageFrom,
    mileageTo,
    enginePowerFrom,
    enginePowerTo,
    numberOfDoorsFrom,
    numberOfDoorsTo,
    numberOfSeatsFrom,
    numberOfSeatsTo,
  } = parameterResponse;
  let arrForRender: any = [];
  const order: any = [
    'brand',
    'transportType',
    'model',
    'years',
    'bodyType',
    'fuelType',
    'transmission',
    'mileage',
    'enginePower',
    'driveType',
    'city',
    'color',
    'condition',
    'numberOfDoors',
    'numberOfSeats',
    'numberAxles',
    'wheelConfiguration',
  ];
  order.forEach((element: any) => {
    if (element === 'years' && (yearsFrom || yearsTo)) {
      if (yearsFrom === 1970 && yearsTo === 2024) {
        return;
      } else {
        arrForRender.push(
          `Рік: ${
            yearsFrom !== 0 && yearsFrom
              ? `від ${parameterResponse[`${element}From`]}`
              : ''
          }${
            yearsTo !== 2024 ? ` до ${parameterResponse[`${element}To`]}` : ''
          }`,
        );
      }
    }
    if (element === 'mileage' && (mileageFrom || mileageTo)) {
      if (!mileageFrom && mileageTo === 1000000) {
        return;
      } else {
        arrForRender.push(
          `Пробіг: ${
            mileageFrom !== 0 && mileageFrom
              ? `від ${parameterResponse[`${element}From`]}`
              : ''
          }${
            mileageTo !== 1000000
              ? ` до ${parameterResponse[`${element}To`]}`
              : ''
          }`,
        );
      }
    }
    if (element === 'enginePower' && (enginePowerFrom || enginePowerTo)) {
      if (!enginePowerFrom && enginePowerTo === 1000) {
        return;
      } else {
        arrForRender.push(
          `Потужність: ${
            enginePowerFrom !== 0 && enginePowerFrom
              ? `від ${parameterResponse[`${element}From`]}`
              : ''
          }${
            enginePowerTo !== 1000
              ? ` до ${parameterResponse[`${element}To`]}`
              : ''
          }`,
        );
      }
    }
    if (element === 'numberOfDoors' && (numberOfDoorsFrom || numberOfDoorsTo)) {
      if (numberOfDoorsFrom === 2 && numberOfDoorsTo === 5) {
        return;
      } else {
        arrForRender.push(
          `Кількість дверей: ${
            numberOfDoorsFrom !== 2 && numberOfDoorsFrom
              ? `від ${parameterResponse[`${element}From`]}`
              : ''
          }${
            numberOfDoorsTo !== 5
              ? ` до ${parameterResponse[`${element}To`]}`
              : ''
          }`,
        );
      }
    }
    if (element === 'numberOfSeats' && (numberOfSeatsFrom || numberOfSeatsTo)) {
      if (numberOfSeatsFrom === 2 && numberOfSeatsTo === 18) {
        return;
      } else {
        arrForRender.push(
          `Кількість місць: ${
            numberOfSeatsFrom !== 2 && numberOfSeatsFrom
              ? `від ${parameterResponse[`${element}From`]}`
              : ''
          }${
            numberOfSeatsTo !== 18
              ? ` до ${parameterResponse[`${element}To`]}`
              : ''
          }`,
        );
      }
    }
    if (Array.isArray(parameterResponse[element])) {
      if (element === 'numberAxles') {
        arrForRender.push(
          `Кількість осей: ${parameterResponse[element].join(', ')}`,
        );
      } else if (element === 'wheelConfiguration') {
        arrForRender.push(
          `Конфігурація коліс: ${parameterResponse[element].join(', ')}`,
        );
      } else {
        arrForRender.push(`${parameterResponse[element].join(', ')}`);
      }
    } else if (parameterResponse[element]) {
      arrForRender.push(parameterResponse[element]);
    }
  });
  return arrForRender.join('; ');
};
