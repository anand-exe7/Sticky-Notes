import { stickyNoteFormStyles } from '../styles/sticky-note-form.styles.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { NOTE_COLORS, NOTE_COLOR_MAP, type NoteColor, type StickyNote } from '../models/sticky-note.js';

export interface NoteFormData {
  title: string;
  content: string;
  color: NoteColor;
}

@customElement('sticky-note-form')
export class StickyNoteForm extends LitElement {
  @property({ attribute: false }) note: StickyNote | null = null;

  @state() private noteTitle = '';
  @state() private content = '';
  @state() private color: NoteColor = 'yellow';
  @state() private titleError = '';
  @state() private contentError = '';

  static styles = stickyNoteFormStyles;

  connectedCallback() {
    super.connectedCallback();
    if (this.note) {
      this.noteTitle   = this.note.title;
      this.content = this.note.content;
      this.color   = this.note.color;
    }
    window.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.cancel();
  };

  private validate(): boolean {
    let valid = true;
    this.titleError   = '';
    this.contentError = '';

    if (!this.noteTitle.trim()) {
      this.titleError = 'Title is required.';
      valid = false;
    } else if (this.noteTitle.length > 100) {
      this.titleError = 'Title cannot exceed 100 characters.';
      valid = false;
    }

    if (!this.content.trim()) {
      this.contentError = 'Content is required.';
      valid = false;
    } else if (this.content.length > 1000) {
      this.contentError = 'Content cannot exceed 1000 characters.';
      valid = false;
    }

    return valid;
  }

  private submit(e: Event) {
    e.preventDefault();
    if (!this.validate()) return;

    this.dispatchEvent(new CustomEvent<NoteFormData>('note-submit', {
      detail: {
        title:   this.noteTitle.trim(),
        content: this.content.trim(),
        color:   this.color,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private cancel() {
    this.dispatchEvent(new CustomEvent('form-cancel', { bubbles: true, composed: true }));
  }

  private handleOverlayClick(e: Event) {
    if (e.target === e.currentTarget) this.cancel();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.cancel();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.validate()) {
        this.submit(e);
      }
    }
  }

  get noteBg(): string {
    return NOTE_COLOR_MAP[this.color];
  }

  render() {
    const isEditing = !!this.note;
    const titleLen   = this.noteTitle.length;
    const contentLen = this.content.length;

    return html`
      <div class="overlay" @keydown=${this.handleKeyDown} role="dialog" aria-modal="true" aria-label="${isEditing ? 'Edit note' : 'Create new note'}">
        <div class="modal" style="background-color: ${this.noteBg}; transform: rotate(-1deg);">
          <div class="tape"></div>

          <div class="modal-header">
            <span class="modal-title">${isEditing ? 'Edit Note' : 'New Note'}</span>
            <button class="close-btn" @click=${this.cancel} aria-label="Close">close</button>
          </div>

          <form @submit=${this.submit} novalidate>
            <div class="field" style="margin-bottom: 12px;">
              <label for="note-title">Title</label>
             
              <input id="note-title" type="text" class="${this.titleError ? 'error' : ''}" placeholder="Note title..." maxlength="100" .value=${this.noteTitle} @input=${(e: Event) => { this.noteTitle = (e.target as HTMLInputElement).value; this.titleError = ''; }} autocomplete="off" autofocus />
             
              <div style="display:flex; justify-content:space-between; align-items:center;">
                ${this.titleError ? html`<span class="error-msg" role="alert">${this.titleError}</span>` : html`<span></span>`}
                <span class="char-count ${titleLen > 90 ? 'warn' : ''}">${titleLen}/100</span>
             
                </div>
            </div>

            <div class="field" style="margin-bottom: 12px;">
              <label for="note-content">Content</label>
              <textarea id="note-content" class="${this.contentError ? 'error' : ''}" placeholder="Write your note here..." rows="5" maxlength="1000" .value=${this.content} @input=${(e: Event) => { this.content = (e.target as HTMLTextAreaElement).value; this.contentError = ''; }}></textarea>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                
                ${this.contentError ? html`<span class="error-msg" role="alert">${this.contentError}</span>` : html`<span></span>`}

                <span class="char-count ${contentLen > 900 ? 'warn' : ''}">${contentLen}/1000</span>
              </div>
            </div>

            <div class="field" style="margin-bottom: 16px;">
              <label>Color</label>
              <div class="color-row" role="radiogroup" aria-label="Note color">
                ${NOTE_COLORS.map(c => html`
                  <button type="button" class="color-swatch ${this.color === c.value ? 'selected' : ''}" style="background: ${c.hex};" aria-label="${c.label}" aria-pressed=${this.color === c.value} @click=${() => { this.color = c.value; }}>
                </button>
                `)}
              </div>
            </div>

            <div class="actions">

              <button type="submit" class="btn-save">
                ${isEditing ? 'Save Changes' : 'Add Note'}
              </button>

              <button type="button" class="btn-cancel" @click=${this.cancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sticky-note-form': StickyNoteForm;
  }
}