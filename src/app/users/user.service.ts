import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { IUser } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.API_URL + '/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.usersUrl + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addUser(user: any): Observable<IUser> {
    return this.http.post<IUser>(this.usersUrl, user, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.usersUrl + id, user, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(this.usersUrl + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
