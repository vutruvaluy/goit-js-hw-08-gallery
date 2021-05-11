
  import files from "./gallery-items.js";
//  1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2 Реализация делегирования на галерее ul.js-gallery и получение url большого
// изображения. 
// 3 Открытие модального окна по клику на элементе галереи.
// 4 Подмена значения атрибута src элемента img.lightbox**image. 
// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. Очистка значения атрибута
// src элемента img.lightbox**image. Это необходимо для того, чтобы при следующем
// открытии модального окна, пока грузится изображение, мы не видели предыдущее.
const galleryContainer = document.querySelector('.js-gallery');
const overlay = document.querySelector('.lightbox__overlay');
const lightboxOverlay = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const necessaryImg = document.querySelector('.lightbox__image');


function createMarkUp(files) {
    return files.map(({ preview, original, description }) => {
        return `
    <li class="gallery__item">
  <a class="gallery__link"
     href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    }).join('');
};

galleryContainer.insertAdjacentHTML('beforeend', createMarkUp(files));
galleryContainer.addEventListener('click', onCreateGalleryClick);

function onCreateGalleryClick(ev) {
    if (!ev.target.classList.contains('gallery__image')) {
        return;
    }
    ev.preventDefault();
    console.log(ev.target);
    const el = ev.target;
    const elCurrent = ev.currentTarget;
    onOpenLightbox(el);
    window.addEventListener('keydown', onEscPress);
    console.log(lightboxOverlay);
}

function onOpenLightbox(el) {
    lightboxOverlay.classList.add('is-open');
    overlay.addEventListener('click', onCloseLightbox);
    closeModalBtn.addEventListener('click', onCloseLightbox);
    necessaryImg.src = el.dataset.source;
    necessaryImg.alt = el.alt;

};

function onCloseLightbox() {

    closeModalBtn.removeEventListener('click', onCloseLightbox);
    lightboxOverlay.classList.remove('is-open');
    window.removeEventListener('keydown', onEscPress);

    onClearSrc();
};

function onEscPress(ev) {
    if (ev.code === 'Escape') {
        onCloseLightbox();
    }
}

function onClearSrc() {
    necessaryImg.src = '';
    necessaryImg.alt = '';
}
const imagesSrc = [];

document.addEventListener('keydown', (ev) => {
    let newIndex = imagesSrc.indexOf(necessaryImg.src);
  if (newIndex < 0) {
    return;
  }
  if (ev.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex===-1) {
      newIndex = imagesSrc.length-1;
    } else if (ev.code === 'ArrowRight') {
      newIndex += 1;
      if (newIndex === imagesSrc.length) {
        newIndex = 0;
      }
    }
  }
  imgModul.src = imagesSrc[newIndex];
});