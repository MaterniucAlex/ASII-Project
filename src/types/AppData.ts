import { Type } from '@angular/core';
import { Injectable, signal } from '@angular/core';
export default interface AppData {
  appIcon: string;
  appName: string;
  appId  : number;
  zIndex?: number;
  display?: string;
// PROPRIETĂȚI NOI PENTRU NOTEPAD / FILE EXPLORER:
  fileContent?: string;
  fileName?: string;
  fileId?: string; // ID-ul din MongoDB al fișierului deschis
  appContent: Type<any> | null;
}
