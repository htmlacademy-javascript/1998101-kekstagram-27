const SCALESTEP = 25;
const SCALEMIN = 25;
const SCALEMAX = 100;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
scaleControlBigger.disabled = true;
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPhoto = document.querySelector('.img-upload__preview');
let scaleControlDefaultValue = 100;
const transformStep = 0.25;
let transformStartValue = 1;

const initScale = () => {
  scaleControlValue.value = `${scaleControlDefaultValue}%`;

  // Уменьшение масштаба
  const onMakePhotoSmaller = (evt) => {
    evt.preventDefault();
    scaleControlDefaultValue -= SCALESTEP;
    scaleControlValue.value = `${scaleControlDefaultValue}%`;

    transformStartValue -= transformStep;
    const transformScale = `scale(${ transformStartValue })`;
    uploadPhoto.style.transform = transformScale;

    scaleControlBigger.disabled = false;

    if(scaleControlDefaultValue <= SCALEMIN){
      scaleControlSmaller.disabled = true;
    }
  };

  // увеличение масштаба
  const makePhotoBigger = (evt) => {
    evt.preventDefault();
    scaleControlDefaultValue += SCALESTEP;
    scaleControlValue.value = `${scaleControlDefaultValue}%`;

    transformStartValue += transformStep;
    const transformScale = `scale(${ transformStartValue })`;
    uploadPhoto.style.transform = transformScale;

    scaleControlSmaller.disabled = false;

    if(scaleControlDefaultValue >= SCALEMAX){
      scaleControlBigger.disabled = true;
    }
  };

  scaleControlSmaller.addEventListener('click', onMakePhotoSmaller);
  scaleControlBigger.addEventListener('click', makePhotoBigger);
};

export {initScale};
