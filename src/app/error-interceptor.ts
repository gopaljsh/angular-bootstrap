import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthServiceComponent } from './auth/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  bsModalRef: BsModalRef;

  constructor(private authService: AuthServiceComponent, private modalService: BsModalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'A unknown error occured';
        if (error) {
          errorMsg = error.error.message;
        }
        const initialState = {
          list: [
            errorMsg
          ]
        };
        this.bsModalRef = this.modalService.show(ErrorComponent, {initialState});
        return throwError(error);
      })
    );
  }
}
