import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from
    '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    token: any
    constructor(
        private inj: Injector,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body) {
                        return event.clone({
                            body: event.body.body
                        });
                    }
                }
                return event;
            }),
            catchError(
                (error: HttpErrorResponse) => {
                  
                    return throwError(error)
                }
            ),
            finalize(() => {
            })
        );
    }
}