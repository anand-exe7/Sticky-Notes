import { css } from 'lit';

export const stickyNotesAppStyles = css`
    :host {
      display: block;
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    * {
      touch-action: manipulation;
      box-sizing: border-box;
    }

    /* Controls */
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }

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
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: 'liga';
      font-size: 28px;
      margin-top: 2px;
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
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: 'liga';
      font-size: 24px;
    }

    .toast-container {
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 9999;
    }
    .toast {
      background: rgba(27, 27, 36, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: #fff;
      padding: 14px 24px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15);
      animation: slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-family: 'Geist', sans-serif;
      font-size: 14.5px;
      font-weight: 500;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .toast.error {
      background: rgba(186, 26, 26, 0.85);
      border-color: rgba(255,255,255,0.2);
    }
    .toast.success {
      background: rgba(34, 197, 94, 0.85);
      border-color: rgba(255,255,255,0.2);
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

    .unlock-modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    .unlock-modal {
      background: #fff;
      padding: 32px 24px;
      border-radius: 8px;
      width: 90%;
      max-width: 340px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      font-family: 'Geist', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .modal-lock-icon {
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0,0,0,0.8);
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.8);
      border: 1px solid rgba(255,255,255,0.7);
      margin-bottom: 12px;
    }
    .modal-lock-icon .animated-lock {
      width: 24px;
      height: 24px;
    }
    .unlock-modal h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1b1b24;
      margin: 0 0 8px 0;
    }
    .unlock-modal p {
      font-size: 14px;
      color: #464555;
      margin: 0 0 24px 0;
      text-align: center;
      line-height: 1.4;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .password-input-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .unlock-modal-input {
      background: rgba(0,0,0,0.04);
      border: 1px solid transparent;
      padding: 12px 40px 12px 16px;
      border-radius: 8px;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #1b1b24;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .unlock-modal-input:focus {
      background: rgba(0,0,0,0.06);
      border-color: rgba(0,0,0,0.2);
    }
    .toggle-password-btn {
      position: absolute;
      right: 8px;
      background: transparent;
      border: none;
      color: rgba(0,0,0,0.5);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s;
    }
    .toggle-password-btn:hover {
      color: rgba(0,0,0,0.8);
    }
    .toggle-password-btn span {
      font-family: 'Material Symbols Outlined';
      font-size: 20px;
    }
    .unlock-modal-input.error { border-color: #ba1a1a; background: rgba(186,26,26,0.05); }
    .unlock-error {
      font-family: 'Geist', sans-serif;
      font-size: 12px;
      color: #ba1a1a;
      font-weight: 600;
      margin-top: 8px;
      align-self: flex-start;
    }
    .unlock-modal-actions {
      display: flex;
      gap: 12px;
      width: 100%;
      margin-top: 24px;
    }
    .btn-submit {
      background: #1b1b24;
      color: #fff;
    }
    .btn-submit:hover { background: #000; }

    /* Sidebar and Hamburger Menu */
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
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: 'liga';
      font-size: 20px;
    }
    .sidebar-content {
      padding: 24px;
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
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
    
    .category-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .cat-btn {
      text-align: left;
      background: transparent;
      border: none;
      padding: 6px 12px;
      border-radius: 12px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0,0,0,0.7);
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .cat-btn:hover {
      background: rgba(0,0,0,0.1);
      color: #1b1b24;
    }
    
    .cat-btn.active {
      background: #3525cd;
      color: #fff;
    }

    .cat-btn.view-all {
      color: #3525cd;
      background: transparent;
      font-size: 13px;
      font-weight: 700;
      padding-top: 8px;
    }
    .cat-btn.view-all:hover {
      background: rgba(53, 37, 205, 0.1);
    }

    :host([theme="dark"]) .cat-btn {
      color: rgba(255,255,255,0.7);
    }
    :host([theme="dark"]) .cat-btn:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
    :host([theme="dark"]) .cat-btn.active {
      background: #3525cd;
      color: #fff;
    }
    :host([theme="dark"]) .cat-btn.view-all {
      color: #9d8df2;
    }
    :host([theme="dark"]) .cat-btn.view-all:hover {
      background: rgba(157, 141, 242, 0.1);
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

    :host([theme="dark"]) .sidebar { background: #121214; }
    :host([theme="dark"]) .sidebar-header h2 { color: #e4e4e7; }
    :host([theme="dark"]) .deleted-item { background: #2b2b2f; }
    :host([theme="dark"]) .deleted-item span,
    :host([theme="dark"]) .stat-row strong { color: #e4e4e7; }
    :host([theme="dark"]) .stat-row,
    :host([theme="dark"]) .shortcut-row,
    :host([theme="dark"]) .sidebar-section h3 { color: #a1a1aa; }
    /* We use a pseudo-element for the mobile blur so we can apply a gradient mask without fading the buttons */
    .top-nav::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    /* Desktop Layout - absolute positioning to match old layout */
    .top-nav {
      pointer-events: none;
      z-index: 60;
    }
    
    .hamburger-btn, .search-container, .nav-actions, .floating-add {
      pointer-events: auto;
    }

    .hamburger-btn {
      position: fixed;
      top: 32px;
      left: 32px;
      z-index: 60;
      width: 44px; height: 44px;
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
    .hamburger-btn:hover { background: #f5f2ff; color: #3525cd; transform: translateY(-2px); }
    .hamburger-btn span {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: 'liga';
      font-size: 24px;
    }
    :host([theme="dark"]) .hamburger-btn { background: #2b2b2f; color: #e4e4e7; }

    .nav-actions {
      position: fixed;
      top: 32px;
      right: 32px;
      z-index: 60;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    .category-nav {
      position: fixed;
      left: 0; right: 0;
      top: 86px;
      z-index: 50;
      pointer-events: auto;
      display: flex;
      gap: 12px;
      flex-wrap: nowrap;
      width: 100%;
      padding: 12px 32px 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      mask-image: linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent);
    }
    
    .category-nav::before,
    .category-nav::after {
      content: '';
      margin: auto;
    }
    
    .category-nav::-webkit-scrollbar {
      display: none;
    }
    
    .cat-pill {
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), inset 0 2px 4px rgba(255, 255, 255, 0.5);
      padding: 6px 16px;
      border-radius: 20px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0,0,0,0.7);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      white-space: nowrap;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      flex-shrink: 0;
    }
    .cat-pill:hover {
      background: rgba(255, 255, 255, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.6);
      color: #1b1b24;
    }
    .cat-pill.active {
      background: rgba(53, 37, 205, 0.85);
      border-color: rgba(53, 37, 205, 0.4);
      box-shadow: 0 8px 20px rgba(53, 37, 205, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3);
      color: #fff;
    }
    :host([theme="dark"]) .cat-pill {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.95);
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    :host([theme="dark"]) .cat-pill:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.15);
    }
    :host([theme="dark"]) .cat-pill.active {
      background: rgba(139, 92, 246, 0.4);
      border-color: rgba(139, 92, 246, 0.6);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2);
    }

    /* Floating Add Button */
    .floating-add {
      position: fixed;
      top: 140px;
      right: 32px;
      z-index: 50;
    }
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
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 24px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="g" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="%23ffb3b3"/><stop offset="20%" stop-color="%23ef4444"/><stop offset="70%" stop-color="%23b91c1c"/><stop offset="100%" stop-color="%23450a0a"/></radialGradient><linearGradient id="s"><stop offset="0%" stop-color="%236b7280"/><stop offset="50%" stop-color="%23e5e7eb"/><stop offset="100%" stop-color="%234b5563"/></linearGradient><filter id="d"><feDropShadow dx="-2" dy="4" stdDeviation="2" flood-opacity="0.4"/></filter></defs><g filter="url(%23d)"><path d="M45,55 L25,85 L30,90 L55,60 Z" fill="url(%23s)"/><path d="M25,85 L20,95 L30,90 Z" fill="%234b5563"/><ellipse cx="50" cy="55" rx="15" ry="6" fill="%237f1d1d" transform="rotate(35 50 55)"/><circle cx="60" cy="40" r="26" fill="url(%23g)"/><circle cx="50" cy="28" r="5" fill="white" opacity="0.8"/></g></svg>') center/contain no-repeat;
    }
    .empty-icon {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: 'liga';
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

    .search-container {
      position: fixed;
      left: 50%;
      top: 32px;
      transform: translateX(-50%);
      z-index: 50;
    }

    @media (max-width: 768px) {
      /* Mobile Navbar Wrapper */
      .top-nav {
        position: fixed;
        top: 0; left: 0; right: 0;
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
        pointer-events: none; /* children have auto */
      }
      
      .top-nav.scrolled::before {
        opacity: 1;
        background: rgba(235, 232, 225, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        /* Extremely smooth fade out to prevent any banding/wavey lines */
        mask-image: linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 75%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 75%, transparent 100%);
      }
      :host([theme="dark"]) .top-nav.scrolled::before {
        background: rgba(18, 18, 20, 0.85);
      }

      .nav-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .hamburger-btn {
        position: static;
      }

      .nav-actions {
        position: static;
        flex-direction: row;
        align-items: center;
      }

      .search-container {
        position: static;
        transform: none;
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .category-nav {
        position: static;
        transform: none;
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        padding: 4px 0 12px;
        -webkit-overflow-scrolling: touch;
      }
      
      .category-nav::-webkit-scrollbar {
        display: none;
      }

      .board {
        padding: 140px 16px 64px;
      }
      .notes-grid {
        gap: 24px;
        margin-top: 20px;
      }
      .floating-add {
        position: fixed;
        bottom: 24px;
        right: 24px;
        top: auto;
      }
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 20000;
      animation: fadeIn 0.2s ease-out;
    }
    .view-note-paper {
      width: 90vw;
      max-width: 500px;
      min-height: 500px;
      max-height: 80vh;
      border-radius: 2px 2px 28px 2px;
      padding: 48px 40px 40px;
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.2), 
        0 20px 60px rgba(0,0,0,0.3),
        inset -10px -10px 20px rgba(0,0,0,0.04);
      background-image: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%, rgba(0,0,0,0.05) 100%);
      animation: paperPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .view-note-paper::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 60px;
      background: linear-gradient(to top left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%);
      border-radius: 0 0 28px 0;
      pointer-events: none;
    }
    @keyframes paperPop {
      from { opacity: 0; transform: scale(0.8) translateY(40px) rotate(-5deg); }
      to   { opacity: 1; transform: scale(1) translateY(0) rotate(var(--rot, 0deg)); }
    }
    .view-note-paper .tape {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%) rotate(-2deg);
      width: 130px; 
      height: 35px;
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-left: 2px dashed rgba(0, 0, 0, 0.05);
      border-right: 2px dashed rgba(0, 0, 0, 0.05);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(4px);
      z-index: 10;
    }
    .view-close-icon {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      color: rgba(0,0,0,0.4);
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .view-close-icon:hover {
      color: #ba1a1a;
      background: rgba(0,0,0,0.05);
      transform: rotate(90deg);
    }
    .view-close-icon span { font-size: 24px; }

    .view-category-pill {
      align-self: flex-start;
      background: rgba(0,0,0,0.06);
      padding: 4px 12px;
      border-radius: 12px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0,0,0,0.6);
      margin-bottom: 16px;
    }

    .view-paper-title {
      font-family: 'Geist', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: rgba(0,0,0,0.85);
      margin: 0 0 24px 0;
      line-height: 1.2;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    .view-paper-content {
      flex: 1;
      overflow-y: auto;
      font-family: 'Geist', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: rgba(0,0,0,0.8);
      padding-right: 8px;
    }
    
    .view-paper-content::-webkit-scrollbar {
      width: 6px;
    }
    .view-paper-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .view-paper-content::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.15);
      border-radius: 3px;
    }
    .view-paper-content::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.25);
    }

    .mode-toggle {
      position: relative;
      display: flex;
      background: rgba(255,255,255,0.45);
      border-radius: 12px;
      padding: 4px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.7);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.05);
      z-index: 1;
      width: fit-content;
    }
    .mode-slider {
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 4px;
      width: calc(50% - 4px);
      background: rgba(255,255,255,0.9);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,1);
      transition: transform 0.5s ease-in-out;
      z-index: -1;
    }
    .mode-slider.left { transform: translateX(0); }
    .mode-slider.right { transform: translateX(100%); }

    .mode-toggle button {
      background: transparent !important;
      box-shadow: none !important;
      border: none;
      padding: 8px 16px;
      width: 110px;
      border-radius: 8px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: rgba(0,0,0,0.5);
      cursor: pointer;
      transition: color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-align: center;
    }
    .mode-toggle button:hover {
      color: rgba(0,0,0,0.8);
    }
    .mode-toggle button.active {
      color: #1b1b24;
    }

    .view-checklist .checklist-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      font-size: 16px;
    }
    .view-checklist .checklist-item .done {
      text-decoration: line-through;
      opacity: 0.5;
    }
    .rich-text-content {
      word-wrap: break-word;
    }

    @media (max-width: 500px) {
      .view-note-paper {
        height: auto;
        min-height: 0;
        max-height: 90vh;
        padding: 32px 24px 24px;
      }
    }
  `;
