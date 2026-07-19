import { css } from 'lit';

export const stickyNoteCardStyles = css`
    :host {
      display: block;
      width: 240px;
      position: relative;
      z-index: 1;
    }
    :host(:hover),
    :host(:focus-within) {
      z-index: 100;
    }
    * { touch-action: manipulation; box-sizing: border-box; }
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
    .card {
      width: 100%;
      max-width: 240px;
      min-height: 240px;
      max-height: 340px;
      height: fit-content;
      padding: 20px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      position: relative;
      cursor: grab;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0) 100%
      ), var(--bg);
      box-shadow:
        2px 4px 8px rgba(0, 0, 0, 0.15),
        0 1px 3px rgba(0, 0, 0, 0.1);
      transform: rotate(var(--rot, 0deg));
      transition:
        transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      outline: none;
    }
    .card:active {
      cursor: grabbing;
    }
    .card:focus-visible {
      outline: 2px solid #3525cd;
      outline-offset: 2px;
    }
    .card::before,
    .card::after {
      content: "";
      position: absolute;
      bottom: 12px;
      width: 45%;
      height: 20px;
      z-index: -1;
      box-shadow: 0 12px 10px rgba(0, 0, 0, 0.35);
      transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .card::before {
      left: 8px;
      transform: rotate(-4deg);
    }
    .card::after {
      right: 8px;
      transform: rotate(4deg);
    }

    .card:hover {
      box-shadow:
        4px 14px 22px rgba(0, 0, 0, 0.22),
        0 4px 8px rgba(0, 0, 0, 0.1);
      transform: rotate(0deg) translateY(-4px);
    }
    .card:hover::before,
    .card:hover::after {
      box-shadow: 0 18px 12px rgba(0, 0, 0, 0.5);
    }
    
    .card.folded {
      background: linear-gradient(225deg, transparent 32px, var(--bg) 32px);
      /* Remove standard box-shadow so it doesn't show behind the transparent cut */
      box-shadow: none;
      filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15));
      animation: cardPinImpact 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .card.folded:hover {
      box-shadow: none;
      filter: drop-shadow(4px 14px 12px rgba(0,0,0,0.22));
    }
    
    @keyframes cardPinImpact {
      0% { transform: rotate(var(--rot, 0deg)) translateY(0) scale(1); }
      50% { transform: rotate(calc(var(--rot, 0deg) - 0.5deg)) translateY(2px) scale(0.99); }
      100% { transform: rotate(var(--rot, 0deg)) translateY(0) scale(1); }
    }
    
    @keyframes tapeSlap {
      0% { transform: translateX(-50%) rotate(-10deg) scale(1.3); opacity: 0; }
      100% { transform: translateX(-50%) rotate(1.5deg) scale(1); opacity: 1; }
    }

    @keyframes pinDrop {
      0% { 
        transform: translate(-30%, -30px) scale(1.6) rotate(15deg); 
        opacity: 0; 
      }
      40% { 
        opacity: 1; 
      }
      70% { 
        transform: translate(-50%, 2px) scale(0.95) rotate(-2deg); 
      }
      100% { 
        transform: translate(-50%, 0) scale(1) rotate(0deg); 
        opacity: 1; 
      }
    }

    /* Pin */
    .tape {
      position: absolute;
      top: -11px;
      left: 50%;
      transform: translateX(-50%) rotate(1.5deg);
      width: 80px;
      height: 24px;
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(2px);
      border-left: 2px dashed rgba(0, 0, 0, 0.06);
      border-right: 2px dashed rgba(0, 0, 0, 0.06);
      z-index: 20;
      animation: tapeSlap 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    .real-pin {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 28px;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="g" cx="35%" cy="30%" r="65%"><stop offset="0%" stop-color="%23ff8a8a"/><stop offset="25%" stop-color="%23e22121"/><stop offset="70%" stop-color="%238c0707"/><stop offset="100%" stop-color="%23360000"/></radialGradient><linearGradient id="s" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="50%" stop-color="%239ca3af"/><stop offset="100%" stop-color="%234b5563"/></linearGradient><filter id="d" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="-3" dy="5" stdDeviation="2" flood-opacity="0.4"/></filter></defs><g filter="url(%23d)"><path d="M48,55 L22,88 L28,92 L54,60 Z" fill="url(%23s)"/><path d="M22,88 L18,97 L28,92 Z" fill="%23374151"/><ellipse cx="52" cy="55" rx="16" ry="7" fill="%235e0909" transform="rotate(35 52 55)"/><circle cx="62" cy="40" r="26" fill="url(%23g)"/><ellipse cx="53" cy="24" rx="12" ry="4" fill="white" opacity="0.8" transform="rotate(-40 53 24)"/></g></svg>') center/contain no-repeat;
      z-index: 20;
      animation: pinDrop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .title {
      font-family: "Geist", sans-serif;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.3;
      color: #1b1b24;
      margin-bottom: 8px;
      margin-top: 4px;
      padding-right: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content {
      font-family: "Geist", sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #464555;
      flex: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      white-space: pre-line;
      word-break: break-word;
    }
    .content p {
      margin: 0 0 8px 0;
    }
    .content p:last-child {
      margin-bottom: 0;
    }
    
    .category-pill {
      background: rgba(0,0,0,0.06);
      padding: 4px 10px;
      border-radius: 12px;
      font-family: 'Geist', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: rgba(0,0,0,0.7);
      width: fit-content;
      margin-bottom: 8px;
      margin-top: -4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .category-pill:hover {
      background: rgba(0, 0, 0, 0.15);
      color: #1b1b24;
    }

    .locked-content {
      position: relative;
      flex: 1;
      cursor: pointer;
    }
    .locked-text {
      font-family: "Geist", sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #464555;
      filter: blur(8px);
      opacity: 0.6;
      user-select: none;
      word-break: break-word;
      white-space: pre-line;
      transition: filter 0.4s, opacity 0.4s;
      mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
      mask-composite: intersect;
      -webkit-mask-composite: source-in;
    }
    .locked-content:hover .locked-text {
      filter: blur(12px);
      opacity: 0.4;
    }
    .lock-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: background 0.4s;
    }
    .lock-overlay::before {
      content: '';
      position: absolute;
      inset: -10px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
      mask-composite: intersect;
      -webkit-mask-composite: source-in;
      z-index: -1;
      transition: background 0.4s;
    }
    .locked-content:hover .lock-overlay::before {
      background: rgba(255,255,255,0.05);
    }
    
    .animated-lock-container {
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
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .locked-content:hover .animated-lock-container {
      transform: scale(1.15) translateY(-4px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.9);
      background: rgba(255,255,255,0.85);
      color: #1b1b24;
    }
    
    .animated-lock {
      width: 24px;
      height: 24px;
      overflow: visible;
    }

    .animated-lock .lock-shackle {
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: 50% 100%;
    }
    .locked-content:hover .animated-lock .lock-shackle {
      transform: translateY(-3px) scaleY(1.1);
    }

    /* Checklist */
    .checklist-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .card-checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 15px;
      line-height: 1.4;
      color: rgba(0,0,0,0.8);
    }
    .card-checklist-item span.material-symbols-outlined {
      font-size: 18px;
      color: rgba(0,0,0,0.5);
      margin-top: 2px;
    }
    .card-checklist-item.done {
      color: rgba(0,0,0,0.4);
      text-decoration: line-through;
    }
    .card-checklist-item.done span.material-symbols-outlined {
      color: rgba(0,0,0,0.4);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .date {
      font-family: "Geist", sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #464555;
    }
    .actions {
      display: flex;
      gap: 2px;
      transition: opacity 0.2s;
      opacity: 0;
      pointer-events: none;
    }
    .card:hover .actions,
    .card:focus-within .actions {
      opacity: 1;
      pointer-events: auto;
    }
    @media (hover: none), (pointer: coarse) {
      .actions {
        opacity: 1;
        pointer-events: auto;
      }
    }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        background 0.15s,
        color 0.15s,
        transform 0.1s;
      color: #464555;
    }
    .action-btn:active {
      transform: scale(0.9);
    }
    .action-btn span {
      font-family: "Material Symbols Outlined";
      font-size: 17px;
    }
    .action-btn:hover.edit {
      color: #3525cd;
      background: rgba(53, 37, 205, 0.1);
    }
    .action-btn:hover.pin {
      color: #eab308;
      background: rgba(234, 179, 8, 0.1);
    }
    .action-btn:hover.delete {
      color: #ba1a1a;
      background: rgba(186, 26, 26, 0.1);
    }
    .action-btn:focus-visible {
      outline: 2px solid #3525cd;
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

    @media (max-width: 500px) {
      :host {
        width: 100%;
        max-width: 280px;
      }
      .card {
        max-width: 100%;
        min-height: 280px;
        padding: 24px;
      }
    }
  `;
