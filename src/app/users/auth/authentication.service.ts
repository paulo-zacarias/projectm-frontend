import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../user';
import { UserService } from '../user.service';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from '../../shared/message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl = environment.API_URL + '/users/auth';

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient, private userService: UserService, private messageService: MessageService) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  register(user: any) {
    // TO DO
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl, {username, password}, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    ).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.getLoggedUserInfo(data.user_id);
      },
      error => {
        this.messageService.send(error);
        console.log('HTTP Error:', error);
    },
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getLoggedUserInfo(id: number): void {
    this.userService.getUser(id)
    .subscribe((user: IUser) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  get isLoggedIn(): boolean {
    return (this.currentUserSubject.value !== null) ? true : false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
        if (error.status === 400) {
          console.error('Unable to log in with provided credentials.');
          return throwError ('Unable to log in with provided credentials.');
        } else {
          console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
        }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
