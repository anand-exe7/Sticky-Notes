import { searchBarStyles } from '../styles/search-bar.styles.js';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  @property({ type: String }) value = '';

  static styles = searchBarStyles;

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('search-changed', {
      detail: { query: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="tape"></div>
        <span class="icon">search</span>
        <input type="text" placeholder="Search notes..." .value=${this.value} @input=${this.handleInput} aria-label="Search notes" />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'search-bar': SearchBar;
  }
}