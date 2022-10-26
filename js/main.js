import {createObjects} from './data.js';
import {createMiniatures} from './miniatures.js';
import {showModal} from './setupModal.js';

const pictures = createObjects(25);
createMiniatures(pictures, showModal);
