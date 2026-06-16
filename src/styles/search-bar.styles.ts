import { css } from 'lit';

export const searchBarStyles = css`
    :host {
      display: block;
    }
    .wrapper {
      position: relative;
      background: #f5f2ff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      transform: rotate(1deg);
      width: 256px;
    }
    .tape {
      position: absolute;
      width: 80px;
      height: 22px;
      background: rgba(255,255,255,0.4);
      top: -11px;
      left: 50%;
      transform: translateX(-50%) rotate(-2deg);
      border-left: 2px dashed rgba(0,0,0,0.06);
      border-right: 2px dashed rgba(0,0,0,0.06);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      backdrop-filter: blur(2px);
      z-index: 1;
    }
    .icon {
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
      font-size: 18px;
      color: #464555;
      user-select: none;
      flex-shrink: 0;
    }
    input {
      background: transparent;
      border: none;
      outline: none;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      color: #1b1b24;
      width: 100%;
    }
    input::placeholder {
      color: rgba(70,69,85,0.5);
    }
  `;
