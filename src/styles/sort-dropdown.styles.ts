import { css } from 'lit';

export const sortDropdownStyles = css`
    :host {
      display: block;
      position: relative;
      font-family: 'Geist', sans-serif;
    }
    .trigger {
      background: #f5f2ff;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Geist', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #1b1b24;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      transform: rotate(-1deg);
      transition: transform 0.2s;
      white-space: nowrap;
    }
    .trigger:hover {
      transform: rotate(-1deg) scale(1.03);
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
      font-size: 16px;
      color: #464555;
    }
    .chevron {
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
      font-size: 16px;
      color: #464555;
      transition: transform 0.2s;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: #fcf8ff;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.16);
      overflow: hidden;
      min-width: 180px;
      z-index: 100;
      animation: slideDown 0.15s ease;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .menu-item {
      padding: 10px 16px;
      font-size: 13px;
      font-family: 'Geist', sans-serif;
      color: #464555;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.1s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }
    .menu-item:hover {
      background: #f0ecf9;
    }
    .menu-item.selected {
      color: #3525cd;
      font-weight: 600;
    }
    .check {
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
      font-size: 16px;
      color: #3525cd;
      visibility: hidden;
    }
    .menu-item.selected .check {
      visibility: visible;
    }
  `;
