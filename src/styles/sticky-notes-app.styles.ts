import { css } from 'lit';

export const stickyNotesAppStyles = css`
    :host {
      display: block;
      min-height: 100vh;
      position: relative;
    }

    * {
      touch-action: manipulation; /* Removes 300ms click delay on mobile */
    }

    /* Controls */
    .controls {
      position: fixed;
      top: 32px;
      right: 32px;
      z-index: 50;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    /* Add button */
    .add-btn-wrapper {
      position: relative;
    }
    .add-btn {
      background: #3525cd;
      color: #fff;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-2deg);
      box-shadow: 0 4px 16px rgba(53,37,205,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    }
    .add-btn:hover {
      transform: rotate(-2deg) scale(1.08);
      box-shadow: 0 6px 20px rgba(53,37,205,0.5);
    }
    .add-btn:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
    .add-btn span {
      font-family: 'Material Symbols Outlined';
      font-size: 28px;
      margin-top: 2px;
    }
    .add-pin {
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px; height: 12px;
      background: #eab308;
      border-radius: 50%;
      box-shadow: 1px 2px 4px rgba(0,0,0,0.5);
      z-index: 10;
    }
    
    .theme-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #f5f2ff;
      border: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #3525cd;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .theme-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.2);
    }
    .theme-btn span {
      font-family: 'Material Symbols Outlined';
      font-size: 24px;
    }

    .toast {
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      background: #1b1b24;
      color: #fff;
      padding: 12px 24px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 100;
      animation: slideUp 0.3s ease;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
    }
    .toast button {
      background: none;
      border: none;
      color: #eab308;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
    }
    
    /* Confirm Delete Modal */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    .confirm-modal {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-family: 'Geist', sans-serif;
    }
    .confirm-title {
      font-size: 18px;
      font-weight: 600;
      color: #1b1b24;
      margin: 0 0 12px 0;
    }
    .confirm-text {
      font-size: 14px;
      color: #464555;
      margin: 0 0 24px 0;
      line-height: 1.5;
    }
    .confirm-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .confirm-btn {
      padding: 8px 16px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background 0.2s;
    }
    .btn-cancel {
      background: transparent;
      color: #464555;
    }
    .btn-cancel:hover {
      background: rgba(0,0,0,0.05);
    }
    .btn-delete {
      background: #ba1a1a;
      color: #fff;
    }
    .btn-delete:hover {
      background: #93000a;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .add-tooltip {
      position: absolute;
      right: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%);
      background: #e4e1ee;
      color: #1b1b24;
      padding: 4px 10px;
      border-radius: 6px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s;
    }
    .add-btn-wrapper:hover .add-tooltip {
      opacity: 1;
    }

    /* Confirm Delete Modal Tape */
    .modal-tape {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%) rotate(-1.5deg);
      width: 100px;
      height: 28px;
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(2px);
      border-left: 2px dashed rgba(0, 0, 0, 0.1);
      border-right: 2px dashed rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    /* Sidebar and Hamburger Menu */
    .hamburger-btn {
      position: fixed;
      top: 32px;
      left: 32px;
      z-index: 60;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      background: #fff;
      border: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1b1b24;
      transition: transform 0.2s, background 0.2s;
    }
    .hamburger-btn:hover {
      background: #f5f2ff;
      color: #3525cd;
      transform: translateY(-2px);
    }
    .hamburger-btn span {
      font-family: 'Material Symbols Outlined';
      font-size: 24px;
    }

    .sidebar-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(2px);
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    .sidebar-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    .sidebar {
      position: fixed;
      top: 0; left: -320px; bottom: 0;
      width: 320px;
      background: #faf9f5;
      z-index: 1001;
      box-shadow: 4px 0 24px rgba(0,0,0,0.15);
      transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      display: flex;
      flex-direction: column;
      font-family: 'Geist', sans-serif;
    }
    .sidebar.open {
      left: 0;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .sidebar-header h2 {
      margin: 0;
      font-size: 18px;
      color: #1b1b24;
    }
    .sidebar-header button {
      background: none;
      border: none;
      cursor: pointer;
      color: #464555;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 4px;
    }
    .sidebar-header button:hover {
      background: rgba(0,0,0,0.05);
    }
    .sidebar-header button span {
      font-family: 'Material Symbols Outlined';
      font-size: 20px;
    }
    .sidebar-content {
      padding: 24px;
      flex: 1;
      overflow-y: auto;
    }
    .sidebar-section {
      margin-bottom: 32px;
    }
    .sidebar-section h3 {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #464555;
      margin: 0 0 16px 0;
    }
    .deleted-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .deleted-item span {
      font-size: 14px;
      font-weight: 500;
      color: #1b1b24;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }
    .deleted-item button {
      background: #eab308;
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 12px;
    }
    .deleted-item button:hover {
      background: #ca9a04;
    }
    .empty-text {
      font-size: 14px;
      color: rgba(27,27,36,0.5);
      font-style: italic;
      margin: 0;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
      color: #464555;
    }
    .stat-row strong {
      color: #1b1b24;
      font-weight: 600;
    }
    .shortcut-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
      color: #464555;
    }
    .shortcut-row kbd {
      background: #e4e1ee;
      color: #1b1b24;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      font-weight: 600;
      box-shadow: 0 2px 0 rgba(0,0,0,0.1);
    }

    body.dark-theme .sidebar { background: #121214; }
    body.dark-theme .sidebar-header h2 { color: #e4e4e7; }
    body.dark-theme .deleted-item { background: #2b2b2f; }
    body.dark-theme .deleted-item span,
    body.dark-theme .stat-row strong { color: #e4e4e7; }
    body.dark-theme .stat-row,
    body.dark-theme .shortcut-row,
    body.dark-theme .sidebar-section h3 { color: #a1a1aa; }
    body.dark-theme .hamburger-btn { background: #2b2b2f; color: #e4e4e7; }
    body.dark-theme .shortcut-row kbd { background: #3f3f46; color: #e4e4e7; box-shadow: 0 2px 0 rgba(0,0,0,0.3); }

    /* Board */
    .board {
      box-sizing: border-box;
      min-height: 100vh;
      padding: 64px 48px 80px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      position: relative;
      z-index: 10;
    }

    .notes-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-content: center;
      align-items: center;
      max-width: 1400px;
      width: 100%;
      margin-top: 100px;
    }

    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-top: 80px;
    }
    .empty-card {
      width: 260px;
      padding: 32px 24px;
      background-color: #fef08a;
      background-image: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
      border-radius: 2px;
      box-shadow: 2px 4px 8px rgba(0,0,0,0.15);
      transform: rotate(-1.5deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      position: relative;
    }
    .empty-pin {
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px; height: 16px;
      background: #ef4444;
      border-radius: 50%;
      box-shadow: 2px 4px 6px rgba(0,0,0,0.5);
    }
    .empty-icon {
      font-family: 'Material Symbols Outlined';
      font-size: 42px;
      color: #464555;
      opacity: 0.7;
    }
    .empty-title {
      font-family: 'Geist', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #1b1b24;
      text-align: center;
    }
    .empty-sub {
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      color: #464555;
      text-align: center;
    }

    /* Centered Search Bar */
    .search-container {
      position: fixed;
      top: 32px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
    }

    @media (max-width: 640px) {
      .hamburger-btn {
        top: 16px;
        left: 16px;
        width: 40px; height: 40px;
      }
      .controls {
        top: 16px;
        right: 16px;
        gap: 12px;
      }
      .theme-btn, .add-btn-wrapper, .add-btn {
        width: 40px; height: 40px;
      }
      .search-container {
        top: 72px; /* Push search bar below hamburger and top controls */
      }
      .board {
        padding: 48px 16px 64px;
      }
      .notes-grid {
        gap: 24px;
        margin-top: 120px; /* Push notes down below the search bar */
      }
    }
  `;
