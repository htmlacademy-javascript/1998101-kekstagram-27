import {createObjects} from './data.js';
import {createMiniatures} from './miniatures.js';
import {showModal} from './setupModal.js';
import {showFormWithValidation} from './form.js';

showFormWithValidation();

const pictures = createObjects(25);
createMiniatures(pictures, showModal);
