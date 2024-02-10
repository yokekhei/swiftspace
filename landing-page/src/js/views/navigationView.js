import View from './View.js';

class NavigationView extends View {
  _parentElement = document.querySelector('.navigation');

  _init() {
    this._setMobileNavigation();
    this._setSmoothScolling();
  }

  _setMobileNavigation() {
    const btnNav = document.querySelector('.navigation__menu-btn');
    btnNav.addEventListener('click', this._toggleNavMenu.bind(this));
  }

  _setSmoothScolling() {
    const allLinks = document.querySelectorAll('a:link');
    allLinks.forEach(link => {
      link.addEventListener(
        'click',
        this._handleScrollFromLink.bind(this, link)
      );
    });
  }

  _toggleNavMenu() {
    this._parentElement.classList.toggle('nav-open');
  }

  _handleScrollFromLink(link, e) {
    //prevent default of moving to section by #
    e.preventDefault();

    const href = link.getAttribute('href');

    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    if (href !== '#' && href.startsWith('#')) {
      const section = document.querySelector(href);
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }

    if (link.classList.contains('nav-item'))
      this._parentElement.classList.toggle('nav-open');
  }
}

export default new NavigationView();
