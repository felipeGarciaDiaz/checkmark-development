import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "../_services/api.service";

@Injectable()

export class CsrfInterceptor implements HttpInterceptor {
    constructor (private api: ApiService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const csrfToken = this.api.getCSRFToken();
        if (csrfToken) {
            const cloner = req.clone({
                headers: req.headers.set('X-CSRF-TOKEN', csrfToken)
            });
            console.log('CSRF Token successfully attached to request.')
            return next.handle(cloner);
        }

        // Add a return statement here
        return next.handle(req);
    }
}