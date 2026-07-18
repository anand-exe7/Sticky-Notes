import { stickyNoteFormStyles } from '../styles/sticky-note-form.styles.js';
import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { NOTE_COLORS, NOTE_COLOR_MAP, type NoteColor, type StickyNote } from '../models/sticky-note.js';

const EMOJIS = ['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾'];

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
  @state() private showEmoji = false;
  
  @state() private activeFormats = {
    bold: false,
    italic: false,
    underline: false,
    insertUnorderedList: false
  };

  @query('#note-content') private contentDiv!: HTMLElement;

  protected firstUpdated() {
    if (this.contentDiv) {
      this.contentDiv.innerHTML = this.content;
    }
  }

  private updateFormatState() {
    this.activeFormats = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList')
    };
  }

  private format(command: string, e: Event, value?: string) {
    e.preventDefault();
    document.execCommand(command, false, value);
    this.content = this.contentDiv.innerHTML;
    this.updateFormatState();
  }

  private insertEmoji(emoji: string, e: Event) {
    e.preventDefault();
    document.execCommand('insertText', false, emoji);
    this.showEmoji = false;
    this.content = this.contentDiv.innerHTML;
  }

  private handleTitleInput(e: Event) {
    this.noteTitle = (e.target as HTMLInputElement).value;
    this.titleError = '';
  }

  private handleContentInput(e: Event) {
    this.content = (e.target as HTMLElement).innerHTML;
    this.contentError = '';
  }

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
    const contentLen = this.content.replace(/<[^>]*>?/gm, '').length;

    return html`
      <div class="overlay" @keydown=${this.handleKeyDown} role="dialog" aria-modal="true" aria-label="${isEditing ? 'Edit note' : 'Create new note'}">
        <div class="modal" style="background-color: ${this.noteBg}; transform: rotate(-1deg);">
          <div class="tape"></div>

          <div class="modal-header">
            <span class="modal-title">${isEditing ? 'Edit Note' : 'New Note'}</span>
            <button class="close-btn" @click=${this.cancel} aria-label="Close">close</button>
          </div>

          <form @submit=${this.submit} novalidate style="display:flex; flex-direction:column; flex:1;">
            
            <div class="toolbar">
              <button type="button" class="${this.activeFormats.bold ? 'active' : ''}" @mousedown=${(e:Event) => this.format('bold', e)} aria-label="Bold"><span class="material-symbols-outlined">format_bold</span></button>
              <button type="button" class="${this.activeFormats.italic ? 'active' : ''}" @mousedown=${(e:Event) => this.format('italic', e)} aria-label="Italic"><span class="material-symbols-outlined">format_italic</span></button>
              <button type="button" class="${this.activeFormats.underline ? 'active' : ''}" @mousedown=${(e:Event) => this.format('underline', e)} aria-label="Underline"><span class="material-symbols-outlined">format_underlined</span></button>
              <button type="button" class="${this.activeFormats.insertUnorderedList ? 'active' : ''}" @mousedown=${(e:Event) => this.format('insertUnorderedList', e)} aria-label="Bullet List"><span class="material-symbols-outlined">format_list_bulleted</span></button>
              <div class="emoji-wrapper">
                <button type="button" class="${this.showEmoji ? 'active' : ''}" @click=${() => this.showEmoji = !this.showEmoji} aria-label="Emoji"><span class="material-symbols-outlined">add_reaction</span></button>
                ${this.showEmoji ? html`<div class="emoji-picker">${EMOJIS.map(em => html`<span @mousedown=${(e:Event) => this.insertEmoji(em, e)}>${em}</span>`)}</div>` : ''}
              </div>
            </div>

            <input id="note-title" type="text" class="${this.titleError ? 'error' : ''}" placeholder="Note Title" maxlength="100" .value=${this.noteTitle} @input=${this.handleTitleInput} autocomplete="off" autofocus />
            ${this.titleError ? html`<span class="error-msg" role="alert">${this.titleError}</span>` : ''}

            <div class="rich-textarea-wrapper ${this.contentError ? 'error' : ''}">
              <div id="note-content" class="rich-textarea" contenteditable="true" placeholder="Start writing here..." @input=${this.handleContentInput} @keyup=${this.updateFormatState} @mouseup=${this.updateFormatState}></div>
            </div>
            ${this.contentError ? html`<span class="error-msg" role="alert">${this.contentError}</span>` : ''}

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span></span>
              <span class="char-count ${contentLen > 900 ? 'warn' : ''}">${contentLen}/1000</span>
            </div>

            <div class="footer-section">
              <div class="color-row" role="radiogroup" aria-label="Note color">
                ${NOTE_COLORS.map(c => html`
                  <button type="button" class="color-swatch ${this.color === c.value ? 'selected' : ''}" style="background: ${c.hex};" aria-label="${c.label}" aria-pressed=${this.color === c.value} @click=${() => { this.color = c.value; }}></button>
                `)}
              </div>

              <div class="actions">
                <button type="button" class="btn-cancel" @click=${this.cancel}>
                  Discard
                </button>
                <button type="submit" class="btn-save">
                  ${isEditing ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
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