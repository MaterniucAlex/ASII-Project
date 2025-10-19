import { Type } from '@angular/core';

export default interface AppData {
  appIcon: string;
  appName: string;
  appId  : number;
  zIndex?: number;
  display?: string;

  appContent: Type<any> | null;
}
