import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "../_services/api.service";

@Injectable()

export class CsrfInterceptor implements HttpInterceptor {
    constructor(private api: ApiService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
            const csrfToken = this.api.getCSRFToken();
            if (csrfToken) {
                const clonedReq = req.clone({
                    withCredentials: true, // Important to send cookies with the request
                    headers: req.headers.set('X-CSRF-TOKEN', csrfToken)
                });
                console.log('CSRF Token successfully attached to request.')
                return next.handle(clonedReq);
            }
            console.log('No CSRF Token available.');
        }
        return next.handle(req);

    }
}