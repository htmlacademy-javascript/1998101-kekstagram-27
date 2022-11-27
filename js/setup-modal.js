import './miniatures.js';

const MAX_COMMENTS_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const templateComment = document.querySelector('#comment').content;
const closeModalButton = bigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = document.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const body = document.body;
const currentCommentElement = document.querySelector('span.current');

//Функция закрытия окна по Escape
const onEscapeKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const setupModal = (url, likes, comments, description) => {
  socialComments.innerHTML = '';
  commentsCount.textContent = comments.length;
  const renderComments = (commentsArr) => {
    const commentsContainer = document.createDocumentFragment();

    commentsArr.forEach(({avatar, message, name}) => {
      const comment = templateComment.cloneNode(true);
      const socialPicture = comment.querySelector('.social__picture');
      socialPicture.src = avatar;
      comment.querySelector('.social__text').textContent = message;
      socialPicture.alt = name;
      commentsContainer.appendChild(comment);
    });
    socialComments.appendChild(commentsContainer);
  };

  const onLoadMoreComments = () => {
    const commentsToShow = comments.slice(+currentCommentElement.textContent, +currentCommentElement.textContent + MAX_COMMENTS_COUNT);
    renderComments(commentsToShow);
    currentCommentElement.textContent = +currentCommentElement.textContent + commentsToShow.length;
    if (currentCommentElement.textContent === commentsCount.textContent) {
      loadMoreButton.classList.add('hidden');
    }
  };

  if (comments.length <= MAX_COMMENTS_COUNT) {
    currentCommentElement.textContent = comments.length;
    renderComments(comments);
    loadMoreButton.classList.add('hidden');
  } else {
    currentCommentElement.textContent = String(MAX_COMMENTS_COUNT);
    loadMoreButton.classList.remove('hidden');
    renderComments(comments.slice(0, MAX_COMMENTS_COUNT));
    loadMoreButton.addEventListener('click', onLoadMoreComments);
  }

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  const onCloseModal = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    closeModalButton.removeEventListener('click', onCloseModal);
    document.removeEventListener('keydown', onEscapeKeydown);
    loadMoreButton.removeEventListener('click', onLoadMoreComments);
  };

  const showModal = () => {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    closeModalButton.addEventListener('click', onCloseModal);
    document.addEventListener('keydown', onEscapeKeydown);
  };
  showModal();
};

export{setupModal};
