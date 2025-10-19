import { Type } from '@angular/core';

export default interface AppData {
  appIcon: string;
  appName: string;
  appId  : number;
  zIndex?: number;

  appContent: Type<any> | null;
}
