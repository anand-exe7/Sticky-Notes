import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { APP_EVENTS, type SortChangePayload } from '../events/app-events';
import type { SortOption } from '../types/note.types';

@customElement('sort-dropdown')
export class SortDropdown extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    select {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.375rem;
      font-size: 1rem;
      background: white;
    }
    select:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 1px;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }
  `;

  @property({ type: String })
  value: SortOption = 'createdAt';

  private handleChange(e: Event) {
    const sort = (e.target as HTMLSelectElement).value as SortOption;
    this.dispatchEvent(
      new CustomEvent<SortChangePayload>(APP_EVENTS.SORT_CHANGE, {
        detail: { sort },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <label for="sort-select" class="sr-only">Sort notes by</label>
      <select id="sort-select" .value=${this.value} @change=${this.handleChange}>
        <option value="createdAt">Creation Time</option>
        <option value="updatedAt">Last Updated</option>
        <option value="title">Title (A-Z)</option>
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sort-dropdown': SortDropdown;
  }
}