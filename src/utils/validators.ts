import type { NoteFormData, NoteColor } from '../types/note.types';

export const VALIDATION = {
  TITLE_MAX: 100,
  CONTENT_MAX: 1000,
  COLORS: ['yellow', 'blue', 'green', 'pink', 'orange'] as NoteColor[],
};

export interface ValidationErrors {
  title?: string;
  content?: string;
  color?: string;
}

export function validateNoteForm(data: NoteFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.title.trim()) {

    errors.title = 'title is required';

  } else if (data.title.length > VALIDATION.TITLE_MAX) {
    
    errors.title = `title must be ${VALIDATION.TITLE_MAX} characters or less`;
  
}

  if (!data.content.trim()) {

    errors.content = 'content is required';

  } else if (data.content.length > VALIDATION.CONTENT_MAX) {

    errors.content = `content must be ${VALIDATION.CONTENT_MAX} characters or less`;
  }

  if (!VALIDATION.COLORS.includes(data.color)) {

    errors.color = 'Please select a valid color';
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}