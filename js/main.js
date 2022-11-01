import {createObjects} from './data.js';
import {createMiniatures} from './miniatures.js';
import {showModal} from './setupModal.js';
import {uploadPhoto} from './form.js';

uploadPhoto();

const pictures = createObjects(25);
createMiniatures(pictures, showModal);
