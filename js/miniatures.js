const pictures = document.querySelector('.pictures');
const templateMiniatures = document.querySelector('#picture').content;
const similarListMiniature = document.createDocumentFragment();

const createMiniatures = (createdObject) => {
  createdObject.forEach((({url, likes, comments}) => {
    const miniature = templateMiniatures.cloneNode(true);
    miniature.querySelector('.picture__img').src = url;
    miniature.querySelector('.picture__likes').textContent = likes;
    miniature.querySelector('.picture__comments').textContent = comments;
    similarListMiniature.appendChild(miniature);
  }));
  pictures.appendChild(similarListMiniature);
};

export {createMiniatures};
