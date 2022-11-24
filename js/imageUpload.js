const fileUploader = document.querySelector('input[type=file]');
const imagePreview = document.querySelector('.img-upload__preview');
const uploadPreview = imagePreview.querySelector('img');
const miniaturesEffects = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUpload = () => {
  const file = fileUploader.files[0];
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
