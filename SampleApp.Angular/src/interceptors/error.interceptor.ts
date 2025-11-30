import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router = inject(Router);
  const matSnackBar = inject(MatSnackBar);
   
  return next(req).pipe(
    catchError(e => {
      if(e){
        console.log(e)
        switch(e.status){
          case 400:
            if(e.error.errors){
              const modalStateErrors = [];
              for(const key in e.error.errors){
                if(e.error.errors[key]){
                  modalStateErrors.push(e.error.errors[key])
                }
              }

              matSnackBar.open(modalStateErrors.flat().toString(), '', { duration: 3000 });
              throw modalStateErrors.flat();
            } 
            else{
              matSnackBar.open(e.statusText + ": " + e.error.message, '', { duration: 3000 });
            }
            break;

          case 401:
            matSnackBar.open(e.statusText, '', { duration: 3000 });
            break;
          case 404:
            matSnackBar.open(e.statusText, '', { duration: 3000 });
            router.navigate(["/not-found"]);
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: e.error}}
            matSnackBar.open(e.statusText, '', { duration: 3000 });
            router.navigateByUrl('/error-server', navigationExtras);
            break;    
          default:
            matSnackBar.open("Произошла непредвиденная ошибка", '', { duration: 3000 });
            console.log(e);
            break;
        }
      }
      return throwError(() => e)
    })
  );
};