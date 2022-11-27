import {createMiniatures} from './miniatures.js';
import {setupModal} from './setup-modal.js';
import {showFormWithValidation} from './form.js';
import {initScale} from './scale-images.js';
import {initFilters} from './effects-images.js';
import {getData } from './api.js';
import {showAlert} from './util.js';
import {initGalleryFilter} from './gallery-filter.js';

initScale();
initFilters();
showFormWithValidation();

getData((data) => {
  createMiniatures(data, setupModal);
  initGalleryFilter(data);
},
() => {
  showAlert('Не удалось загрузить изображения. Попробуйте перезагрузить страницу');
});
