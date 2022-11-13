import {countSameValue} from './util.js';

const closeFormElement = document.querySelector('.img-upload__overlay');
const body = document.body;
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;

const showFormWithValidation = () => {
  const form = document.querySelector('.img-upload__form');
  const hashTagField = form.querySelector('.text__hashtags');
  const descriptionField = form.querySelector('.text__description');

  const getHashTags = (value) => value.trim().split(' ');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'field-error',
    successClass: 'field-success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'form__error'
  }, true);

  // Валидация по формату хештега
  pristine.addValidator(hashTagField, (value) => {
    if (value.length === 0) {
      return true;
    }
    const hashtags = getHashTags(value);
    const check = hashtags.every((hashtag) => (VALID_SYMBOLS.test(hashtag)));
    return check;
  }, 'Неверный формат хэштегов.');

  // Валидация по количеству хештегов
  pristine.addValidator(hashTagField, (value) => {
    const hashtags = getHashTags(value);
    return hashtags.length <= MAX_HASHTAG_COUNT;
  }, `нельзя добавлять больше ${MAX_HASHTAG_COUNT} хэштегов.`);

  // Валидация на повторение хештегов
  pristine.addValidator(hashTagField, (value) => {
    const hashtags = getHashTags(value);
    const isValidHashtags = hashtags.every((hashtag) => {
      const isUniqueHashtag = countSameValue(hashtags, hashtag) === 1;
      return isUniqueHashtag;
    });
    return isValidHashtags;
  }, 'Один и тот же хэш-тег не может быть использован дважды.');

  // Валидация по длине комментария
  pristine.addValidator(descriptionField, (comment) => {
    if (comment.length <= MAX_DESCRIPTION_LENGTH) {
      return true;
    }
  }, `Длина комментария не может быть больше ${MAX_DESCRIPTION_LENGTH} символов.`);

  const closeForm = (evt) => {
    if (evt.target.parentNode.classList.contains('img-upload__wrapper')) {
      return;
    }
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('.img-upload__cancel').removeEventListener('click', closeForm);
    body.classList.remove('modal-open');
  };

  const openForm = () => {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('.img-upload__cancel').addEventListener('click', closeForm);
    body.classList.add('modal-open');

    /* closeFormElement.addEventListener('click', closeForm); */
  };

  form.addEventListener('change', openForm);

  form.addEventListener('submit', (evt) => {
    if(!pristine.validate()){
      evt.preventDefault();
    }
    evt.target.reset();
  });
};

// Обработчик нажатия Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeFormElement.classList.add('hidden');
  }
});

export {showFormWithValidation};