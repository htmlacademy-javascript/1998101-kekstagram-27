import {createMiniatures} from './miniatures.js';
import {setupModal} from './setupModal.js';
import {showFormWithValidation} from './form.js';
import {initScale} from './scaleImages.js';
import {initFilters} from './effectsImages.js';
import {getData } from './api.js';
import {showAlert} from './util.js';

initScale();
initFilters();
showFormWithValidation();

getData((data) => {
  createMiniatures(data, setupModal);
},
() => {
  showAlert('Не удалось загрузить изображения. Попробуйте перезагрузить страницу');
});
