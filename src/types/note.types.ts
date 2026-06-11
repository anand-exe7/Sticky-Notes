export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'orange';

export type SortOption = 'createdAt' | 'updatedAt' | 'title';

export interface StickyNote {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFormData {
  title: string;
  content: string;
  color: NoteColor;
}