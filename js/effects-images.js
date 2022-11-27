const effectSliderContainer = document.querySelector('div.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const uploadPhoto = document.querySelector('.img-upload__preview');
const effectOriginal = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectLevel = document.querySelector('fieldset.img-upload__effect-level');

const checkSlider = () => {
  if (effectSliderContainer.noUiSlider) {
    effectLevel.classList.add('hidden');
    effectSliderContainer.noUiSlider.destroy();
    window.isSliderInitialized = false;
  }
};

window.checkSlider = checkSlider;

const initFilters = () => {
  let effectCurrentClass;
  const isSliderInitialized = false;
  window.isSliderInitialized = isSliderInitialized;
  // По умолчанию выбран эффект «Оригинал».
  effectOriginal.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      uploadPhoto.classList.remove(effectCurrentClass);
      uploadPhoto.style.filter = '';
    }
  });

  const activateFilter = (filterEffectClass, getFilterStyle) => {
    if (!window.isSliderInitialized) {
      effectLevel.classList.remove('hidden');
      noUiSlider.create(effectSliderContainer, {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.01,
        connect: 'lower',
      });
      window.isSliderInitialized = true;
    }
    uploadPhoto.classList.remove(effectCurrentClass);
    effectSliderContainer.noUiSlider.off();
    uploadPhoto.classList.add(filterEffectClass);
    effectCurrentClass = filterEffectClass;
    effectSliderContainer.noUiSlider.on('update', () => {
      effectValue.value = effectSliderContainer.noUiSlider.get();
      uploadPhoto.style.filter = getFilterStyle(effectValue.value);
    });
  };

  // Эффект «Хром»
  effectChrome.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      activateFilter('effects__preview--chrome', (currentValue) => `grayscale(${currentValue})`);
      effectSliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
  });

  // Эффект «Сепия»
  effectSepia.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      activateFilter('effects__preview--sepia', (currentValue) => `sepia(${currentValue})`);
      effectSliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
  });

  // Эффект «Марвин»
  effectMarvin.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      activateFilter('effects__preview--marvin', (currentValue) => `invert(${currentValue}%)`);
      effectSliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
  });

  // Эффект «Фобос»
  effectPhobos.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      activateFilter('effects__preview--phobos', (currentValue) => `blur(${currentValue}px)`);
      effectSliderContainer.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  });

  // Эффект «Зной»
  effectHeat.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      activateFilter('effects__preview--heat', (currentValue) => `brightness(${currentValue})`);
      effectSliderContainer.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  });
};

export {initFilters};
