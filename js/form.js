import {countSameValue} from './util.js';
import {sendData} from './api.js';
import {imageUpload} from './imageUpload.js';

const closeFormElement = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadPreview = document.querySelector('.img-upload__preview');
const formInputs = form.querySelectorAll('input, textarea');
const submitButton = form.querySelector('button[type="submit"]');
const successModal = document.querySelector('.success');
const successButton = document.querySelector('.success__button');
const errorModal = document.querySelector('.error');
const errorButton = document.querySelector('.error__button');
const scaleControl = form.querySelector('.scale__control--value');
const effectNone = document.querySelector('#effect-none');
const range = document.querySelector('.effect-level');
const uploadFile = document.querySelector('#upload-file');

const body = document.body;
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field-error',
  successClass: 'field-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);

const showFormWithValidation = () => {
  const hashTagField = form.querySelector('.text__hashtags');
  const descriptionField = form.querySelector('.text__description');

  const getHashTags = (value) => value.trim().split(' ');

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
  };

  form.addEventListener('change', openForm);
};

// Обработчик нажатия Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeFormElement.classList.add('hidden');
  }
});

// Закрытие окна успешного сообщения
const closeSuccessMessage = () => {
  successModal.classList.add('hidden');
  closeFormElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const clearForm = () => {
  formInputs.forEach((input) => {
    input.value = '';
  });
  uploadPreview.className = 'img-upload__preview';
  uploadPreview.style.filter = '';
  uploadPreview.style.transform = 'scale(1)';
  scaleControl.value = '100%';
  effectNone.checked = true;
  range.classList.add('hidden');
  window.isSliderInitialized = false;
  window.destroySlider();
  closeSuccessMessage();
};

const showSuccessMessage = () => {
  submitButton.disabled = false;
  clearForm();
  successModal.classList.remove('hidden');
  body.classList.add('modal-open');

  // обработчик на кнопку закрытия и на esc
  successButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeSuccessMessage();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeSuccessMessage();
    }
  });
};

// Закрытие окна сообщения с ошибкой
const closeErrorMessage = () => {
  errorModal.classList.add('hidden');
};

// Окно с ошибкой
const showErrorMessage = () => {
  submitButton.disabled = false;
  errorModal.classList.remove('hidden');
  body.classList.add('modal-open');

  // обработчик на кнопку закрытия и на esc
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeErrorMessage();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeErrorMessage();
    }
  });
};

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(form);
    submitButton.disabled = true;
    sendData(showSuccessMessage, showErrorMessage, formData);
  }
});

//обработчик событий - загрузка фото
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  imageUpload();
});

export {showFormWithValidation};
