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

/* // Функция проверки нажатия клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape'; */

//Функция
const countSameValue = (array, value) => {
  let count = 0;
  array.forEach((element) => (element === value && count++));
  return count;
};

export {getRandomNumber, countSameValue, checkMaxStringLength};
