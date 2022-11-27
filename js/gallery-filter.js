import {getRandomNumber, debounce} from './util.js';
import {setupModal} from './setup-modal.js';
import {createMiniatures} from './miniatures.js';

const RANDOM_POST_COUNT = 10;
const postsFilters = document.querySelector('.img-filters');
const filtersWrapper = postsFilters.querySelector('.img-filters__form');
let activeFilterElement = document.querySelector('#filter-default');
const activeClass = 'img-filters__button--active';

const compareComments = (postsA, postsB) => {
  const commentsA = postsA.comments.length;
  const commentsB = postsB.comments.length;
  return commentsB - commentsA;
};

const showDiscussedPosts = (posts) => {
  const discussedPosts = [...posts].sort(compareComments);
  createMiniatures(discussedPosts, setupModal);
};

const showRandomPosts = (posts) => {
  const randomPosts = [];
  const newArray = posts.slice();
  for (let i = 0; i < RANDOM_POST_COUNT; i++) {
    const randomId = getRandomNumber(0, newArray.length - 1);
    randomPosts.push(newArray[randomId]);
    newArray.splice(randomId, 1);
  }
  createMiniatures(randomPosts, setupModal);
};

const showInitialPosts = (posts) => {
  createMiniatures(posts, setupModal);
};

const initGalleryFilter = (data) => {
  const initialPosts = data;

  postsFilters.classList.remove('img-filters--inactive');

  filtersWrapper.addEventListener('click', debounce((evt) => {
    const target = evt.target;
    if (!target.classList.contains('img-filters__button')) {
      return;
    }

    if (!target.classList.contains(activeClass)) {
      activeFilterElement.classList.remove(activeClass);
      target.classList.add(activeClass);
      activeFilterElement = target;
    }

    const currentFilter = target.id;
    if (currentFilter === 'filter-discussed') {
      showDiscussedPosts(initialPosts);
    } else if (currentFilter === 'filter-random') {
      showRandomPosts(initialPosts);
    } else {
      showInitialPosts(initialPosts);
    }
  }));
};

export {initGalleryFilter};
