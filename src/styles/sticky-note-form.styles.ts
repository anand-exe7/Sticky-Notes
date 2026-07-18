import { css } from 'lit';

export const stickyNoteFormStyles = css`
    :host { display: block; touch-action: manipulation; }

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
      max-width: 440px;
      min-height: 480px;
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
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 20;
    }
    .modal-title { display: none; }
    .close-btn {
      background: rgba(255,255,255,0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.5);
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      color: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      transition: all 0.2s;
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-size: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .close-btn:hover { color: #ba1a1a; background: rgba(255,255,255,0.8); transform: rotate(90deg); }

    /* Glassmorphism Toolbar */
    .toolbar {
      display: flex;
      gap: 6px;
      margin-bottom: 16px;
      background: rgba(255, 255, 255, 0.45);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      padding: 6px 8px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.7);
      box-shadow: 0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5);
      width: fit-content;
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
    
    .emoji-wrapper { position: relative; }
    .emoji-picker {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 16px;
      padding: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      z-index: 300;
      width: calc(100vw - 48px);
      max-width: 260px;
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid rgba(255,255,255,0.6);
    }
    @media (max-width: 400px) {
      .emoji-picker {
        grid-template-columns: repeat(6, 1fr);
      }
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

    /* Inputs */
    input[type="text"] {
      background: rgba(0,0,0,0.03);
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: 'Geist', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: rgba(0,0,0,0.85);
      outline: none;
      margin-bottom: 12px;
      border-bottom: 2px dashed rgba(0,0,0,0.15);
      transition: background 0.2s, border-color 0.2s;
    }
    input[type="text"]:hover, .rich-textarea:hover {
      background: rgba(0,0,0,0.06);
    }
    input[type="text"]:focus { 
      border-bottom: 2px solid rgba(0,0,0,0.3); 
      background: rgba(0,0,0,0.08);
    }
    input[type="text"]::placeholder { color: rgba(0,0,0,0.4); font-weight: 700; }
    input[type="text"].error {
      border-color: #ba1a1a;
      background: rgba(186,26,26,0.05);
    }

    .rich-textarea-wrapper {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      min-height: 200px;
      max-height: 400px;
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
      margin-top: auto;
      padding-top: 24px;
    }

    .color-row {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
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
  `;
