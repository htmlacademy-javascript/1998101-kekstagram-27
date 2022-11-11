import './miniatures.js';

const bigPicture = document.querySelector('.big-picture');
const templateComment = document.querySelector('#comment').content;
const closeModalButton = bigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = document.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const body = document.body;

const setupComments = (comments) => {
  let count = 5;
  const visibleComments = [];

  const checkCommentsQuantity = () => comments.length > 5;

  const renderComments = (commentsArr) => {
    const commentsContainer = document.createDocumentFragment();

    commentsArr.forEach(({avatar, message, name}) => {
      const comment = templateComment.cloneNode(true);
      comment.querySelector('.social__picture').src = avatar;
      comment.querySelector('.social__text').textContent = message;
      comment.querySelector('.social__picture').alt = name;
      commentsContainer.appendChild(comment);
    });
    socialComments.appendChild(commentsContainer);
  };
  if (checkCommentsQuantity(comments)) {
    loadMoreButton.classList.remove('hidden');
    const commentsToShow = comments.slice(0, 5);
    visibleComments.push(...commentsToShow);
    renderComments(commentsToShow);
    loadMoreButton.addEventListener('click', () => {
      const commentsArr = comments.slice(count, count + 5);
      count += 5;
      renderComments(commentsArr);
      visibleComments.push(...commentsArr);
      if (comments.length === visibleComments.length) {
        loadMoreButton.classList.add('hidden');
      }
    });
  } else {
    document.querySelector('.social__comments-loader').classList.add('hidden');
    renderComments(comments);
  }
};

// Закрытие модального окна
const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeModalButton.removeEventListener('click', closeModal);
};

// Открытие модального окна
const showModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closeModalButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });
};

const setupModal = (url, likes, comments, description) => {
  socialComments.innerHTML = '';
  commentsCount.textContent = comments.length;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  setupComments(comments);

  showModal();
};

export{setupModal};
