import { describe, it, expect, beforeEach } from 'vitest';
import { NoteService } from './note.service.js';
import type { NoteFormData } from '../types/note.types.js';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(() => {
    service = new NoteService();
  });

  it('should start with an empty notes array', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('should create a new note', () => {
    const formData: NoteFormData = {
      title: 'Test Note',
      content: 'This is a test note.',
      color: 'yellow'
    };
    
    const note = service.create(formData);
    
    expect(note.title).toBe('Test Note');
    expect(note.content).toBe('This is a test note.');
    expect(note.color).toBe('yellow');
    expect(note.pinned).toBe(false);
    expect(note.id).toBeDefined();
    
    expect(service.getAll()).toHaveLength(1);
    expect(service.getAll()[0]).toEqual(note);
  });

  it('should update an existing note', () => {
    const note = service.create({ title: 'Old Title', content: 'Old Content', color: 'blue' });
    
    const updated = service.update(note.id, { title: 'New Title', color: 'green' });
    
    expect(updated).not.toBeNull();
    expect(updated!.title).toBe('New Title');
    expect(updated!.content).toBe('Old Content'); 
    expect(updated!.color).toBe('green');
    
    expect(service.getAll()[0].title).toBe('New Title');
  });

  it('should delete a note', () => {
    const note1 = service.create({ title: 'Note 1', content: '1', color: 'pink' });
    const note2 = service.create({ title: 'Note 2', content: '2', color: 'blue' });
    
    expect(service.getAll()).toHaveLength(2);
    
    service.delete(note1.id);
    
    const all = service.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(note2.id);
  });

  it('should toggle pin status', () => {
    const note = service.create({ title: 'Pin Me', content: 'Content', color: 'orange' });
    expect(note.pinned).toBe(false);
    
    service.togglePin(note.id);
    expect(service.getAll()[0].pinned).toBe(true);
    
    service.togglePin(note.id);
    expect(service.getAll()[0].pinned).toBe(false);
  });

  it('should filter notes by search query', () => {
    service.create({ title: 'Apples', content: 'Buy red apples', color: 'green' });
    service.create({ title: 'Bananas', content: 'Yellow fruit', color: 'yellow' });
    service.create({ title: 'Recipe', content: 'Apple pie instructions', color: 'pink' });

    const results = service.search('apple');
    expect(results).toHaveLength(2);
    expect(results.some(n => n.title === 'Apples')).toBe(true);
    expect(results.some(n => n.title === 'Recipe')).toBe(true);
  });

  it('should sort notes by title', () => {
    service.create({ title: 'Zebra', content: 'Z', color: 'blue' });
    service.create({ title: 'Apple', content: 'A', color: 'green' });
    service.create({ title: 'Mango', content: 'M', color: 'orange' });

    const sorted = service.sort(service.getAll(), 'title');
    expect(sorted[0].title).toBe('Apple');
    expect(sorted[1].title).toBe('Mango');
    expect(sorted[2].title).toBe('Zebra');
  });

  it('should always place pinned notes at the top when sorting', () => {
    const zebra = service.create({ title: 'Zebra', content: 'Z', color: 'blue' });
    service.create({ title: 'Apple', content: 'A', color: 'green' });
    
    service.togglePin(zebra.id); 

    const sorted = service.sort(service.getAll(), 'title');
    expect(sorted[0].title).toBe('Zebra');
    expect(sorted[1].title).toBe('Apple');
  });
});
