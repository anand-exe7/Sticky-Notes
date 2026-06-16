import { css } from 'lit';

export const stickyNoteFormStyles = css`
    :host { display: block; touch-action: manipulation; }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 200;
      animation: fadeIn 0.15s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .modal {
      width: 100%;
      max-width: 420px;
      border-radius: 4px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: slideUp 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) rotate(var(--rotation, -1deg)); }
      to   { opacity: 1; transform: translateY(0)    rotate(var(--rotation, -1deg)); }
    }

    /* Tape decoration */
    .tape {
      position: absolute;
      top: -11px;
      left: 50%;
      transform: translateX(-50%) rotate(1deg);
      width: 90px; height: 24px;
      background: rgba(255,255,255,0.4);
      border-left:  2px dashed rgba(0,0,0,0.06);
      border-right: 2px dashed rgba(0,0,0,0.06);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      backdrop-filter: blur(2px);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }
    .modal-title {
      font-family: 'Geist', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #1b1b24;
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      color: #464555;
      display: flex;
      align-items: center;
      transition: color 0.15s, background 0.15s;
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
    .close-btn:hover { color: #ba1a1a; background: rgba(186,26,26,0.1); }
    .close-btn:focus-visible { outline: 2px solid #3525cd; }

    .field { display: flex; flex-direction: column; gap: 4px; }

    label {
      font-family: 'Geist', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(70,69,85,0.7);
    }

    input[type="text"], textarea {
      background: rgba(0,0,0,0.05);
      border: 1.5px solid rgba(0,0,0,0.08);
      border-radius: 6px;
      padding: 10px 12px;
      font-family: 'Geist', sans-serif;
      font-size: 15px;
      color: #1b1b24;
      outline: none;
      transition: border-color 0.15s;
      resize: none;
    }
    input[type="text"]:focus, textarea:focus {
      border-color: #3525cd;
    }
    input[type="text"].error, textarea.error {
      border-color: #ba1a1a;
    }
    .error-msg {
      font-family: 'Geist', sans-serif;
      font-size: 12px;
      color: #ba1a1a;
    }
    .char-count {
      font-family: 'Geist', sans-serif;
      font-size: 11px;
      color: rgba(70,69,85,0.6);
      text-align: right;
    }
    .char-count.warn { color: #ba1a1a; }

    .color-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .color-swatch {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2.5px solid transparent;
      cursor: pointer;
      transition: transform 0.15s, border-color 0.15s;
      outline: none;
      position: relative;
    }
    .color-swatch:hover { transform: scale(1.12); }
    .color-swatch.selected { border-color: #1b1b24; }
    .color-swatch:focus-visible { outline: 2px solid #3525cd; outline-offset: 2px; }
    .color-swatch.selected::after {
      content: 'check';
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
      font-size: 14px;
      color: rgba(0,0,0,0.6);
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }

    .actions {
      display: flex;
      gap: 10px;
      padding-top: 4px;
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    .btn-save {
      flex: 1;
      background: #3525cd;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, opacity 0.15s;
    }
    .btn-save:hover { background: #2a1eb8; }
    .btn-save:disabled { opacity: 0.45; cursor: not-allowed; }
    .btn-save:focus-visible { outline: 2px solid #1b1b24; outline-offset: 2px; }

    .btn-cancel {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background: rgba(0,0,0,0.1);
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #1b1b24;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-cancel:hover { background: rgba(0,0,0,0.18); }
    .btn-cancel:focus-visible { outline: 2px solid #3525cd; }
  `;
