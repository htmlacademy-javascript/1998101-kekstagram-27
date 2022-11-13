import {createObjects} from './data.js';
import {createMiniatures} from './miniatures.js';
import {setupModal} from './setupModal.js';
import {showFormWithValidation} from './form.js';
import {initScale} from './scaleImages.js';
import {initFilters} from './effectsImages.js';


initScale();
initFilters();
showFormWithValidation();

const pictures = createObjects(25);
createMiniatures(pictures, setupModal);
