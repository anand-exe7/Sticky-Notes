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

