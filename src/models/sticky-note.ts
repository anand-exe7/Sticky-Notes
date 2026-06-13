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

export const NOTE_COLORS = [
  { value: 'yellow', label: 'Yellow', hex: '#fef08a' },
  { value: 'green', label: 'Green', hex: '#bbf7d0' },
  { value: 'blue', label: 'Blue', hex: '#bfdbfe' },
  { value: 'pink', label: 'Pink', hex: '#fbcfe8' },
  { value: 'orange', label: 'Orange', hex: '#fed7aa' },
] as const;

export const NOTE_COLOR_MAP: Record<string, string> = {
  yellow: '#fef08a',
  green: '#bbf7d0',
  blue: '#bfdbfe',
  pink: '#fbcfe8',
  orange: '#fed7aa',
};

export const PIN_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#eab308', // Yellow
  '#a855f7', // Purple
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'updatedAt', label: 'Date Modified' },
  { value: 'title', label: 'Title (A-Z)' },
];
