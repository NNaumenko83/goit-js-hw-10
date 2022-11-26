// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

const gallerey = createGallerey(galleryItems);

function createGallerey(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div>
                <a class="gallery__item" href="${original}">
		            <img class="gallery__image" src="${preview}" alt="${description}"/>
                </a>
            </div>`;
    })
    .join('');
}

galleryRef.innerHTML = gallerey;

let lightbox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});
