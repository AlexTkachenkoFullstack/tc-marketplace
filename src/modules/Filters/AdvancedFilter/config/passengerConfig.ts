export const passengerConfig = {
  addNewCar: {
    brand: {
      type: 'dropdown',
      optionsSelected: 'few',
      title: 'Бренд',
      startValue: 'Всі',
    },
    model: {
      type: 'dropdown',
      optionsSelected: 'few',
      title: 'Модель',
      startValue: 'Всі',
    },
  },
  region: {
    type: 'dropdown',
    optionsSelected: 'few',
    title: 'Регіон',
    startValue: 'Всі',
    options: [
      {
          "regionId": 1,
          "region": "Вінницька область"
      },
      {
          "regionId": 2,
          "region": "Волинська область"
      },
      {
          "regionId": 3,
          "region": "Дніпропетровська область"
      },
      {
          "regionId": 4,
          "region": "Донецька область"
      },
      {
          "regionId": 5,
          "region": "Житомирська область"
      },
      {
          "regionId": 6,
          "region": "Закарпатська область"
      },
      {
          "regionId": 7,
          "region": "Запорізька область"
      },
      {
          "regionId": 8,
          "region": "Івано-Франківська область"
      },
      {
          "regionId": 9,
          "region": "Київська область"
      },
      {
          "regionId": 10,
          "region": "Кіровоградська область"
      },
      {
          "regionId": 11,
          "region": "Луганська область"
      },
      {
          "regionId": 12,
          "region": "Львівська область"
      },
      {
          "regionId": 13,
          "region": "Миколаївська область"
      },
      {
          "regionId": 14,
          "region": "Одеська область"
      },
      {
          "regionId": 15,
          "region": "Полтавська область"
      },
      {
          "regionId": 16,
          "region": "Рівненська область"
      },
      {
          "regionId": 17,
          "region": "Сумська область"
      },
      {
          "regionId": 18,
          "region": "Тернопільська область"
      },
      {
          "regionId": 19,
          "region": "Харківська область"
      },
      {
          "regionId": 20,
          "region": "Херсонська область"
      },
      {
          "regionId": 21,
          "region": "Хмельницька область"
      },
      {
          "regionId": 22,
          "region": "Черкаська область"
      },
      {
          "regionId": 23,
          "region": "Чернівецька область"
      },
      {
          "regionId": 24,
          "region": "Чернігівська область"
      },
      {
          "regionId": 25,
          "region": "АР Крим"
      }
  ]
  },
  bodyType: {
    type: 'select',
    optionsSelected: 'few',
    title: 'Тип кузова',
  },
  originCountry: {
    type: 'dropdown',
    optionsSelected: 'few',
    title: 'Країна виробник',
    startValue: 'Всі',
  },
  year: {
    type: 'range',
    title: 'Рік випуску',
    minVal: 1968,
    maxVal: 2024,
  },
  price: {
    type: 'range',
    title: 'Ціна, $',
    minVal: 0,
    maxVal: 50000000,
    checkbox: [
      {
        title: 'Можливість торгу',
      },
      {
        title: 'Можливість торгу для військових',
      },
      {
        title: 'Обмін',
      },
      {
        title: 'Можливість розсрочки',
      }
    ]
  },
  isCustomsCleared: {
    type: 'checkbox',
    title: 'Розмитнений',
  },
  accidentHistory: {
    type: 'checkbox',
    title: 'Історія аварій',
  },
  condition: {
    type: 'select',
    optionsSelected: 'few',
    title: 'Стан',
  },
  color: {
    type: 'select',
    optionsSelected: 'few',
    title: 'Колір',
  },
  transmission: {
    type: 'select',
    optionsSelected: 'few',
    title: 'Коробка передач',
  },
  fuelType: {
    type: 'select',
    optionsSelected: 'few',
    title: 'Тип палива',
  },
  fuelConsumption: {
    type: 'range',
    title: 'Розхід палива, л',
    minVal: 0,
    maxVal: 100,
  },
  engineCapacity: {
    type: 'range',
    title: "Об'єм двигуна, тис",
    minVal: 0,
    maxVal: 50,
  },
  enginePower: {
    type: 'range',
    title: 'Потужність двигуна',
    minVal: 1,
    maxVal: 2000,
  },
  driveType: {
    type: 'select',
    title: 'Тип приводу',
    optionsSelected: 'few',
  },
  mileage: {
    type: 'range',
    title: 'Пробіг, км',
    minVal: 0,
    maxVal: 1000000,
  },
  numOfDors: {
    type: 'range',
    title: 'Кількість дверей',
    minVal: 1,
    maxVal: 10,
  },
  numOfSeats: {
    type: 'range',
    title: 'Кількість місць',
    minVal: 1,
    maxVal: 100,
  }
}
