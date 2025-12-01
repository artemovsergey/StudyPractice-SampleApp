import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  private _loading = signal<boolean>(false);

  get loading() {
    return this._loading;
  }

  busy() {
    this.busyRequestCount++;
    this._loading.set(true);
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this._loading.set(false);
    }
  }
}
