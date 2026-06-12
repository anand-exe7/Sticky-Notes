import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  APP_EVENTS,
  type NoteDeletePayload,
  type NotePinPayload,
} from '../events/app-events';
import type { StickyNote } from '../types/note.types';
import './sticky-note-form';

@customElement('sticky-note-card')
export class StickyNoteCard extends LitElement {
  static styles = css`
    .card {
      border-radius: 0.5rem;
      padding: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-height: 140px;
    }
    .color-yellow { background: #fef9c3; }
    .color-blue   { background: #dbeafe; }
    .color-green  { background: #dcfce7; }
    .color-pink   { background: #fce7f3; }
    .color-orange { background: #ffedd5; }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    h3 {
      margin: 0;
      font-size: 1rem;
      word-break: break-word;
    }
    p {
      margin: 0;
      font-size: 0.875rem;
      white-space: pre-wrap;
      word-break: break-word;
      flex: 1;
    }
    .card-footer {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }
    button {
      background: rgba(255, 255, 255, 0.6);
      border: none;
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      font-size: 0.85rem;
    }
    button:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 1px;
    }
    .pin-btn {
      background: transparent;
      font-size: 1.1rem;
    }
  `;

  @property({ type: Object })
  note!: StickyNote;

  @state() private editing = false;

  private handleDelete() {
    const confirmed = confirm(
      `Delete "${this.note.title}"? This cannot be undone.`
    );
    if (confirmed) {
      this.dispatchEvent(
        new CustomEvent<NoteDeletePayload>(APP_EVENTS.NOTE_DELETE, {
          detail: { id: this.note.id },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handlePinToggle() {
    this.dispatchEvent(
      new CustomEvent<NotePinPayload>(APP_EVENTS.NOTE_PIN, {
        detail: { id: this.note.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private toggleEdit() {
    this.editing = !this.editing;
  }

  private handleFormUpdate() {
    this.editing = false;
  }

  render() {
    if (this.editing) {
      return html`
        <div class="card color-${this.note.color}">
          <sticky-note-form
            .note=${this.note}
            @note:update=${this.handleFormUpdate}
          ></sticky-note-form>
          <button @click=${this.toggleEdit}>Cancel</button>
        </div>
      `;
    }

    return html`
      <div class="card color-${this.note.color}">
        <div class="card-header">
          <h3>${this.note.title}</h3>
          <button
            class="pin-btn"
            @click=${this.handlePinToggle}
            aria-label=${this.note.pinned ? 'Unpin note' : 'Pin note'}
            aria-pressed=${this.note.pinned}
          >
            ${this.note.pinned ? '📌' : '📍'}
          </button>
        </div>
        <p>${this.note.content}</p>
        <div class="card-footer">
          <button @click=${this.toggleEdit} aria-label="Edit note">
            Edit
          </button>
          <button @click=${this.handleDelete} aria-label="Delete note">
            Delete
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sticky-note-card': StickyNoteCard;
  }
}