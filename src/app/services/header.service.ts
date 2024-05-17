import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private _shrunk = new BehaviorSubject<boolean>(false);
  
  setShrunk(value: boolean): void {
    this._shrunk.next(value);
  }

  get shrunk() {
    return this._shrunk.asObservable();
  }
}
