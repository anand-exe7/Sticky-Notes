import { css } from 'lit';

export const stickyNoteFormStyles = css`
    :host { display: block; touch-action: manipulation; }
    * { box-sizing: border-box; }
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
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 200;
      animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .modal {
      width: 100%;
      max-width: 500px;
      height: 75vh;
      min-height: 600px;
      max-height: 850px;
      border-radius: 4px 4px 28px 4px; /* Post-it curl effect */
      padding: 36px 28px 24px;
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: 
        -4px 8px 12px rgba(0,0,0,0.1), 
        -16px 24px 48px rgba(0,0,0,0.25), 
        inset -10px -10px 20px rgba(0,0,0,0.03);
      animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      background-image: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 80%, rgba(0,0,0,0.05) 100%);
    }
    .modal::after {
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
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px) scale(0.95) rotate(var(--rotation, -1deg)); }
      to   { opacity: 1; transform: translateY(0) scale(1) rotate(var(--rotation, -1deg)); }
    }

    .tape {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%) rotate(2deg);
      width: 120px; height: 32px;
      background: rgba(255,255,255,0.4);
      border: 1px solid rgba(255,255,255,0.3);
      border-left: 2px dashed rgba(0,0,0,0.1);
      border-right: 2px dashed rgba(0,0,0,0.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 10;
    }

    .modal-header {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
      z-index: 20;
      width: 100%;
      flex-shrink: 0;
    }
    .header-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .header-bottom-row {
      display: flex;
      width: 100%;
    }
    .modal-title { display: none; }
    .close-btn {
      background: rgba(255,255,255,0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.5);
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      color: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .close-btn span {
      font-size: 20px;
    }
    .close-btn:hover { 
      color: #ba1a1a; 
      background: rgba(255,255,255,0.9); 
      transform: rotate(90deg); 
      box-shadow: 0 4px 12px rgba(186,26,26,0.15);
    }

    .toolbar {
      position: relative;
      z-index: 50;
      display: flex;
      gap: 6px;
      margin-bottom: 16px;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(32px);
      -webkit-backdrop-filter: blur(32px);
      padding: 6px 8px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.8);
      box-shadow: 0 4px 24px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.7);
      width: fit-content;
      flex-shrink: 0;
    }
    .toolbar button {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      color: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .toolbar button:hover { 
      background: rgba(255,255,255,0.8); 
      color: #1b1b24;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .toolbar button.active {
      background: rgba(0,0,0,0.15);
      color: rgba(0,0,0,0.9);
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);
    }
    .toolbar button span {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 22px;
      pointer-events: none; /* Prevents click issues */
    }
    
    .emoji-wrapper { margin-left: auto; }
    
    .toolbar .emoji-btn {
      background: rgba(53, 37, 205, 0.08);
      color: #3525cd;
      border: 1px solid rgba(53, 37, 205, 0.15);
      margin-left: 8px;
    }
    .toolbar .emoji-btn:hover {
      background: rgba(53, 37, 205, 0.15);
    }
    .toolbar .emoji-btn.active {
      background: #3525cd;
      color: #ffffff;
    }

    .emoji-picker {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      background: #f8f9fa !important; /* solid light gray */
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      opacity: 1 !important;
      border-radius: 12px;
      padding: 12px;
      padding-top: 28px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.25);
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
      gap: 6px;
      z-index: 300;
      width: 260px;
      max-width: calc(100vw - 80px);
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid rgba(0,0,0,0.1);
      animation: fadeContentIn 0.2s ease-out forwards;
    }
    .emoji-picker-close {
      position: absolute;
      top: 4px;
      right: 4px;
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(0,0,0,0.4);
      padding: 4px;
      border-radius: 50%;
      display: flex;
    }
    .emoji-picker-close:hover {
      background: rgba(0,0,0,0.05);
      color: #1b1b24;
    }
    .emoji-picker span {
      cursor: pointer;
      text-align: center;
      padding: 6px;
      border-radius: 8px;
      font-size: 20px;
      user-select: none;
      transition: transform 0.1s;
    }
    .emoji-picker span:hover { background: #f0f0f0; transform: scale(1.1); }

    #note-title {
      background: rgba(0,0,0,0.03);
      border: none;
      padding: 14px 12px 8px 12px;
      border-radius: 8px;
      font-family: 'Geist', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: rgba(0,0,0,0.85);
      outline: none;
      margin-bottom: 12px;
      border-bottom: 2px dashed rgba(0,0,0,0.15);
      transition: background 0.2s, border-color 0.2s;
      flex-shrink: 0;
      width: 100%;
    }
    #note-title:hover, .rich-textarea:hover {
      background: rgba(0,0,0,0.06);
    }
    #note-title:focus { 
      border-bottom: 2px solid rgba(0,0,0,0.3); 
      background: rgba(0,0,0,0.08);
    }
    #note-title::placeholder { color: rgba(0,0,0,0.4); font-weight: 700; }
    #note-title.error {
      border-color: #ba1a1a;
      background: rgba(186,26,26,0.05);
    }

    .category-input {
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(255,255,255,0.7);
      padding: 8px 14px;
      border-radius: 14px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: rgba(0,0,0,0.8);
      flex: 1;
      max-width: 200px;
      margin-right: 12px;
      outline: none;
      text-transform: uppercase;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }
    .category-input:focus {
      background: rgba(255, 255, 255, 0.7);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.1);
    }
    .category-input::placeholder { color: rgba(0,0,0,0.3); text-transform: none; }

    .rich-textarea-wrapper {
      animation: fadeContentIn 0.3s ease-out forwards;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(0,0,0,0.15) transparent;
      padding-right: 8px;
    }
    .rich-textarea-wrapper::-webkit-scrollbar {
      width: 6px;
    }
    .rich-textarea-wrapper::-webkit-scrollbar-track {
      background: transparent;
    }
    .rich-textarea-wrapper::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.25);
      border-radius: 3px;
    }
    .rich-textarea-wrapper::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.4);
    }
    .rich-textarea-wrapper.error .rich-textarea {
      border-color: #ba1a1a;
      background: rgba(186,26,26,0.05);
    }

    .rich-textarea {
      background: rgba(0,0,0,0.03);
      border: 1px dashed rgba(0,0,0,0.15);
      padding: 12px;
      border-radius: 12px;
      font-family: 'Geist', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: rgba(0,0,0,0.75);
      outline: none;
      flex-grow: 1;
      overflow-y: auto;
      transition: background 0.2s, border-color 0.2s;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    .rich-textarea:focus {
      background: rgba(0,0,0,0.08);
      border-color: rgba(0,0,0,0.3);
      border-style: solid;
    }
    .rich-textarea:empty:before {
      content: attr(placeholder);
      color: rgba(0,0,0,0.4);
      pointer-events: none;
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
      border-radius: 8px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: rgba(0,0,0,0.5);
      cursor: pointer;
      transition: color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-align: center;
      flex: 1;
    }
    .mode-toggle button:hover {
      color: rgba(0,0,0,0.8);
    }
    .mode-toggle button.active {
      color: #1b1b24;
    }

    @media (min-width: 768px) {
      .mode-toggle {
        padding: 6px;
      }
      .mode-slider {
        top: 6px;
        bottom: 6px;
        width: calc(50% - 6px);
      }
      .mode-toggle button {
        padding: 10px 32px;
        font-size: 15px;
      }
    }
    @keyframes fadeContentIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .checklist-wrapper {
      animation: fadeContentIn 0.3s ease-out forwards;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-grow: 1;
      height: 100%;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(0,0,0,0.15) transparent;
      padding-right: 8px;
    }
    .checklist-wrapper::-webkit-scrollbar {
      width: 6px;
    }
    .checklist-wrapper::-webkit-scrollbar-track {
      background: transparent;
    }
    .checklist-wrapper::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.25);
      border-radius: 3px;
    }
    .checklist-wrapper::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.4);
    }
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.5);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 8px 12px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.7);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.05);
    }
    .custom-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #3525cd;
    }
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
      -webkit-font-smoothing: antialiased;
    }
    .checklist-input {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      outline: none;
      font-family: 'Geist', sans-serif;
      font-size: 15px;
      color: #1b1b24;
    }
    .checklist-input.done {
      text-decoration: line-through;
      color: rgba(0,0,0,0.4);
    }
    .btn-remove-item {
      background: transparent;
      border: none;
      color: rgba(0,0,0,0.4);
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, color 0.2s;
    }
    .btn-remove-item:hover {
      background: rgba(186,26,26,0.1);
      color: #ba1a1a;
    }
    .btn-remove-item span { font-size: 18px; }
    
    .btn-add-item {
      align-self: flex-start;
      background: rgba(0,0,0,0.04);
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0,0,0,0.7);
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 8px;
      flex-shrink: 0;
    }
    .btn-add-item:hover { background: rgba(0,0,0,0.08); color: #1b1b24; }

    .error-msg {
      font-family: 'Geist', sans-serif;
      font-size: 12px;
      color: #ba1a1a;
      font-weight: 600;
      margin-top: 4px;
    }
    .char-count {
      font-family: 'Geist', sans-serif;
      font-size: 11px;
      color: rgba(0,0,0,0.4);
      text-align: right;
      font-weight: 600;
      margin-top: 4px;
    }
    .char-count.warn { color: #ba1a1a; }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: auto;
      padding-top: 24px;
      flex-shrink: 0;
    }

    .footer-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .lock-section {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      gap: 8px;
      flex: 1 1 300px;
      justify-content: flex-end;
    }
    
    .lock-actions-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: stretch;
      gap: 8px;
      flex-wrap: nowrap;
    }
    .lock-actions-inner {
      display: flex;
      flex-direction: row;
      gap: 8px;
      flex: 1;
      min-width: 0;
      align-items: stretch;
    }
    
    @media (max-width: 480px) {
      .lock-actions-container {
        flex-direction: column;
      }
      .lock-actions-inner {
        flex-direction: column;
      }
      .password-input {
        width: 100% !important;
      }
    }

    .lock-action-btn {
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      font-weight: 600;
      height: 42px;
      padding: 0 16px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
      transition: all 0.2s;
      box-sizing: border-box;
    }
    
    .lock-action-btn.primary {
      background: #3525cd;
      color: #fff;
    }
    .lock-action-btn.primary:hover { background: #2b1eb0; }
    
    .lock-action-btn.secondary {
      background: rgba(0,0,0,0.05);
      color: #1b1b24;
    }
    .lock-action-btn.secondary:hover { background: rgba(0,0,0,0.1); }
    
    .lock-action-btn.danger {
      background: rgba(186,26,26,0.1);
      color: #ba1a1a;
    }
    .lock-action-btn.danger:hover { background: rgba(186,26,26,0.2); }
    
    :host([theme="dark"]) .lock-action-btn.secondary {
      background: rgba(255,255,255,0.1);
      color: #e4e4e7;
    }
    :host([theme="dark"]) .lock-action-btn.secondary:hover { background: rgba(255,255,255,0.15); }
    :host([theme="dark"]) .lock-action-btn.danger {
      background: rgba(255,84,73,0.15);
      color: #ff5449;
    }
    :host([theme="dark"]) .lock-action-btn.danger:hover { background: rgba(255,84,73,0.25); }

    .lock-toggle {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.6);
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 12px;
      color: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      gap: 6px;
      justify-content: center;
      transition: all 0.2s;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .lock-toggle:hover { background: rgba(255,255,255,0.8); color: #1b1b24; }
    .lock-toggle.locked {
      background: #1b1b24;
      color: #fff;
      border-color: #000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .lock-toggle span.material-symbols-outlined { 
      font-size: 18px; 
    }

    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .password-input {
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255,255,255,0.8);
      height: 42px;
      padding: 0 40px 0 16px;
      border-radius: 12px;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #1b1b24;
      width: 160px;
      outline: none;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .password-input:focus { 
      background: rgba(255, 255, 255, 0.9); 
      border-color: rgba(0,0,0,0.2);
      box-shadow: inset 0 2px 4px rgba(255,255,255,1), 0 4px 12px rgba(0,0,0,0.1);
      transform: translateY(-1px);
    }
    .password-input::placeholder {
      color: rgba(0,0,0,0.4);
      font-weight: 500;
    }
    .password-input.error { 
      border-color: #ba1a1a; 
      background: rgba(186,26,26,0.1); 
      color: #ba1a1a;
    }
    .password-input.error::placeholder { color: rgba(186,26,26,0.6); }

    .toggle-password-btn {
      position: absolute;
      right: 4px;
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
      font-size: 18px;
    }

    .color-row {
      display: flex;
      gap: 12px;
    }
    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid transparent;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      outline: none;
      position: relative;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }
    .color-swatch:hover { transform: scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .color-swatch.selected { border-color: rgba(0,0,0,0.3); transform: scale(1.1); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .color-swatch.selected::after {
      content: 'check';
      font-family: 'Material Symbols Outlined';
      font-size: 18px;
      color: rgba(0,0,0,0.7);
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }

    .actions {
      display: flex;
      gap: 12px;
    }
    .btn-save {
      flex: 1;
      background: #1b1b24;
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 14px 24px;
      font-family: 'Geist', sans-serif;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    .btn-save:hover { background: #000; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
    .btn-save:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    .btn-cancel {
      padding: 14px 24px;
      border: none;
      border-radius: 12px;
      background: rgba(0,0,0,0.06);
      font-family: 'Geist', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: rgba(0,0,0,0.7);
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-cancel:hover { background: rgba(0,0,0,0.12); color: #000; }

    @media (max-width: 500px) {
      .modal {
        height: 75vh;
        min-height: 75vh;
        max-height: 75vh;
        padding: 16px 12px 12px;
        max-width: 95%;
        border-radius: 4px 4px 16px 4px;
      }
      .rich-textarea-wrapper, .checklist-wrapper {
        min-height: 0;
        flex-grow: 1;
      }
      .modal-header {
        margin-bottom: 8px;
        gap: 8px;
      }
      .category-input {
        max-width: none;
        margin-right: 8px;
        font-size: 12px;
        padding: 6px 12px;
        min-width: 0;
      }
      .mode-toggle {
        width: 100%;
        padding: 2px;
        margin-bottom: 8px;
      }
      .mode-slider {
        top: 2px;
        left: 2px;
        width: calc(50% - 2px);
        height: calc(100% - 4px);
      }
      .mode-toggle button {
        padding: 6px 4px;
        font-size: 13px;
      }
      .toolbar {
        flex-wrap: wrap;
        padding: 2px 4px;
        gap: 2px;
        margin-bottom: 12px;
      }
      .toolbar button {
        padding: 4px;
      }
      .toolbar .material-symbols-outlined {
        font-size: 18px;
      }
      .emoji-picker {
        left: 0;
        right: auto;
        transform: none;
        top: calc(100% + 4px);
      }
      #note-title {
        font-size: 16px;
        padding: 8px 12px;
        margin-bottom: 12px;
      }
      .rich-textarea {
        font-size: 14px;
        padding: 8px;
      }
      .footer-section {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding-top: 12px;
      }
      .footer-top {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      .color-row {
        justify-content: space-around;
      }
      .color-btn {
        width: 28px;
        height: 28px;
      }
      .lock-section {
        flex: none;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .lock-toggle {
        width: 100%;
        padding: 8px;
        font-size: 13px;
      }
      .password-input-wrapper, .password-input {
        width: 100%;
      }
      .password-input {
        padding: 8px 32px 8px 12px;
      }
      .actions {
        width: 100%;
        gap: 8px;
      }
      .btn-save, .btn-cancel {
        padding: 10px 12px;
        font-size: 14px;
      }
    }
  `;
