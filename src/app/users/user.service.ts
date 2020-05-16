import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { httpOptions, handleError } from '../shared/http-common';

import { IUser, IProfile } from './user';

const httpOptionsFile = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.API_URL + '/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.usersUrl + '/' + id)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  createUser(user: any): Observable<IUser> {
    return this.http.post<IUser>(this.usersUrl + '/register', user, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateUser(id: number, user: IUser): Observable<IUser> {
    return this.http.put<IUser>( this.usersUrl + '/' + id + '/update', user, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(this.usersUrl + '/' + id + '/delete')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateUserPassword(oldPassword: string, newPassword): Observable<IUser> {
    const password = {
      old_password: oldPassword,
      new_password: newPassword
    };

    return this.http.put<any>(this.usersUrl + '/new-password', password, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getProjectParticipants(projectId: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl + '?project_id=' + projectId)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  uploadUserProfilePiture(profileId: number, file: any): Observable<IProfile> {
    const form = new FormData();
    form.append('image', file, file.name);
    return this.http.patch<IProfile>(this.usersUrl + '/profile/' + profileId + '/picture-upload', form, httpOptionsFile)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

}
