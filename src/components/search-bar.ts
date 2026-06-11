import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { APP_EVENTS, type SearchQueryPayload } from '../events/app-events';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.375rem;
      font-size: 1rem;
      box-sizing: border-box;
    }
    input:focus-visible {
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

  @state()
  private value = '';

  private debounceTimer?: number;

  private handleInput(e: InputEvent) {
    this.value = (e.target as HTMLInputElement).value;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent<SearchQueryPayload>(APP_EVENTS.SEARCH_QUERY, {
          detail: { query: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }, 300);
  }

  render() {
    return html`
      <label for="search-input" class="sr-only">Search notes</label>
      <input
        id="search-input"
        type="text"
        placeholder="Search notes..."
        .value=${this.value}
        @input=${this.handleInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'search-bar': SearchBar;
  }
}