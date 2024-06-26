import debounce from './debounce.js';

export default class ScrollAnime {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowHalf = window.innerHeight * 0.6;

    // bind(this) para fazer referência ao objeto da classe
    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  // pega a distância de cada seção em relação ao topo da página
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowHalf),
      };
    });
  }

  // verifica a distância de cada objeto em relação ao scroll da página
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }

    return this;
  }

  // remove o evento de scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
