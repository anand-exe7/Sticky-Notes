import { css } from 'lit';

export const stickyNoteCardStyles = css`
    :host {
      display: block;
      position: relative;
      z-index: 1;
    }
    :host(:hover),
    :host(:focus-within) {
      z-index: 100;
    }
    * { touch-action: manipulation; }
    .card {
      width: 240px;
      min-height: 240px;
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
      0% { transform: translateX(-50%) translateY(-20px) scale(1.5) rotate(-45deg); opacity: 0; box-shadow: 4px 12px 10px rgba(0,0,0,0.2); }
      60% { transform: translateX(-50%) translateY(1px) scale(0.95) rotate(5deg); opacity: 1; box-shadow: 1px 1px 2px rgba(0,0,0,0.6); }
      100% { transform: translateX(-50%) translateY(0) scale(1) rotate(0deg); opacity: 1; }
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
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 14px;
      background: conic-gradient(
        from 0deg at 50% 50%,
        #9ca3af 0deg,
        #f3f4f6 45deg,
        #6b7280 90deg,
        #4b5563 135deg,
        #f3f4f6 180deg,
        #9ca3af 225deg,
        #4b5563 270deg,
        #f3f4f6 315deg,
        #9ca3af 360deg
      );
      border-radius: 50%;
      border: 0.5px solid rgba(0,0,0,0.2);
      box-shadow: 
        1px 2px 3px rgba(0,0,0,0.4),
        inset 0 0 2px rgba(255,255,255,0.8);
      z-index: 20;
      animation: pinDrop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
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
      word-break: break-word;
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
  `;
