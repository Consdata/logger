import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  connectedCallback() {
    this.innerHTML = `
      logger demo
    `;
  }
}
customElements.define('logger-root', AppElement);
