import View from './View.js';
import icons from 'url:../../img/sprite.svg';

class HousesView extends View {
  _parentElement = document.querySelector('.section-houses');
  _errorMessage = 'We could not find the house listing. Please try again!';
  _message;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return `${this._data.map(this._generateMarkupHouse).join('').concat(`
    <div class="container section-houses-link-container">
      <a href="#houses" class="text-link text-link--with-padding-bottom">See all listings &rarr;</a>
    </div>`)}`;
  }

  _generateMarkupHouse(data) {
    return `
      <div class="house-box">
        <img
          src="${data.imageSrc}"
          alt="${data.imageAlt}"
          class="house-box__img"
        />
        <button class="house-box__like-btn">
          <svg class="house-box__icon house-box__icon--${
            data.isLike ? 'fill' : 'empty'
          }" name="heart">
            <use xlink:href="${icons}#heart"></use>
          </svg>
        </button>
        <h5 class="house-box__name">${data.houseName}</h5>
        <div class="house-box__location">
          <svg class="house-box__icon" name="map-pin-outline">
            <use xlink:href="${icons}#map-pin-outline"></use>
          </svg>
          <span class="house-box__text">${data.location}</span>
        </div>
        <div class="house-box__rooms">
          <svg class="house-box__icon" name="person-outline">
            <use xlink:href="${icons}#person-outline"></use>
          </svg>
          <span class="house-box__text">${data.roomCount} rooms</span>
        </div>

        <div class="house-box__area">
          <svg class="house-box__icon" name="frame-corners-outline">
            <use xlink:href="${icons}#frame-corners-outline"></use>
          </svg>
          <span class="house-box__text">${data.areaM2} m<sup>2</sup></span>
        </div>

        <div class="house-box__price">
          <svg class="house-box__icon" name="currency-circle-dollar-outline">
            <use
              xlink:href="${icons}#currency-circle-dollar-outline">
            </use>
          </svg>
          <span class="house-box__text">${data.price}</span>
        </div>
        <a href="#contact" class="button button--link house-box__btn"
          >Contact realtor</a>
      </div>
  `;
  }
}

export default new HousesView();
