export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'orange';
export type SortOption = 'createdAt' | 'updatedAt' | 'title' | 'custom';

export interface ChecklistItem {
  text: string;
  isDone: boolean;
}

export interface StickyNote {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  category: string;
  isLocked: boolean;
  password?: string;
  isChecklist: boolean;
  checklistItems: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export const NOTE_COLORS = [
  { value: 'yellow', label: 'Yellow', hex: '#fced90' },
  { value: 'green', label: 'Green', hex: '#b7dec0' },
  { value: 'blue', label: 'Blue', hex: '#adcce8' },
  { value: 'pink', label: 'Pink', hex: '#f5b5c8' },
  { value: 'orange', label: 'Orange', hex: '#f2bc8a' },
] as const;

export const NOTE_COLOR_MAP: Record<string, string> = {
  yellow: '#fced90',
  green: '#b7dec0',
  blue: '#adcce8',
  pink: '#f5b5c8',
  orange: '#f2bc8a',
};

export const PIN_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#eab308', // Yellow
  '#a855f7', // Purple
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'custom', label: 'Custom Order' },
  { value: 'createdAt', label: 'Date Created' },
  { value: 'updatedAt', label: 'Date Modified' },
  { value: 'title', label: 'Title (A-Z)' },
];
