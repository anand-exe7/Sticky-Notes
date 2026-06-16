# 📐 Component Design Document

This document outlines the architectural decisions, component hierarchy, state management flow, and event-driven communication patterns used in the application.

### 1. Architectural Philosophy

The application is built using a strict unidirectional data flow, adhering to standard Web Component best practices:
- **Properties Down**: Data is passed down from parent components to child components via properties.
- **Events Up**: Child components do not mutate data passed to them. Instead, they emit CustomEvents upwards to notify the parent of an action, and the parent is responsible for mutating the global state.

This approach eliminates the need for external state management libraries (like Redux or MobX) and keeps components entirely decoupled and reusable.

### 2. Component Details & Responsibilities

#### `<sticky-notes-app>`
- **Role**: The "Smart" Container.
- **State Managed**:
  - `private notes: StickyNote[]`: The single source of truth for all notes (In-Memory).
  - `@state() deletedNotes: StickyNote[]`: Manages the recently deleted notes for the recycle bin.
- **Responsibilities**:
  - Stores all note data in memory.
  - Implements the "Sort", "Search", and "Pin" filtering algorithms directly via getters before rendering to child components.
  - Registers global `window` event listeners for app-wide keyboard shortcuts.
  - Listens to child events (`note-edit`, `note-delete`, `note-submit`) and updates the `notes` array accordingly, triggering a re-render.

#### `<sticky-note-card>`
- **Role**: Presentational Component.
- **Inputs**: `@property() note!: StickyNote`
- **Responsibilities**:
  - Encapsulates the visual logic of a single note.
  - Applies deterministic physics (rotation calculations based on ID) and manages internal focus states.
  - Emits `note-edit` (detail: id), `note-delete` (detail: id), and `note-pin` (detail: id) via a helper `emit()` function when action buttons are clicked or keyboard shortcuts are used while focused.

#### `<sticky-note-form>`
- **Role**: Controlled Form Component.
- **Inputs**: `@property() note: StickyNote | null`
- **Internal State**: Title, Content, Color, and Validation Errors.
- **Responsibilities**:
  - Seeds internal state with the `note` property if editing, or defaults if creating.
  - Runs synchronous validation on submit:
    - Title: Required, max 100 characters.
    - Content: Required, max 1000 characters.
  - Emits `note-submit` with a clean `NoteFormData` object upon successful validation.
  - Emits `form-cancel` to request closure.

#### `<search-bar>`
- **Role**: Reusable Input Component.
- **Inputs**: `@property() value: string`
- **Responsibilities**:
  - Encapsulates search-specific styling.
  - Emits a `search-changed` event with the query detail on input change.

#### `<sort-dropdown>`
- **Role**: Reusable Select Component.
- **Inputs**: `@property() value: SortOption`
- **Responsibilities**:
  - Encapsulates the `<select>` UI and predefined `<option>` tags.
  - Emits a `sort-changed` event with the selected `SortOption` detail.

### 3. State Management Lifecycle Example (Editing a Note)

1. User presses `Enter` while focused on a `<sticky-note-card>`.
2. `<sticky-note-card>` dispatches a custom `note-edit` event containing its `id` and `bubbles: true`.
3. `<sticky-notes-app>` catches the event, finds the note in the `notes` array, sets `this.editingNote = note`, and sets `this.showForm = true`. Lit triggers a re-render.
4. The `<sticky-note-form>` component is instantiated and passed the `note` data.
5. User edits text and submits. `<sticky-note-form>` validates, prevents default, and dispatches `note-submit`.
6. `<sticky-notes-app>` catches the event, updates the note inside the `notes` array, sets `this.showForm = false`, and Lit triggers a final re-render, displaying the updated card.
