// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max || min > max) {
    return NaN;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomNumber(4, 15);

// Функция для проверки максимальной длины строки
function getMaxStringLength(string, maxLength) {
  return string.length <= maxLength;
}

getMaxStringLength('строка', 5);
