import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../user';
import { UserService } from '../user.service';

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

  // currentUser: IUser;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  register(user: any) {
    // TO DO
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl, {username, password}, httpOptions).subscribe( data => {
      localStorage.setItem('token', data.token);
      this.getLoggedUser(data.user_id);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getLoggedUser(id: number) {
    this.userService.getUser(id)
    .subscribe((user: IUser) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  get isLoggedIn(): boolean {
    return (this.currentUserSubject.value !== null) ? true : false;
  }


}
