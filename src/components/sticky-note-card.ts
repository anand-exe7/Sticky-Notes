import { stickyNoteCardStyles } from '../styles/sticky-note-card.styles.js';
import { LitElement, html } from 'lit';
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import {
  NOTE_COLOR_MAP,
  type StickyNote,
} from "../models/sticky-note.js";
import { formatDate } from "../utils/format-date.js";

@customElement("sticky-note-card")
export class StickyNoteCard extends LitElement {
  @property({ attribute: false }) note!: StickyNote;

  @property({ type: Boolean }) isUnlocked = false;

  static styles = stickyNoteCardStyles;

  private get rotation(): number {
    const id = this.note.id;
    const sum = [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return (sum % 7) - 3;
  }

  private emit(event: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private requestUnlock(action: 'view' | 'edit' | 'delete') {
    this.emit('note-unlock-request', { id: this.note.id, action });
  }

  private requestView() {
    this.dispatchEvent(
      new CustomEvent("note-view", {
        detail: { id: this.note.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleEdit(e: Event) {
    e.stopPropagation();
    if (this.note.isLocked && !this.isUnlocked) {
      this.requestUnlock('edit');
      return;
    }
    this.emit("note-edit", { id: this.note.id });
  }

  private handleDelete(e: Event) {
    e.stopPropagation();
    if (this.note.isLocked && !this.isUnlocked) {
      this.requestUnlock('delete');
      return;
    }
    this.emit("note-delete", { id: this.note.id });
  }

  private handlePin(e: Event) {
    e.stopPropagation();
    this.emit("note-pin", { id: this.note.id });
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleEdit(e);
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      this.handleDelete(e);
    } else if (e.key.toLowerCase() === "p" && e.altKey) {
      e.preventDefault();
      this.handlePin(e);
    }
  }

  private handleCategoryClick(e: Event) {
    e.stopPropagation();
    if (this.note.category) {
      this.dispatchEvent(new CustomEvent('category-filter', { 
        detail: { category: this.note.category },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const bg = NOTE_COLOR_MAP[this.note.color];
    const rot = this.rotation;

    return html`
      <div
        class="card ${this.note.pinned ? 'folded' : ''}"
        style="--bg: ${bg}; --rot: ${rot}deg;"
        tabindex="0"
        role="article"
        aria-label="${this.note.title}"
        @keydown=${this.handleKeyDown}
      >
        ${this.note.pinned
          ? html`<div class="real-pin"></div>`
          : html`<div class="tape"></div>`
        }
        ${this.note.category ? html`<div class="category-pill" @click=${this.handleCategoryClick} title="Filter by #${this.note.category}">#${this.note.category}</div>` : ''}
        <h3 class="title">${this.note.title}</h3>
        
        ${this.note.isLocked && !this.isUnlocked ? html`
          <div class="content locked-content" @click=${() => this.requestUnlock('view')}>
            <div class="locked-text">
              ${this.note.content.replace(/<[^>]+>/g, '')}
            </div>
            <div class="lock-overlay">
              <div class="animated-lock-container">
                <svg class="animated-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path class="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>
          </div>
        ` : this.note.isChecklist ? html`
          <div class="content checklist-content" @click=${() => this.requestView()}>
            ${this.note.checklistItems?.map(item => html`
              <div class="card-checklist-item ${item.isDone ? 'done' : ''}">
                <span class="material-symbols-outlined">${item.isDone ? 'check_box' : 'check_box_outline_blank'}</span>
                <span>${item.text}</span>
              </div>
            `)}
          </div>
        ` : html`
          <div class="content" @click=${() => this.requestView()}>${unsafeHTML(this.note.content)}</div>
        `}

        <div class="footer">
          <span class="date">${formatDate(this.note.updatedAt)}</span>
          <div
            class="actions"
            role="group"
            aria-label="Note actions"
          >
            <button
              class="action-btn pin"
              @click=${this.handlePin}
              aria-label="${this.note.pinned ? "Unpin note" : "Pin note"}"
              title="${this.note.pinned ? "Unpin" : "Pin"}"
            >
              <span
                style="font-variation-settings: 'FILL' ${this.note.pinned
                  ? 1
                  : 0}"
                >push_pin</span
              >
            </button>
            <button
              class="action-btn edit"
              @click=${this.handleEdit}
              aria-label="Edit note"
              title="Edit"
            >
              <span>edit</span>
            </button>
            <button
              class="action-btn delete"
              @click=${this.handleDelete}
              aria-label="Delete note"
              title="Delete"
            >
              <span>delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sticky-note-card": StickyNoteCard;
  }
}
