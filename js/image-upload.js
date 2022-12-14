const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileUpload = document.querySelector('input[type=file]');
const miniaturesEffects = document.querySelectorAll('.effects__preview');
const imagePreview = document.querySelector('.img-upload__preview');
const uploadPreview = imagePreview.querySelector('img');


const imageUpload = () => {
  const file = fileUpload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const render = new FileReader();
    render.addEventListener('load', () => {
      uploadPreview.src = render.result;

      miniaturesEffects.forEach((image) => {
        image.style.backgroundImage = `url(${render.result})`;
      });
    });
    render.readAsDataURL(file);
  }
};

export {imageUpload};
