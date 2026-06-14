import { sortDropdownStyles } from '../styles/sort-dropdown.styles.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SORT_OPTIONS, type SortOption } from '../models/sticky-note.js';

@customElement('sort-dropdown')
export class SortDropdown extends LitElement {
  @property({ type: String }) value: SortOption = 'createdAt';
  @state() private open = false;

  static styles = sortDropdownStyles;

  private toggle() {
    this.open = !this.open;
  }

  private select(value: SortOption) {
    this.value = value;
    this.open = false;
    this.dispatchEvent(new CustomEvent('sort-changed', {
      detail: { sort: value },
      bubbles: true,
      composed: true,
    }));
  }

  private handleBlur() {
    setTimeout(() => { this.open = false; }, 150);
  }

  get currentLabel() {
    return SORT_OPTIONS.find(o => o.value === this.value)?.label ?? 'Sort';
  }

  render() {
    return html`
      <div @focusout=${this.handleBlur}>
        <button class="trigger" @click=${this.toggle} aria-haspopup="listbox" aria-expanded=${this.open} aria-label="Sort notes">
          <span class="icon">sort</span> ${this.currentLabel}
          <span class="chevron ${this.open ? 'open' : ''}">expand_more</span>
        </button>

        ${this.open ? html`
          <div class="menu" role="listbox">
            ${SORT_OPTIONS.map(opt => html`
              <button class="menu-item ${this.value === opt.value ? 'selected' : ''}" role="option" aria-selected=${this.value === opt.value} @click=${() => this.select(opt.value)}>
                <span class="check">check</span> ${opt.label}
              </button>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sort-dropdown': SortDropdown;
  }
}