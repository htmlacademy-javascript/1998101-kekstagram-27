import './miniatures.js';

const bigPicture = document.querySelector('.big-picture');
const templateComment = document.querySelector('#comment').content;
const closeModal = bigPicture.querySelector('.big-picture__cancel');

// Открытие модального окна
const showModal = (url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');
  const socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';

  // После открытия окна тегу <body> добавляется класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  const body = document.body;
  body.classList.add('modal-open');
  bigPicture.querySelector('.comments-count').textContent = comments.length;

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

  const checkCommetnsQuantity = () => comments.length > 5;

  if (checkCommetnsQuantity()) {
    const commentsToShow = comments.splice(0, 5);
    renderComments(commentsToShow);
    document.querySelector('.social__comments-loader').addEventListener('click', () => {
      const commentsArr = comments.splice(0, 5);
      renderComments(commentsArr);
    });
  } else {
    document.querySelector('.social__comments-loader').classList.add('hidden');
    renderComments(comments);
  }

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
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
