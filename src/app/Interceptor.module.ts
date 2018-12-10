import { Injectable, NgModule } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable } from "rxjs";
//import 'rxjs/add/operator/do'



@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const dupReq = req.clone({
            headers: req.headers.set('Access-Control-Allow-Origin','http://localhost.com') })

      return next.handle(dupReq);
    }
};
  @NgModule({
    providers:[ {
     provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true
    }]
  })

export class InterceptorModule {}