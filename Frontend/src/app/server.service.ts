import { Injectable,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse  } from '@angular/common/http';
import { environment } from '../environments/environment';
import { HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map,catchError } from 'rxjs/operators';
import { Observable ,of,BehaviorSubject} from 'rxjs';
import { NavigationComponent } from './shared/header-navigation/navigation.component';

@Injectable()
export class ServerService {
    url_company: string;
    public token : string | undefined;
    audio1 = new Audio('assets/audio/notification_tone.mp3');
    // private notificationDataChange = new Subject<any>();
    // notificationData = this.notificationDataChange.asObservable();





    hostAddress = 'http://192.168.1.118:8005/'
    // hostAddress = "http://192.168.1.30:8000/"

    nodeAddress = 'http://192.168.1.118:8005/'

    protocol = window.location.protocol;
    hostname = window.location.hostname;
    port = environment.production ? 6088 : 8000;
    public url = 'http://192.168.1.118:8005/'; //live

    constructor(private http: HttpClient, private router : Router,private navcomponent:NavigationComponent ) {
        this.url_company = this.hostAddress + 'user/get_company_list/';
    }



 


    getloginCheck(url:any, data:any) {
      const header = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.hostAddress + url, data, { headers: header, observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError((error: HttpErrorResponse): Observable<any> => {
          
          if (error.status == 401){
            this.router.navigateByUrl('/login/userlogin')
          }
          if (error.status == 403){
            this.router.navigateByUrl('/login/userlogin')
            this.navcomponent.onLoggedout()
            Swal.fire({
              position:'center',
              title:'Session expired',
              icon:'error',
            })
          }
          if (error.status == 429){
            Swal.fire({
              position:'center',
              title:'Error',
              icon:'error',
              text:error.error.detail,
            })
          }
          return of(null);

        })
      );
    }
  
    postFormData(url: string, data: FormData): Observable<any> {
      const token = localStorage.getItem("Tokeniser");
      const headers = new HttpHeaders({ Authorization: "JWT " + token });
      const options = { headers: headers };
      return this.http.post(this.hostAddress + url, data, { headers: headers, observe: 'response' })
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((error: HttpErrorResponse): Observable<any> => {
            
            if (error.status == 401){
              this.router.navigateByUrl('/login/userlogin')
            }
            if (error.status == 403){
              this.router.navigateByUrl('/login/userlogin')
              this.navcomponent.onLoggedout()
              Swal.fire({
                position:'center',
                title:'Session expired',
                icon:'error',
                // text:error.error,
              })
            }
            if (error.status == 429){
              Swal.fire({
                position:'center',
                title:'Error',
                icon:'error',
                text:error.error.detail,
              })
            }
            return of(null);
  
          })
        );
    }

    postData(url: any, data: any): Observable<any> {
      const token = localStorage.getItem('Tokeniser');
      const header = new HttpHeaders({ Authorization: 'JWT ' + token });
      return this.http.post(this.hostAddress + url, data, { headers: header, observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError((error: HttpErrorResponse): Observable<any> => {
          
          if (error.status == 401){
            this.router.navigateByUrl('/login/userlogin')
          }
          if (error.status == 403){
            this.router.navigateByUrl('/login/userlogin')
            this.navcomponent.onLoggedout()
            Swal.fire({
              position:'center',
              title:'Session expired',
              icon:'error',
              // text:error.error,
            })
          }
          if (error.status == 429){
            Swal.fire({
              position:'center',
              title:'Error',
              icon:'error',
              text:error.error.detail,
            })
          }
          return of(null);

        })
      );
    }


    postTableData(url: any, data: any): Observable<any> {
      return this.http.post(this.hostAddress + url, data, { observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError((error: HttpErrorResponse): Observable<any> => {
          
          if (error.status == 401){
            this.router.navigateByUrl('/login/userlogin')
          }
          if (error.status == 403){
            this.router.navigateByUrl('/login/userlogin')
            this.navcomponent.onLoggedout()
            Swal.fire({
              position:'center',
              title:'Error',
              icon:'error',
              // text:error.error,
            })
          }
          if (error.status == 429){
            Swal.fire({
              position:'center',
              title:'Error',
              icon:'error',
              text:error.error.detail,
            })
          }
          return of(null);

        })
      );
    }

    getData(url:any, params = ""):Observable<any> {
      const token = localStorage.getItem('Tokeniser');
      const header = new HttpHeaders({ Authorization: 'JWT ' + token });      
      return this.http.get(this.hostAddress + url, { headers: header,observe:'response' }).pipe(
          map((response: HttpResponse<any>) => {
          const data = response;
          return data;
        }),
        catchError((error: HttpErrorResponse): Observable<any> => {
          
          if (error.status == 401){
            this.router.navigateByUrl('/login/userlogin')
          }
          if (error.status == 403){
            this.router.navigateByUrl('/login/userlogin')
            this.navcomponent.onLoggedout()
            Swal.fire({
              position:'center',
              title:'Session expired',
              icon:'error',
              // text:error.error,
            })
          }
          if (error.status == 429){
            Swal.fire({
              position:'center',
              title:'Error',
              icon:'error',
              text:error.error.detail,
            })
          }
          return of(null);

        })
      )
    }

    putData(url:any, data:any):Observable<any> {
        const token = localStorage.getItem("Tokeniser");
        const header = new HttpHeaders({ Authorization: "JWT " + token });
        return this.http.put(this.hostAddress + url, data, { headers: header,observe:'response'}).pipe(
          map((response: HttpResponse<any>) => {
            return response;
          }),
          catchError((error: HttpErrorResponse): Observable<any> => {
            
            if (error.status == 401){
              this.router.navigateByUrl('/login/userlogin')
            }
            if (error.status == 403){
              this.router.navigateByUrl('/login/userlogin')
              this.navcomponent.onLoggedout()
              Swal.fire({
                position:'center',
                title:'Session expired',
                icon:'error',
                // text:error.error,
              })
            }
            if (error.status == 429){
              Swal.fire({
                position:'center',
                title:'Error',
                icon:'error',
                text:error.error.detail,
              })
            }
            return of(null);
  
          })
        )
    }
    putFormData(url:any, data:any):Observable<any> {
      const token = localStorage.getItem("Tokeniser");
      const headers = new HttpHeaders({ Authorization: "JWT " + token });
      return this.http.put(this.hostAddress + url, data, { headers: headers, observe: 'response' })
        .pipe(
          map((response: any) => {
            return response;
          }), 
          catchError((error: HttpErrorResponse): Observable<any> => {
            
            if (error.status == 401){
              this.router.navigateByUrl('/login/userlogin')
            }
            if (error.status == 403){
              this.router.navigateByUrl('/login/userlogin')
              this.navcomponent.onLoggedout()
              Swal.fire({
                position:'center',
                title:'Session expired',
                icon:'error',
                // text:error.error,
              })
            }
            if (error.status == 429){
              Swal.fire({
                position:'center',
                title:'Error',
                icon:'error',
                text:error.error.detail,
              })
            }
            return of(null);
  
          })
        );
    }
    patchData(url:any, data:any):Observable<any> {
      const token = localStorage.getItem("Tokeniser");
      const header = new HttpHeaders({ Authorization: "JWT " + token });
      return this.http
        .patch(this.hostAddress + url, data, { headers: header, observe: 'response'}).pipe(
        map((response: HttpResponse<any>) => {
          const data = response;
          return data;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {        
        if (error.status == 401){
          this.router.navigateByUrl('/login/userlogin')
        }
        if (error.status == 403){
          this.router.navigateByUrl('/login/userlogin')
          this.navcomponent.onLoggedout()
          Swal.fire({
            position:'center',
            title:'Session expired',
            icon:'error',
            // text:error.error,
          })
        }
        if (error.status == 429){
          Swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:error.error.detail,
          })
        }
        return of(null);
      })
      )
    }

    deleteData(url:any, data:any):Observable<any> {
      const token = localStorage.getItem("Tokeniser");
      const header = new HttpHeaders({ Authorization: "JWT " + token });
      return this.http
        .patch(this.hostAddress + url, data, { headers: header, observe: 'response'}).pipe(
        map((response: HttpResponse<any>) => {
          const data = response;
          return data;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {        
        if (error.status == 401){
          this.router.navigateByUrl('/login/userlogin')
        }
        if (error.status == 403){
          this.router.navigateByUrl('/login/userlogin')
          this.navcomponent.onLoggedout()
          Swal.fire({
            position:'center',
            title:'Session expired',
            icon:'error',
            // text:error.error,
          })
        }
        if (error.status == 429){
          Swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:error.error.detail,
          })
        }
        return of(null);
      })
      )
    }

}