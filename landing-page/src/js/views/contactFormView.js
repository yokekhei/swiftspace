import View from './View.js';

class ContactFormView extends View {
  _parentElement = document.querySelector('.contact__form');
  _contactFormInputItemsEl =
    this._parentElement.querySelectorAll('.form-input-item');

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener(
      'submit',
      this._handleSubmit.bind(this, handler)
    );
  }

  _handleSubmit(handler, e) {
    e.preventDefault();

    const dataArr = [...new FormData(this._parentElement)];
    const data = Object.fromEntries(dataArr);
    const dataObject = {
      subject: 'Customer Inquiry',
      emailBody: `Full Name: ${data.full_name}<br>
      Email Address: ${data.email}<br>
      Inquiry: ${data.inquiry}`,
      viewPosition: this._getPosition(),
    };

    handler(dataObject);
    this._reset();
  }

  _reset() {
    this._contactFormInputItemsEl.forEach(e => {
      const input = e.querySelector('input') || e.querySelector('textarea');
      input.value = '';
    });
  }
}

export default new ContactFormView();
