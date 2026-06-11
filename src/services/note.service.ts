import type { StickyNote, NoteFormData, SortOption } from '../types/note.types';

export class NoteService {
  private notes: StickyNote[] = [];

  getAll(): StickyNote[] {
    return [...this.notes];
  }

  create(data: NoteFormData): StickyNote {
    const now = new Date();
    const note: StickyNote = {
      id: crypto.randomUUID(),

      title: data.title,

      content: data.content,

      color: data.color,

      pinned: false,

      createdAt: now,
      
      updatedAt: now,
    };
    this.notes.push(note);
    return note;
  }

  update(id: string, data: Partial<NoteFormData>): StickyNote | null {
    const note = this.notes.find((n) => n.id === id);
    if (!note) return null;

    Object.assign(note, data, { updatedAt: new Date() });
    return note;
  }

  delete(id: string): void {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  togglePin(id: string): void {
    const note = this.notes.find((n) => n.id === id);
    if (note) {
      note.pinned = !note.pinned;
      note.updatedAt = new Date();
    }
  }

  search(query: string): StickyNote[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAll();

    return this.notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }

  sort(notes: StickyNote[], by: SortOption): StickyNote[] {
    const sorted = [...notes].sort((a, b) => {
      switch (by) {
        case 'title':
          return a.title.localeCompare(b.title);

        case 'createdAt':
          return b.createdAt.getTime() - a.createdAt.getTime();

        case 'updatedAt':
          return b.updatedAt.getTime() - a.updatedAt.getTime();
          
        default:
          return 0;
      }
    });

    return sorted.sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }
}