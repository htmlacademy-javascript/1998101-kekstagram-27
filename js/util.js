const ALERT_SHOW_TIME = 5000;

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

//Функция
const countSameValue = (array, value) => {
  let count = 0;
  array.forEach((element) => (element === value && count++));
  return count;
};

//Сообщение с ошибкой
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// debounce - устраниние дребезга
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomElement = (array) => array[getRandomNumber(0, array.length - 1)];

export {getRandomNumber, countSameValue, checkMaxStringLength, showAlert, debounce, getRandomElement};
