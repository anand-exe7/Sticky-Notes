import { stickyNoteFormStyles } from '../styles/sticky-note-form.styles.js';
import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { NOTE_COLORS, NOTE_COLOR_MAP, type NoteColor, type StickyNote } from '../models/sticky-note.js';

const EMOJIS = ['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾'];

export interface NoteFormData {
  title: string;
  content: string;
  color: NoteColor;
  category: string;
  isLocked: boolean;
  password?: string;
  isChecklist: boolean;
  checklistItems: { text: string; isDone: boolean }[];
}

@customElement('sticky-note-form')
export class StickyNoteForm extends LitElement {
  @property({ attribute: false }) note: StickyNote | null = null;
  @property({ type: Array }) existingTitles: string[] = [];

  @state() private noteTitle = '';
  @state() private content = '';
  @state() private color: NoteColor = 'yellow';
  @state() private titleError = '';
  @state() private contentError = '';
  @state() private showEmoji = false;
  
  @state() private category = '';
  @state() private isLocked = false;
  @state() private password = '';
  @state() private passwordError = '';
  
  @state() private isChecklist = false;
  @state() private checklistItems: { text: string; isDone: boolean }[] = [];
  
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
      this.category = this.note.category || '';
      this.isLocked = this.note.isLocked || false;
      this.password = this.note.password || '';
      this.isChecklist = this.note.isChecklist || false;
      this.checklistItems = this.note.checklistItems ? [...this.note.checklistItems] : [];
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

  private addChecklistItem() {
    this.checklistItems = [...this.checklistItems, { text: '', isDone: false }];
  }
  private updateChecklistItem(index: number, text: string) {
    this.checklistItems[index].text = text;
    this.requestUpdate();
  }
  private toggleChecklistItem(index: number) {
    this.checklistItems[index].isDone = !this.checklistItems[index].isDone;
    this.requestUpdate();
  }
  private removeChecklistItem(index: number) {
    this.checklistItems.splice(index, 1);
    this.requestUpdate();
  }

  private validate(): boolean {
    let valid = true;
    this.titleError   = '';
    this.contentError = '';
    this.passwordError = '';

    if (this.isLocked && !this.password.trim()) {
      this.passwordError = 'Password required to lock.';
      valid = false;
    }

    if (!this.noteTitle.trim()) {
      this.titleError = 'Title is required.';
      valid = false;
    } else if (this.noteTitle.length > 100) {
      this.titleError = 'Title cannot exceed 100 characters.';
      valid = false;
    } else {
      const normalizedTitle = this.noteTitle.trim().toLowerCase();
      const otherTitles = this.existingTitles.filter(t => !this.note || t !== this.note.title.toLowerCase());
      if (otherTitles.includes(normalizedTitle)) {
        this.titleError = 'Title must be unique. This title already exists.';
        valid = false;
      }
    }

    if (!this.isChecklist) {
      if (!this.content.trim()) {
        this.contentError = 'Content is required.';
        valid = false;
      } else if (this.content.length > 1000) {
        this.contentError = 'Content cannot exceed 1000 characters.';
        valid = false;
      }
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
        category: this.category.trim(),
        isLocked: this.isLocked,
        password: this.password.trim(),
        isChecklist: this.isChecklist,
        checklistItems: this.isChecklist ? this.checklistItems.filter(i => i.text.trim() !== '') : []
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
            <div class="header-top-row">
              <input class="category-input" type="text" placeholder="# Category (Optional)" maxlength="20" .value=${this.category} @input=${(e: Event) => this.category = (e.target as HTMLInputElement).value} autocomplete="off" />
              <button class="close-btn" @click=${this.cancel} aria-label="Close">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <div class="header-bottom-row">
              <div class="mode-toggle">
                <div class="mode-slider ${this.isChecklist ? 'right' : 'left'}"></div>
                <button type="button" class="${!this.isChecklist ? 'active' : ''}" @click=${() => this.isChecklist = false}>Note</button>
                <button type="button" class="${this.isChecklist ? 'active' : ''}" @click=${() => { this.isChecklist = true; if (this.checklistItems.length === 0) this.addChecklistItem(); }}>Checklist</button>
              </div>
            </div>
          </div>

          <form @submit=${this.submit} novalidate style="display:flex; flex-direction:column; flex:1;">

            ${!this.isChecklist ? html`
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
            ` : ''}

            <input id="note-title" type="text" class="${this.titleError ? 'error' : ''}" placeholder="Note Title" maxlength="100" .value=${this.noteTitle} @input=${this.handleTitleInput} autocomplete="off" autofocus />
            ${this.titleError ? html`<span class="error-msg" role="alert">${this.titleError}</span>` : ''}

            ${this.isChecklist ? html`
              <div class="checklist-wrapper">
                ${this.checklistItems.map((item, i) => html`
                  <div class="checklist-item">
                    <input type="checkbox" .checked=${item.isDone} @change=${() => this.toggleChecklistItem(i)} class="custom-checkbox" />
                    <input type="text" class="checklist-input ${item.isDone ? 'done' : ''}" placeholder="List item..." .value=${item.text} @input=${(e: Event) => this.updateChecklistItem(i, (e.target as HTMLInputElement).value)} />
                    <button type="button" class="btn-remove-item" @click=${() => this.removeChecklistItem(i)} tabindex="-1">
                      <span class="material-symbols-outlined">close</span>
                    </button>
                  </div>
                `)}
                <button type="button" class="btn-add-item" @click=${this.addChecklistItem}>+ Add Item</button>
              </div>
            ` : html`
              <div class="rich-textarea-wrapper ${this.contentError ? 'error' : ''}">
                <div id="note-content" class="rich-textarea" contenteditable="true" placeholder="Start writing here..." @input=${this.handleContentInput} @keyup=${this.updateFormatState} @mouseup=${this.updateFormatState}></div>
              </div>
              ${this.contentError ? html`<span class="error-msg" role="alert">${this.contentError}</span>` : ''}
              
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span></span>
                <span class="char-count ${contentLen > 900 ? 'warn' : ''}">${contentLen}/1000</span>
              </div>
            `}

            <div class="footer-section">
              <div class="footer-top">
                <div class="color-row" role="radiogroup" aria-label="Note color">
                  ${NOTE_COLORS.map(c => html`
                    <button type="button" class="color-swatch ${this.color === c.value ? 'selected' : ''}" style="background: ${c.hex};" aria-label="${c.label}" aria-pressed=${this.color === c.value} @click=${() => { this.color = c.value; }}></button>
                  `)}
                </div>

                <div class="lock-section">
                  ${this.isLocked ? html`
                    <div class="password-input-wrapper">
                      <input type="password" class="password-input ${this.passwordError ? 'error' : ''}" placeholder="Enter password" .value=${this.password} @input=${(e: Event) => { this.password = (e.target as HTMLInputElement).value; this.passwordError = ''; }} />
                    </div>
                  ` : ''}
                  <button type="button" class="lock-toggle ${this.isLocked ? 'locked' : ''}" @click=${() => { this.isLocked = !this.isLocked; if (!this.isLocked) { this.password = ''; this.passwordError = ''; } }} aria-label="Lock Note" title="Lock Note">
                    <span class="material-symbols-outlined">${this.isLocked ? 'lock' : 'lock_open'}</span>
                    <span>${this.isLocked ? 'Unlock Note' : 'Lock Note'}</span>
                  </button>
                </div>
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