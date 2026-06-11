import type { NoteFormData, SortOption } from '../types/note.types';

export const APP_EVENTS = {
  NOTE_CREATE:  'note:create',
  NOTE_UPDATE:  'note:update',
  NOTE_DELETE:  'note:delete',
  NOTE_PIN:     'note:pin',
  SEARCH_QUERY: 'search:query',
  SORT_CHANGE:  'sort:change',
} as const;

export interface NoteCreatePayload {
  data: NoteFormData;
}

export interface NoteUpdatePayload {
  id: string;
  data: Partial<NoteFormData>;
}

export interface NoteDeletePayload {
  id: string;
}

export interface NotePinPayload {
  id: string;
}

export interface SearchQueryPayload {
  query: string;
}

export interface SortChangePayload {
  sort: SortOption;
}