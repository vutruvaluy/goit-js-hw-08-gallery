
  import files from "./gallery-items.js";
//  1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2 Реализация делегирования на галерее ul.js-gallery и получение url большого
// изображения. 
// 3 Открытие модального окна по клику на элементе галереи.
// 4 Подмена значения атрибута src элемента img.lightbox**image. 
// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. Очистка значения атрибута
// src элемента img.lightbox**image. Это необходимо для того, чтобы при следующем
// открытии модального окна, пока грузится изображение, мы не видели предыдущее.
const containerGallery = document.querySelector('.js-gallery');
const overlay = document.querySelector('.lightbox__overlay');
const lightbox = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const imgModul = document.querySelector('.lightbox__image');


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

containerGallery.insertAdjacentHTML('beforeend', createMarkUp(files));
containerGallery.addEventListener('click', onCreateGalleryClick);

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
    console.log(lightbox);
}

function onOpenLightbox(el) {
    lightbox.classList.add('is-open');
    overlay.addEventListener('click', onCloseLightbox);
    closeBtn.addEventListener('click', onCloseLightbox);
    imgModul.src = el.dataset.source;
    imgModul.alt = el.alt;

};

function onCloseLightbox() {

    closeBtn.removeEventListener('click', onCloseLightbox);
    lightbox.classList.remove('is-open');
    window.removeEventListener('keydown', onEscPress);

    onClearSrc();
};

function onEscPress(ev) {
    if (ev.code === 'Escape') {
        onCloseLightbox();
    }
}

function onClearSrc() {
    imgModul.src = '';
    imgModul.alt = '';
}