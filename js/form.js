import {checkMaxStringLength, countSameValue} from './util.js';

const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const discriptionField = form.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DISCRIPTION_LENGTH = 140;

const getHashTags = (Value) => {
  const splitString = (string) => string.trim().split(' ');
  const array = splitString(Value);
  return array;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__error',
  errorTextParent: 'img-upload__error',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

// Валидация по формату хештега
pristine.addValidator(hashtagField, (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = getHashTags(value);
  const check = hashtags.every((hashtag) => (VALID_SYMBOLS.test(hashtag)));
  return check;
}, 'Неверный формат хэштегов.');

// Валидация по количеству хештегов
pristine.addValidator(hashtagField, (value) => {
  const hashtags = getHashTags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
}, `нельзя добавлять больше ${MAX_HASHTAG_COUNT} хэштегов.`);

// Валидация на повторените хештегов
pristine.addValidator(hashtagField, (value) => {
  const hashtags = getHashTags(value);
  const isValidHashtags = hashtags.every((hashtag) => {
    const isUniqueHashtag = countSameValue(hashtags, hashtag) === 1;
    return isUniqueHashtag;
  });
  return isValidHashtags;
}, 'Один и тот же хэш-тег не может быть использован дважды.');

// Валидация по длине комментария
pristine.addValidator(discriptionField, (comment) => {
  if (comment.length === 0) {
    return true;
  }
  checkMaxStringLength(comment, MAX_DISCRIPTION_LENGTH);
}, 'Длина комментария не может составлять больше 140 символов.');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  evt.target.reset();
});
