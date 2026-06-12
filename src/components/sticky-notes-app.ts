import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { NoteService } from '../services/note.service';
import type { StickyNote, SortOption } from '../types/note.types';
import {
  APP_EVENTS,
  type NoteCreatePayload,
  type NoteUpdatePayload,
  type NoteDeletePayload,
  type NotePinPayload,
  type SearchQueryPayload,
  type SortChangePayload,
} from '../events/app-events';
import './search-bar';
import './sort-dropdown';
import './sticky-note-form';
import './sticky-note-card';

@customElement('sticky-notes-app')
export class StickyNotesApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    .toolbar {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .toolbar search-bar {
      flex: 1;
      min-width: 200px;
    }
    .new-note-btn {
      padding: 0.5rem 1rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 1rem;
    }
    .new-note-btn:focus-visible {
      outline: 2px solid #1d4ed8;
      outline-offset: 2px;
    }
    .create-form-wrapper {
      margin-bottom: 1.5rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #f9fafb;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
    }
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #6b7280;
    }
  `;

  private noteService = new NoteService();

  @state() private notes: StickyNote[] = [];
  @state() private searchQuery = '';
  @state() private sortBy: SortOption = 'createdAt';
  @state() private showCreateForm = false;

  connectedCallback() {
    super.connectedCallback();

    this.notes = this.noteService.getAll();

    this.addEventListener(APP_EVENTS.NOTE_CREATE, this.onNoteCreate as EventListener);
    this.addEventListener(APP_EVENTS.NOTE_UPDATE, this.onNoteUpdate as EventListener);
    this.addEventListener(APP_EVENTS.NOTE_DELETE, this.onNoteDelete as EventListener);
    this.addEventListener(APP_EVENTS.NOTE_PIN, this.onNotePin as EventListener);
    this.addEventListener(APP_EVENTS.SEARCH_QUERY, this.onSearchQuery as EventListener);
    this.addEventListener(APP_EVENTS.SORT_CHANGE, this.onSortChange as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(APP_EVENTS.NOTE_CREATE, this.onNoteCreate as EventListener);
    this.removeEventListener(APP_EVENTS.NOTE_UPDATE, this.onNoteUpdate as EventListener);
    this.removeEventListener(APP_EVENTS.NOTE_DELETE, this.onNoteDelete as EventListener);
    this.removeEventListener(APP_EVENTS.NOTE_PIN, this.onNotePin as EventListener);
    this.removeEventListener(APP_EVENTS.SEARCH_QUERY, this.onSearchQuery as EventListener);
    this.removeEventListener(APP_EVENTS.SORT_CHANGE, this.onSortChange as EventListener);
  }

  private onNoteCreate = (e: CustomEvent<NoteCreatePayload>) => {
    this.noteService.create(e.detail.data);
    this.notes = this.noteService.getAll();
    this.showCreateForm = false;
  };

  private onNoteUpdate = (e: CustomEvent<NoteUpdatePayload>) => {
    this.noteService.update(e.detail.id, e.detail.data);
    this.notes = this.noteService.getAll();
  };

  private onNoteDelete = (e: CustomEvent<NoteDeletePayload>) => {
    this.noteService.delete(e.detail.id);
    this.notes = this.noteService.getAll();
  };

  private onNotePin = (e: CustomEvent<NotePinPayload>) => {
    this.noteService.togglePin(e.detail.id);
    this.notes = this.noteService.getAll();
  };

  private onSearchQuery = (e: CustomEvent<SearchQueryPayload>) => {
    this.searchQuery = e.detail.query;
  };

  private onSortChange = (e: CustomEvent<SortChangePayload>) => {
    this.sortBy = e.detail.sort;
  };

  private toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  private getVisibleNotes(): StickyNote[] {
    const filtered = this.searchQuery
      ? this.noteService.search(this.searchQuery)
      : this.notes;

    return this.noteService.sort(filtered, this.sortBy);
  }

  render() {
    const visibleNotes = this.getVisibleNotes();

    return html`
      <div class="toolbar">
        <search-bar></search-bar>
        <sort-dropdown .value=${this.sortBy}></sort-dropdown>
        <button class="new-note-btn" @click=${this.toggleCreateForm}>
          ${this.showCreateForm ? 'Cancel' : '+ New Note'}
        </button>
      </div>

      ${this.showCreateForm
        ? html`
            <div class="create-form-wrapper">
              <sticky-note-form></sticky-note-form>
            </div>
          `
        : null}

      ${visibleNotes.length === 0
        ? html`
            <div class="empty-state">
              ${this.searchQuery
                ? html`<p>No notes match "${this.searchQuery}"</p>`
                : html`<p>No notes yet. Create your first one!</p>`}
            </div>
          `
        : html`
            <div class="grid">
              ${visibleNotes.map(
                (note) => html`<sticky-note-card .note=${note}></sticky-note-card>`
              )}
            </div>
          `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sticky-notes-app': StickyNotesApp;
  }
}