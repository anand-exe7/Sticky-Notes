# Sticky Notes Application – Internship Project Overview

## Project Overview
Develop a Sticky Notes web application using Web Components (Lit) and TypeScript. The application should allow users to create, edit, organize, and manage sticky notes within a single-page application.

## Learning Objectives
* Web Components development
* TypeScript fundamentals
* Component communication
* Event-driven architecture
* State management without frameworks
* Reusable UI component design
* Unit testing

## Technical Stack
* TypeScript
* Lit (Web Components)
* HTML5
* CSS3
* ES Modules
* Vite (Optional for build and development)

## Functional Requirements
**1. Notes Dashboard**
* Display all sticky notes on a board.
* Support responsive layouts for desktop and mobile devices.
* Display an empty state when no notes exist.

**2. Create Note**
Users should be able to:
* Create a new sticky note.
* Enter:
  * Title
  * Description/Content
* Assign a color from predefined options.
* Automatically place the note on the board.

**3. Edit Note**
Users should be able to:
* Modify title.
* Modify content.
* Change note color.
* Save changes immediately in memory.

**4. Delete Note**
Users should be able to:
* Delete individual notes.
* Receive a confirmation prompt before deletion.

**5. Search Notes**
Users should be able to:
* Search notes by title.
* Search notes by content.
* View filtered results in real time.

**6. Note Color Management**
Support at least:
* Yellow
* Blue
* Green
* Pink
* Orange

**7. Note Sorting**
Provide options to sort notes by:
* Creation Time
* Last Updated Time
* Title (A-Z)

**8. Pin Notes**
Users should be able to:
* Pin important notes.
* Display pinned notes before regular notes.

## Component Requirements

`<sticky-notes-app>`
Main application container.
Responsibilities:
* Manage application state.
* Render dashboard.
* Handle user interactions.

`<sticky-note-card>`
Represents an individual note.
Responsibilities:
* Display note information.
* Handle edit and delete actions.
* Display note color styling.

`<sticky-note-form>`
Used for creating and editing notes.
Responsibilities:
* Input validation.
* Submit note details.
* Emit events to parent component.

`<search-bar>`
Reusable search component.
Responsibilities:
* Capture search text.
* Emit search events.

`<sort-dropdown>`
Reusable sorting component.
Responsibilities:
* Display sorting options.
* Emit sort selection events.

## Data Model
```typescript
interface StickyNote { 
  id: string; 
  title: string; 
  content: string; 
  color: string; 
  pinned: boolean; 
  createdAt: Date; 
  updatedAt: Date; 
} 
```

## Application State Management
* Maintain all notes in memory.
* No local storage.
* No backend APIs.
* No external state management libraries.
Example:
```typescript
private notes: StickyNote[] = []; 
```

## Validation Rules
**Title**
* Required
* Maximum 100 characters

**Content**
* Required
* Maximum 1000 characters

**Color**
* Must be selected from supported colors

## UI/UX Requirements
* Clean and modern design.
* Responsive layout.
* Reusable components.
* Consistent spacing and typography.
* Loading states not required.
* Accessibility considerations:
  * Keyboard navigation
  * Proper labels
  * Focus indicators

## Bonus Features (Optional)
**Drag & Drop**
* Move notes within the board.

**Theme Support**
* Light Mode
* Dark Mode

**Undo Delete**
* Restore recently deleted note.

**Character Counter**
* Display content length while typing.

## Industry-Level Architecture & Best Practices

To ensure scalability, maintainability, and enterprise-grade code quality, the application will follow a strict architectural pattern:

### 1. Scalable Directory Structure
```text
sticky-notes-app/
├── src/
│   ├── components/
│   │   ├── sticky-notes-app/
│   │   │   ├── sticky-notes-app.ts
│   │   │   └── sticky-notes-app.css
│   │   ├── sticky-note-card/
│   │   │   ├── sticky-note-card.ts
│   │   │   └── sticky-note-card.css
│   │   ├── sticky-note-form/
│   │   │   ├── sticky-note-form.ts
│   │   │   └── sticky-note-form.css
│   │   ├── search-bar/
│   │   │   ├── search-bar.ts
│   │   │   └── search-bar.css
│   │   └── sort-dropdown/
│   │       ├── sort-dropdown.ts
│   │       └── sort-dropdown.css
│   ├── services/
│   │   └── note.service.ts
│   ├── events/
│   │   └── app-events.ts
│   ├── types/
│   │   └── note.types.ts
│   ├── utils/
│   │   └── validators.ts
│   └── index.ts
├── tests/
│   ├── components/
│   │   ├── sticky-note-card.test.ts
│   │   ├── sticky-note-form.test.ts
│   │   ├── search-bar.test.ts
│   │   └── sort-dropdown.test.ts
│   └── services/
│       └── note.service.test.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md

### 2. State Management Strategy
Since external state management libraries are not allowed, we will implement a **Reactive Store via Pub/Sub Pattern**.
* **Store Singleton**: A single instance holding the `notes` array and global state.
* **Subscription Model**: Components subscribe to state changes to reactively update themselves.
* **Unidirectional Data Flow**: Components call methods on the Store (e.g., `store.addNote()`), the store mutates the state internally, and broadcasts a `state-changed` event.

### 3. Component Architecture (Container vs. Presentational)
* **Smart Components (Containers)**: (e.g., `<sticky-notes-app>`). They interact directly with the Store, orchestrate business logic, and pass data downwards.
* **Dumb Components (Presentational)**: (e.g., `<sticky-note-card>`, `<sticky-note-form>`). They are pure—receiving data strictly via Lit `@property()` and communicating backwards solely by dispatching `CustomEvent`s (e.g., `@note-edit`, `@note-delete`).

### 4. Event-Driven Communication
* Strict use of native `CustomEvent` interfaces with `{ bubbles: true, composed: true }` to allow deep components to communicate with their ancestors through the Shadow DOM.

### 5. Styling & Design System
* **Design Tokens**: A centralized `styles/theme.css` file managing all CSS variables for colors, typography, spacing, and theming (Light/Dark mode).
* **Shadow DOM Encapsulation**: Each component manages its own scoped CSS, avoiding global style pollution.
* **Responsive Layouts**: utilizing modern CSS Grid for the dashboard and Flexbox for component-level alignment.

### 6. Code Quality & Tooling
* **Strict TypeScript**: Enforcing `strict: true` to prevent `any` and guarantee null safety.
* **Linting & Formatting**: Pre-configured ESLint and Prettier for cohesive team conventions.
* **Testing Ready**: Pure functions in `utils/` and decoupled state management make unit testing highly effective.

## Deliverables
1. Source Code Repository
2. README Documentation
   * Project setup instructions
   * Build instructions
   * Component structure
3. Component Design Document
4. Demo Walkthrough

Expected Duration: 1–2 Weeks
