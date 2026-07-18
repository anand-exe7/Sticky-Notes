import { stickyNotesAppStyles } from '../styles/sticky-notes-app.styles.js';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { type StickyNote, type SortOption, NOTE_COLOR_MAP } from '../models/sticky-note.js';
import type { NoteFormData } from './sticky-note-form.js';
import './sticky-note-card.js';
import './sticky-note-form.js';
import './search-bar.js';
import './sort-dropdown.js';
import { api } from '../services/api.js';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  action?: { label: string; handler: () => void };
}

@customElement('sticky-notes-app')
export class StickyNotesApp extends LitElement {
  private notes: StickyNote[] = [];

  @state() private searchQuery = '';
  @state() private sortBy: SortOption = 'createdAt';
  @state() private showForm = false;
  @state() private editingNote: StickyNote | null = null;
  @state() private _renderTick = 0;
  @state() private isLoading = true;

  @state() private deletedNotes: StickyNote[] = [];
  @state() private noteToDelete: StickyNote | null = null;
  @state() private theme: 'light' | 'dark' = 'light';
  @state() private sidebarOpen = false;
  @state() private toasts: Toast[] = [];
  @state() private isScrolled = false;
  
  @state() private selectedCategory: string | null = null;
  
  @state() private unlockedNoteIds = new Set<string>();
  @state() private unlockTarget: { note: StickyNote, action: 'view' | 'edit' | 'delete' } | null = null;
  @state() private unlockPassword = '';
  @state() private unlockError = '';
  
  private draggedNoteId: string | null = null;
  
  private showToastMessage(message: string, type: 'success' | 'error' | 'info' = 'info', action?: { label: string; handler: () => void }) {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts = [...this.toasts, { id, message, type, action }];
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 5000);
  }

  async connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleGlobalKeyDown);
    window.addEventListener('scroll', this.handleScroll);
    await this.loadData();
  }

  private async loadData(showLoader = true) {
    if (showLoader) {
      this.isLoading = true;
    }
    try {
      this.notes = await api.getNotes();
      this.deletedNotes = await api.getTrashNotes();
      this._renderTick++;
    } catch (e) {
      console.error('Failed to load notes', e);
    } finally {
      if (showLoader) {
        this.isLoading = false;
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleGlobalKeyDown);
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = () => {
    this.isScrolled = window.scrollY > 20;
  };

  private handleGlobalKeyDown = (e: KeyboardEvent) => {
    
    const target = e.composedPath()[0];
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || (target as HTMLElement).isContentEditable) {
      return;
    }

    if (e.key.toLowerCase() === 'n' && e.altKey) {
      e.preventDefault();
      this.handleAddNew();
    } else if (e.key.toLowerCase() === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.deletedNotes.length > 0) {
        this.restoreNote(this.deletedNotes[0].id);
      }
    } else if (e.key === '/' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const searchBar = this.shadowRoot?.querySelector('search-bar');
      const input = searchBar?.shadowRoot?.querySelector('input');
      input?.focus();
    } else if (e.key === 'Escape') {
      if (this.sidebarOpen) this.sidebarOpen = false;
      if (this.noteToDelete) this.noteToDelete = null;
      if (this.showForm) this.handleFormCancel();
    }
  };

  static styles = stickyNotesAppStyles;

  private get filteredAndSorted(): StickyNote[] {
    let result = [...this.notes];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory) {
      result = result.filter(n => n.category === this.selectedCategory);
    }

    if (this.sortBy !== 'custom') {
      result.sort((a, b) => {
        if (this.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (this.sortBy === 'updatedAt') {
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }

    const pinned   = result.filter(n => n.pinned);
    const unpinned = result.filter(n => !n.pinned);
    return [...pinned, ...unpinned];
  }

  private handleSearch(e: CustomEvent) {
    this.searchQuery = (e as CustomEvent<{ query: string }>).detail.query;
  }

  private handleSort(e: CustomEvent) {
    this.sortBy = (e as CustomEvent<{ sort: SortOption }>).detail.sort;
  }

  private handleAddNew() {
    this.editingNote = null;
    this.showForm = true;
  }

  private handleNoteEdit(e: CustomEvent) {
    const id = (e as CustomEvent<{ id: string }>).detail.id;
    const note = this.notes.find(n => n.id === id);
    if (note) {
      this.editingNote = note;
      this.showForm = true;
    }
  }

  private handleNoteDelete(e: CustomEvent) {
    const id = (e as CustomEvent<{ id: string }>).detail.id;
    const note = this.notes.find(n => n.id === id);
    if (note) {
      this.noteToDelete = note;
    }
  }

  private handleCategoryFilter(e: CustomEvent) {
    this.selectedCategory = (e as CustomEvent<{category: string}>).detail.category;
  }

  private handleUnlockRequest(e: CustomEvent) {
    const { id, action } = (e as CustomEvent<{ id: string, action: 'view' | 'edit' | 'delete' }>).detail;
    const note = this.notes.find(n => n.id === id);
    if (note) {
      this.unlockTarget = { note, action };
      this.unlockPassword = '';
      this.unlockError = '';
    }
  }

  private handleUnlockKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.verifyUnlockPassword();
    }
  }

  private async verifyUnlockPassword() {
    if (!this.unlockTarget) return;
    
    try {
      const unlockedNote = await api.unlockNote(this.unlockTarget.note.id, this.unlockPassword);
      const { action } = this.unlockTarget;
      
      const newUnlocked = new Set(this.unlockedNoteIds);
      newUnlocked.add(unlockedNote.id);
      this.unlockedNoteIds = newUnlocked;
      
      // Update local note state with the decrypted content
      this.notes = this.notes.map(n => n.id === unlockedNote.id ? unlockedNote : n);
      
      // Store the password temporarily on the unlocked note so the edit form can display it
      unlockedNote.password = this.unlockPassword;
      
      this.unlockTarget = null;
      
      if (action === 'edit') {
        this.editingNote = unlockedNote;
        this.showForm = true;
      } else if (action === 'delete') {
        this.noteToDelete = unlockedNote;
      }
    } catch (err: any) {
      this.unlockError = err.message || 'Incorrect password';
    }
  }

  private cancelUnlock() {
    this.unlockTarget = null;
    this.unlockPassword = '';
    this.unlockError = '';
  }

  private async confirmDelete() {
    if (!this.noteToDelete) return;
    
    const note = this.noteToDelete;
    
    this.deletedNotes = [note, ...this.deletedNotes];
    this.notes = this.notes.filter(n => n.id !== note.id);
    this.noteToDelete = null;
    
    this.showToastMessage('Note deleted', 'info', {
      label: 'Undo',
      handler: () => this.restoreNote(note.id)
    });
    
    this._renderTick++;

    try {
      await api.deleteNote(note.id);
    } catch (e: any) {
      console.error('Failed to delete note', e);
      this.showToastMessage(e.message || 'Failed to delete note', 'error');
      await this.loadData();
    }
  }

  private cancelDelete() {
    this.noteToDelete = null;
  }

  private async restoreNote(id: string) {
    this.deletedNotes = this.deletedNotes.filter(n => n.id !== id);
    this._renderTick++;
    try {
      await api.restoreNote(id);
      this.showToastMessage('Note restored', 'success');
      await this.loadData();
    } catch (e: any) {
      console.error('Failed to restore note', e);
      this.showToastMessage(e.message || 'Failed to restore note', 'error');
      await this.loadData();
    }
  }

  private async permanentDelete(id: string) {
    this.deletedNotes = this.deletedNotes.filter(n => n.id !== id);
    this._renderTick++;
    try {
      await api.permanentDeleteNote(id);
      this.showToastMessage('Note permanently deleted', 'info');
      await this.loadData(false);
    } catch (e: any) {
      console.error('Failed to permanently delete note', e);
      this.showToastMessage(e.message || 'Failed to permanently delete note', 'error');
      await this.loadData(false);
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('sidebarOpen')) {
      if (this.sidebarOpen && window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  private handleDragStart(e: DragEvent, note: StickyNote) {
    this.draggedNoteId = note.id;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', note.id);
    }
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
  }

  private handleDrop(e: DragEvent, targetNote: StickyNote) {
    e.preventDefault();
    if (!this.draggedNoteId || this.draggedNoteId === targetNote.id) return;
    
    const draggedNote = this.notes.find(n => n.id === this.draggedNoteId);
    if (!draggedNote || draggedNote.pinned !== targetNote.pinned) return;

    const draggedIdx = this.notes.findIndex(n => n.id === this.draggedNoteId);
    const targetIdx = this.notes.findIndex(n => n.id === targetNote.id);
    
    if (draggedIdx === -1 || targetIdx === -1) return;

    const newNotes = [...this.notes];
    const [removed] = newNotes.splice(draggedIdx, 1);
    newNotes.splice(targetIdx, 0, removed);
    
    this.notes = newNotes;
    this.sortBy = 'custom';
    this.draggedNoteId = null;
    this._renderTick++;
  }

  private toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
      this.setAttribute('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      this.removeAttribute('theme');
    }
  }

  private async handleNotePin(e: CustomEvent) {
    const id = (e as CustomEvent<{ id: string }>).detail.id;
    
    this.notes = this.notes.map(n =>
      n.id === id ? { ...n, pinned: !n.pinned, updatedAt: new Date() } : n
    );
    this._renderTick++;

    try {
      await api.togglePin(id);
    } catch (err) {
      console.error('Failed to pin note', err);
      await this.loadData();
    }
  }

  private async handleFormSubmit(e: CustomEvent) {
    const data = (e as CustomEvent<NoteFormData>).detail;

    try {
      if (this.editingNote) {
        const updated = await api.updateNote(this.editingNote.id, data);
        this.notes = this.notes.map(n => n.id === updated.id ? updated : n);
        this.showToastMessage('Note updated successfully', 'success');
      } else {
        const newNote = await api.createNote(data);
        this.notes = [newNote, ...this.notes];
        this.showToastMessage('Note created successfully', 'success');
      }
      this._renderTick++;
      this.showForm = false;
      this.editingNote = null;
    } catch (err: any) {
      console.error('Failed to save note', err);
      this.showToastMessage(err.message || 'Failed to save note', 'error');
    }
  }

  private handleFormCancel() {
    this.showForm = false;
    this.editingNote = null;
  }

  render() {
    const notes = this.filteredAndSorted;
    const categories = Array.from(new Set(this.notes.map(n => n.category).filter(Boolean)));

    return html`
      <div class="top-nav ${this.isScrolled ? 'scrolled' : ''}">
        <div class="nav-top-row">
          <button class="hamburger-btn" @click=${() => this.sidebarOpen = true} aria-label="Open Menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div class="nav-actions">
            <sort-dropdown
              .value=${this.sortBy}
              @sort-changed=${this.handleSort}
            ></sort-dropdown>

            <button class="theme-btn" @click=${this.toggleTheme} aria-label="Toggle theme">
              <span class="material-symbols-outlined">${this.theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </div>
        <div class="search-container">
          <search-bar
            .value=${this.searchQuery}
            @search-changed=${this.handleSearch}
          ></search-bar>
        </div>
      </div>

      <div class="sidebar-backdrop ${this.sidebarOpen ? 'open' : ''}" @click=${() => this.sidebarOpen = false}></div>
      <aside class="sidebar ${this.sidebarOpen ? 'open' : ''}">
        <div class="sidebar-header">
          <h2>Menu</h2>
          <button @click=${() => this.sidebarOpen = false} aria-label="Close Menu">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="sidebar-content">
          <div class="sidebar-section">
            <h3>Categories</h3>
            <div class="category-list">
              <button class="cat-btn ${this.selectedCategory === null ? 'active' : ''}" @click=${() => this.selectedCategory = null}>
                All Notes
              </button>
              ${categories.map(cat => html`
                <button class="cat-btn ${this.selectedCategory === cat ? 'active' : ''}" @click=${() => this.selectedCategory = cat}>
                  #${cat}
                </button>
              `)}
            </div>
          </div>
          <div class="sidebar-section">
            <h3>Recently Deleted</h3>
            ${this.deletedNotes.length > 0 ? html`
              <div style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto; padding-right:4px;">
                ${this.deletedNotes.map(n => html`
                  <div class="deleted-item">
                    <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${n.title}</span>
                    <div style="display: flex; gap: 8px;">
                      <button @click=${() => this.restoreNote(n.id)} style="padding: 4px 8px; border-radius: 4px; border: 1px solid #d1d5db; background: #ffffff; color: #374151; cursor: pointer;">Restore</button>
                      <button @click=${() => this.permanentDelete(n.id)} style="padding: 4px 8px; border-radius: 4px; border: 1px solid #fecaca; background: #fef2f2; color: #dc2626; cursor: pointer;">Delete</button>
                    </div>
                  </div>
                `)}
              </div>
            ` : html`<p class="empty-text">No recently deleted notes</p>`}
          </div>
          <div style="margin-top: auto; display: flex; flex-direction: column; gap: 32px;">
            <div class="sidebar-section">
              <h3>Board Stats</h3>
            <div class="stat-row">
              <span>Total Notes</span>
              <strong>${this.notes.length}</strong>
            </div>
            <div class="stat-row">
              <span>Pinned Notes</span>
              <strong>${this.notes.filter(n => n.pinned).length}</strong>
            </div>
          </div>
          <div class="sidebar-section shortcuts">
            <h3>Keyboard Shortcuts</h3>
            <div class="shortcut-row">
              <span>New Note</span>
              <kbd>Alt + N</kbd>
            </div>
            <div class="shortcut-row">
              <span>Search</span>
              <kbd>Ctrl + /</kbd>
            </div>
            <div class="shortcut-row">
              <span>Undo Delete</span>
              <kbd>Ctrl + Z</kbd>
            </div>
            <div class="shortcut-row">
              <span>Focus Note</span>
              <kbd>Tab</kbd>
            </div>
            <div class="shortcut-row">
              <span>Edit Card</span>
              <kbd>Enter</kbd>
            </div>
            <div class="shortcut-row">
              <span>Delete Card</span>
              <kbd>Del</kbd>
            </div>
            <div class="shortcut-row">
              <span>Pin Card</span>
              <kbd>Alt + P</kbd>
            </div>
            </div>
          </div>
        </div>
      </aside>

     
      <div class="floating-add">
        <div class="add-btn-wrapper">
          <button
            class="add-btn"
            @click=${this.handleAddNew}
            aria-label="Add new note"
          >
            <span class="material-symbols-outlined">add</span>
          </button>
          <span class="add-tooltip">New Note</span>
        </div>
      </div>

     
      <main
        class="board"
        @note-edit=${this.handleNoteEdit}
        @note-delete=${this.handleNoteDelete}
        @note-pin=${this.handleNotePin}
        @note-unlock-request=${this.handleUnlockRequest}
        @category-filter=${this.handleCategoryFilter}
      >
        ${this.isLoading ? html`
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; min-height: 50vh; gap: 32px; background: transparent;">
            <style>
              .sticky-loader {
                position: relative;
                width: 80px;
                height: 80px;
                background: linear-gradient(180deg, #fef08a 0%, #fde047 100%);
                border-radius: 2px;
                transform-origin: top center;
                animation: peel 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
              }
              .sticky-loader::before {
                content: '';
                position: absolute;
                top: -12px;
                left: 50%;
                margin-left: -22px;
                width: 44px;
                height: 18px;
                background: rgba(255, 255, 255, 0.5);
                border-top: 1px solid rgba(255, 255, 255, 0.8);
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                transform: rotate(-3deg);
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
              }
              .sticky-loader::after {
                content: '';
                position: absolute;
                top: 25px;
                left: 10px;
                right: 10px;
                height: 2px;
                background: rgba(0, 0, 0, 0.08);
                box-shadow: 0 14px 0 0 rgba(0, 0, 0, 0.08), 0 28px 0 0 rgba(0, 0, 0, 0.08);
              }
              @keyframes peel {
                0% { 
                  transform: perspective(600px) rotateX(0deg) rotateZ(-2deg); 
                  box-shadow: 2px 4px 8px rgba(0,0,0,0.12); 
                }
                100% { 
                  transform: perspective(600px) rotateX(55deg) rotateZ(3deg); 
                  box-shadow: 5px 35px 25px rgba(0,0,0,0.15); 
                }
              }
              .loading-text {
                color: #4b5563;
                font-family: system-ui, -apple-system, sans-serif;
                font-size: 1.1rem;
                font-weight: 600;
                letter-spacing: 0.5px;
                margin: 0;
              }
            </style>
            <div class="sticky-loader"></div>
            <h2 class="loading-text">Peeling your notes...</h2>
          </div>
        ` : notes.length === 0 ? html`
          <div class="empty-state" role="status" aria-live="polite">
            <div class="empty-card">
              <div class="empty-pin"></div>
              <span class="empty-icon">${this.searchQuery ? 'search_off' : 'sticky_note_2'}</span>
              <p class="empty-title">
                ${this.searchQuery ? 'No matching notes' : 'Your board is empty'}
              </p>
              <p class="empty-sub">
                ${this.searchQuery ? 'Try a different search term' : 'Start Creating Your Notes Now!'}
              </p>
            </div>
          </div>
        ` : html`
          <div class="notes-grid">
            ${notes.map(note => html`
              <sticky-note-card .note=${note} .isUnlocked=${this.unlockedNoteIds.has(note.id)} draggable="true" @dragstart=${(e: DragEvent) => this.handleDragStart(e, note)} @dragover=${(e: DragEvent) => this.handleDragOver(e)} @drop=${(e: DragEvent) => this.handleDrop(e, note)}></sticky-note-card>
            `)}
          </div>
        `}
      </main>

      
      ${this.showForm ? html`
        <sticky-note-form
          .note=${this.editingNote}
          .existingTitles=${this.notes.map(n => n.title)}
          @note-submit=${this.handleFormSubmit}
          @form-cancel=${this.handleFormCancel}
        ></sticky-note-form>
      ` : ''}

      
      ${this.toasts.length > 0 ? html`
        <div class="toast-container">
          ${this.toasts.map(t => html`
            <div class="toast ${t.type}" role="alert">
              <span>${t.message}</span>
              ${t.action ? html`<button @click=${() => { t.action!.handler(); this.toasts = this.toasts.filter(toast => toast.id !== t.id); }}>${t.action.label}</button>` : ''}
            </div>
          `)}
        </div>
      ` : ''}

     
      ${this.noteToDelete ? html`
        <div class="modal-backdrop">
          <div class="confirm-modal" role="dialog" aria-labelledby="confirm-title" style="position: relative;">
            <div class="modal-tape"></div>
            <h3 id="confirm-title" class="confirm-title">Delete Note</h3>
            <p class="confirm-text">Are you sure you want to delete "${this.noteToDelete.title}"?</p>
            <div class="confirm-actions">
              <button class="confirm-btn btn-cancel" @click=${this.cancelDelete}>Cancel</button>
              <button class="confirm-btn btn-delete" @click=${this.confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      ` : ''}

      ${this.unlockTarget ? html`
        <div class="unlock-modal-backdrop" @click=${this.cancelUnlock}>
          <div class="unlock-modal" @click=${(e: Event) => e.stopPropagation()} style="background-color: ${NOTE_COLOR_MAP[this.unlockTarget.note.color] || '#fff'}; transform: rotate(${this.unlockTarget.note.id.charCodeAt(0) % 2 === 0 ? '-1deg' : '1deg'});">
            <div class="modal-tape"></div>
            <div class="modal-lock-icon">
              <svg class="animated-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path class="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Unlock Note</h3>
            <p>Enter password to unlock "${this.unlockTarget.note.title}"</p>
            <input type="password" class="unlock-modal-input ${this.unlockError ? 'error' : ''}" placeholder="Enter password" .value=${this.unlockPassword} @input=${(e: Event) => { this.unlockPassword = (e.target as HTMLInputElement).value; this.unlockError = ''; }} @keydown=${(e: KeyboardEvent) => this.handleUnlockKeydown(e)} autofocus />
            ${this.unlockError ? html`<span class="unlock-error">${this.unlockError}</span>` : ''}
            <div class="unlock-modal-actions">
              <button class="confirm-btn btn-cancel" @click=${this.cancelUnlock}>Cancel</button>
              <button class="confirm-btn btn-submit" @click=${() => this.verifyUnlockPassword()}>Unlock</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sticky-notes-app': StickyNotesApp;
  }
}