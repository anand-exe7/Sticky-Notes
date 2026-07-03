import type { StickyNote } from '../models/sticky-note.js';
import type { NoteFormData } from '../components/sticky-note-form.js';

const API_URL = 'https://sticky-notes-backend-w87x.onrender.com/api/notes';

const parseDates = (note: any): StickyNote => ({
  ...note,
  createdAt: new Date(note.createdAt),
  updatedAt: new Date(note.updatedAt)
});

export const api = {
  async getNotes(): Promise<StickyNote[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch notes');
    const data = await res.json() || [];
    return data.map(parseDates);
  },

  async getTrashNotes(): Promise<StickyNote[]> {
    const res = await fetch(`${API_URL}/trash`);
    if (!res.ok) throw new Error('Failed to fetch trash notes');
    const data = await res.json() || [];
    return data.map(parseDates);
  },

  async createNote(data: NoteFormData): Promise<StickyNote> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create note');
    const json = await res.json();
    return parseDates(json);
  },

  async updateNote(id: string, data: NoteFormData): Promise<StickyNote> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update note');
    const json = await res.json();
    return parseDates(json);
  },

  async togglePin(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}/pin`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to toggle pin');
  },

  async deleteNote(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete note');
  },

  async restoreNote(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}/restore`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to restore note');
  },

  async permanentDeleteNote(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}/permanent`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to permanently delete note');
  }
};
