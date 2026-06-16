# 📌 Sticky Notes

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Lit](https://img.shields.io/badge/Lit-324FFF?style=for-the-badge&logo=lit&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

A high-performance Single Page Application (SPA) engineered using native **Web Components (Lit)** and **TypeScript**. 

This project implements a reactive, purely in-memory state management system without relying on external UI frameworks or state libraries. By leveraging strict Shadow DOM encapsulation and an event-driven unidirectional data flow, the application ensures high modularity and performance. The UI utilizes advanced CSS masonry layouts and customized rendering logic to simulate physical depth and interactive constraints.

---

## ✨ Features

- **Dynamic Corkboard Layout**: A fully responsive masonry-style grid that smoothly adapts to any screen size.
- **Complete Note Management**: Seamlessly Create, Read, Update, and Delete your notes in real-time.
- **Smart Search & Filtering**: Instantly find what you need with lightning-fast, debounced text filtering.
- **Intelligent Sorting**: Organize your board by `Creation Time`, `Last Updated`, or `Alphabetical (A-Z)`.
- **Note Pinning**: Physically "pin" priority notes to the top of the board with custom physics animations.

### 🚀 Advanced Features
- **Native Drag & Drop**: Freely reorganize notes on the board using the HTML5 Drag and Drop.
- **Theme Support**: Global Light and Dark mode implemented via custom CSS variables.
- **Undo Delete Mechanism**: A temporary toast state allowing instant recovery of accidentally deleted notes.
- **Live Character Counting**: Visual boundary feedback for text inputs.
- **Accessibility & Shortcuts**: Full modifier-based keyboard navigation (`Alt+N`, `Ctrl+/`, `Ctrl+Z`, `Enter`, `Delete`, `Ctrl+P`).

---

## 🏗️ System Architecture

The application strictly adheres to a unidirectional data flow and Shadow DOM encapsulation. 

State is maintained solely in the root container (`<sticky-notes-app>`), and child components communicate exclusively via bubbling `CustomEvents`.

### Component Tree
* `<sticky-notes-app>` (State Manager)
  * `<search-bar>` (Presentational)
  * `<sort-dropdown>` (Presentational)
  * `<sticky-note-card>` (Presentational)
  * `<sticky-note-form>` (Modal Overlay)

---

## 🛠️ Quick Start Guide

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) installed on your local environment.

### 1. Installation
Clone the repository and install the necessary dependencies:
```bash
npm install
```

### 2. Run Development Server
Boot up the local Vite development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173/`.

### 3. Production Build
Compile the strict TypeScript and bundle the application for production:
```bash
npm run build
```

### 4. Execute Test Suite
Run the Vitest suite to verify pure state management and logic functionality:
```bash
npm run test
```

---

## 👨‍💻 Author


---

## 📐 Component Design Document

This section outlines the architectural decisions, component hierarchy, state management flow, and event-driven communication patterns used in the application.

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
