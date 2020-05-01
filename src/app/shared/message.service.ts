import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  constructor() { }

  send(message: string) {
      this.subject.next({ text: message });
  }

  clear() {
      this.subject.next();
  }

  get(): Observable<any> {
      return this.subject.asObservable();
  }

}
