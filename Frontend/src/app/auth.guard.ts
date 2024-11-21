import { Injectable } from '@angular/core';
import { Component, ViewChild} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, RoutesRecognized, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { ServerService } from './server.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  version:any
  constructor(private router: Router, private servServ: ServerService
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  const sessionKey = localStorage.getItem('SessionKey');
  const data = {
    url: state.url,
    type: 'ROUTE',
    session_key : sessionKey,
    refresh_time:localStorage.getItem('refreshtime')
  };
  if (!localStorage.getItem('version')) {
    localStorage.setItem('version', '100');
  }
  this.version = localStorage.getItem('version')
  if (!localStorage.getItem('CurrDesignId') || localStorage.getItem('CurrDesignId')==undefined || localStorage.getItem('CurrDesignId') == null){
    this.router.navigate(['/login/design'])
  }
  return this.servServ.postData('url_permission_check/', data).pipe(
    map((res: any) => {
        
        if (res.body['bln_logout']) {
          localStorage.removeItem('Tokeniser');
          this.router.navigate(['/login/userlogin']);
        }
        if (!localStorage.getItem('CurrDesignId') || localStorage.getItem('CurrDesignId')==undefined || localStorage.getItem('CurrDesignId') == null){
            this.router.navigate(['/login/design'])
        }
        if(res.body.bln_pass == false){
          swal.fire({position:'center',
          icon:'warning',
          title: 'Warning!',
          text:'Please change your Password',
          customClass: {
                      confirmButton: "ConfirmBtn"
          }
          })
          this.router.navigate(['/pass/changeUserPass'])
        }
        
        else if (res.body.status) {          
          if (environment.production && (Number(this.version) !== Number(res.body['int_version']))) {
            swal.fire({
              title: "We're not ageist, but your old version is holding us back.",
              text: "Update to the latest version to see this site in all its glory.",
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                localStorage.setItem('version', res.body['int_version'])
                window.location.reload();
              }
            });
          }
          localStorage.setItem('group_permissions', JSON.stringify(res.body['permission']));
          return Boolean(res.body.status);
        } else {
          swal.fire({
            title: 'Failed',
            icon: 'error',
            text: 'Permission not assigned',
            confirmButtonText: 'OK'
          });
          localStorage.removeItem('Tokeniser');
          this.router.navigate(['/login/userlogin']);
          return false;
        }
        return true;
      
    })
  );

  
   
}


}
