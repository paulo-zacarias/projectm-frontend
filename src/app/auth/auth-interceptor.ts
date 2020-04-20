import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

        const authToken = '603f8d8a4445f3b34991a353d482302cd606b71f';

        request = request.clone({
            setHeaders: {
                Authorization: 'Token ' + authToken
            }
        });

        return next.handle(request);
  }
}
