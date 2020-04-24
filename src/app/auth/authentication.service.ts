import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl = 'http://127.0.0.1:8000/users/auth';
  private usersUrl = 'http://127.0.0.1:8000/users/';


  currentUser = {};

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  register(user: any) {
    // TO DO
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl, {username, password}, httpOptions).subscribe( data => {
      console.log(data);
      console.log(data.user_id);
      localStorage.setItem('token', data.token);
      this.getUser(data.user_id).subscribe(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
    });
  }

  logout() {
    this.currentUser = {};
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(this.usersUrl + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return (token !== null) ? true : false;
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
