// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max || min > max) {
    return NaN;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomNumber(4, 15);

// Функция для проверки максимальной длины строки
const checkMaxStringLength = (string, maxLength) => string.length <= maxLength;

checkMaxStringLength('строка', 5);

//Задание: Больше деталей
const MESSAGES = [
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'
];

const COMMENT_NAMES = [
  'Денис',
  'Гена',
  'Мария',
  'Олег',
  'Наталья',
  'Евгений',
  'Майкл'
];

const DESCRIPTION = [
  'Пляж с белоснежным песком',
  'Дикий пляж Увероальто в Доминикане',
  'Знаете ли вы, что такое отдых?',
  'Роль семейного отдыха в укреплении семьи',
  'Идеальный автомобиль В-класса',
  'Путешествие на Байкал',
  'Разнообразные тропические фрукты'
];

//Функция для создания объекта с комментарием
const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${index}.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: COMMENT_NAMES[getRandomNumber(0, COMMENT_NAMES.length - 1)],
});

const createComments = (count = 6) => {
  const comments = [];
  for (let i = 1; i <= count; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

// Функция для создания объекта массива — описание фотографии, опубликованной пользователем
const createObject = (index) => {
  const object = {
    id: index,
    url: `photos/${index}.jpg`,
    description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: createComments()
  };
  return object;
};

// функции для создания массива из 25 сгенерированных объектов
const createObjects = (count = 25) => {
  const objects = [];
  for (let i = 1; i <= count; i++) {
    objects.push(createObject(i));
  }
  return objects;
};

createObjects(50);
