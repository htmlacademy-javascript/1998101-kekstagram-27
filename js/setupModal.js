import './miniatures.js';

const bigPicture = document.querySelector('.big-picture');
const templateComment = document.querySelector('#comment').content;
const closeModal = bigPicture.querySelector('.big-picture__cancel');

// Открытие модального окна
const showModal = (url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');
  const commentsContainer = document.createDocumentFragment();
  const socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';

  // После открытия окна тегу <body> добавляется класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  const body = document.body;
  body.classList.add('modal-open');

  // После открытия окна прячем блоки счётчика комментариев и загрузки новых комментариев
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  comments.forEach(({avatar, message, name}) => {
    const comment = templateComment.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    comment.querySelector('.social__picture').alt = name;
    commentsContainer.appendChild(comment);
  });

  socialComments.appendChild(commentsContainer);

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__likes').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments;
  bigPicture.querySelector('.social__caption').textContent = description;
};

// Закрытие модального окна
closeModal.addEventListener('click', () => {
  bigPicture.classList.add('hidden');

  const body = document.body;
  body.classList.remove('modal-open');
});

// Обработчик нажатия Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});

export{showModal};
