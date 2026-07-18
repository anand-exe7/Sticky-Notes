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

  private handleEdit(e: Event) {
    e.stopPropagation();
    this.emit("note-edit", { id: this.note.id });
  }

  private handleDelete(e: Event) {
    e.stopPropagation();
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

        <h3 class="title">${this.note.title}</h3>
        <div class="content">${unsafeHTML(this.note.content)}</div>

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
