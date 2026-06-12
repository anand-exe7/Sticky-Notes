import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  validateNoteForm,
  hasErrors,
  VALIDATION,
  type ValidationErrors,
} from '../utils/validators';
import {
  APP_EVENTS,
  type NoteCreatePayload,
  type NoteUpdatePayload,
} from '../events/app-events';
import type { StickyNote, NoteFormData, NoteColor } from '../types/note.types';

const COLORS: NoteColor[] = ['yellow', 'blue', 'green', 'pink', 'orange'];

@customElement('sticky-note-form')
export class StickyNoteForm extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    label {
      font-weight: 600;
      font-size: 0.875rem;
    }
    input,
    textarea {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-family: inherit;
      font-size: 1rem;
      box-sizing: border-box;
    }
    input:focus-visible,
    textarea:focus-visible,
    button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 1px;
    }
    .error {
      color: #dc2626;
      font-size: 0.8rem;
    }
    .char-count {
      font-size: 0.75rem;
      color: #666;
      text-align: right;
    }
    .colors {
      display: flex;
      gap: 0.5rem;
    }
    .color-swatch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
    }
    .color-swatch.selected {
      border-color: #1f2937;
    }
    .color-yellow { background: #fde047; }
    .color-blue   { background: #60a5fa; }
    .color-green  { background: #4ade80; }
    .color-pink   { background: #f9a8d4; }
    .color-orange { background: #fb923c; }

    .actions {
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .submit {
      background: #3b82f6;
      color: white;
    }
  `;

  @property({ type: Object })
  note: StickyNote | null = null;

  @state() private formTitle = '';

  @state() private formContent = '';

  @state() private formColor: NoteColor = 'yellow';

  @state() private errors: ValidationErrors = {};

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('note') && this.note) {
      this.formTitle = this.note.title;
      this.formContent = this.note.content;
      this.formColor = this.note.color;
    }
  }

  private handleSubmit(e: Event) {
    e.preventDefault();

    const data: NoteFormData = {
      title: this.formTitle,
      content: this.formContent,
      color: this.formColor,
    };

    const errors = validateNoteForm(data);
    this.errors = errors;
    if (hasErrors(errors)) return;

    if (this.note) {
      this.dispatchEvent(
        new CustomEvent<NoteUpdatePayload>(APP_EVENTS.NOTE_UPDATE, {
          detail: { id: this.note.id, data },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent<NoteCreatePayload>(APP_EVENTS.NOTE_CREATE, {
          detail: { data },
          bubbles: true,
          composed: true,
        })
      );
      
      this.formTitle = '';
      this.formContent = '';
      this.formColor = 'yellow';
      this.errors = {};
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <div>
          <label for="note-title">Title</label>
          <input
            id="note-title"
            type="text"
            .value=${this.formTitle}
            maxlength=${VALIDATION.TITLE_MAX}
            @input=${(e: InputEvent) =>
              (this.formTitle = (e.target as HTMLInputElement).value)}
          />
          ${this.errors.title
            ? html`<span class="error">${this.errors.title}</span>`
            : null}
        </div>

        <div>
          <label for="note-content">Content</label>
          <textarea
            id="note-content"
            rows="4"
            maxlength=${VALIDATION.CONTENT_MAX}
            .value=${this.formContent}
            @input=${(e: InputEvent) =>
              (this.formContent = (e.target as HTMLTextAreaElement).value)}
          ></textarea>
          <div class="char-count">
            ${this.formContent.length} / ${VALIDATION.CONTENT_MAX}
          </div>
          ${this.errors.content
            ? html`<span class="error">${this.errors.content}</span>`
            : null}
        </div>

        <div>
          <label id="color-label">Color</label>
          <div class="colors" role="radiogroup" aria-labelledby="color-label">
            ${COLORS.map(
              (c) => html`
                <button
                  type="button"
                  class="color-swatch color-${c} ${this.formColor === c ? 'selected' : ''}"
                  role="radio"
                  aria-checked=${this.formColor === c}
                  aria-label=${c}
                  @click=${() => (this.formColor = c)}
                ></button>
              `
            )}
          </div>
          ${this.errors.color
            ? html`<span class="error">${this.errors.color}</span>`
            : null}
        </div>

        <div class="actions">
          <button type="submit" class="submit">
            ${this.note ? 'Save Changes' : 'Create Note'}
          </button>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sticky-note-form': StickyNoteForm;
  }
}