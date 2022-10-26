const pictures = document.querySelector('.pictures');
const templateMiniatures = document.querySelector('#picture').content.querySelector('a');
const similarListMiniature = document.createDocumentFragment();

const createMiniatures = (photoObjects, showModal) => {
  photoObjects.forEach((({url, likes, comments, description}) => {
    const commentsLength = comments.length;

    const miniature = templateMiniatures.cloneNode(true);
    miniature.querySelector('.picture__img').src = url;
    miniature.querySelector('.picture__likes').textContent = likes;
    miniature.querySelector('.picture__comments').textContent = commentsLength;
    miniature.addEventListener('click', () => {
      showModal(url, likes, comments, description);
    });
    similarListMiniature.appendChild(miniature);
  }));
  pictures.appendChild(similarListMiniature);
};

export {createMiniatures};
