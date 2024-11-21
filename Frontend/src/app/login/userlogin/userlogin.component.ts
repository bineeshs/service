import { Component, OnInit,HostListener, ElementRef ,} from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  blnPaswrdShow=false;
  otpform = false
  intMobileNumber:any;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;
  blnResetPassword=false;
  myInput: any;
  isButtonVisible=false;
  blnForgot = false
  loginform = true;
  blnSendOtp = false

  constructor(private serviceObject: ServerService,
    private spinner: NgxSpinnerService,  
    private modalService: NgbModal,
    private router: Router,
    private elementRef: ElementRef,
    public formBuilder:FormBuilder,
    
    ) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
      
      const button = this.elementRef.nativeElement.querySelector('.login');
      const buttonScroll = this.elementRef.nativeElement.querySelector('.warn')
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (scrollTop > 600) {
        this.isButtonVisible = false;
  
        if(button !=undefined && button.classList){
          
          button.classList.add('scroll-hide');
        }
        
        if(buttonScroll !=undefined && buttonScroll.classList){
          buttonScroll.classList.remove('example-button-container-hide')
          buttonScroll.classList.add('example-button-container')
  
        }
  } else {
        this.isButtonVisible = true;
        if ((button != undefined && button.classList != undefined) &&  button.classList.contains('scroll-hide')){
          
          button.classList.remove('scroll-hide');
  
        }
        if((buttonScroll != undefined && buttonScroll.classList != undefined)){
          buttonScroll.classList.add('example-button-container-hide')
        }
  
      }
    }




  recoverform = false;
  loginData:any;
  showModal:any;
  roleModalService:any
  passwordContent = {existing_pass: '', new_pass: '', confirm_pass: ''}
  lstGroup=["CM","QC","CCE","FOC","SE","HOD","FCP"]
  blnExpiry = false;
  dctPswdType :any= {}
  str_otp="";
  intMob:any;
  bln_resend = 0
  showModalConfirmation:any;
  showModalOtp:any ;
  str_OTP_entered=null;
  timeLeft: number = 60;
  interval:any;
  bln_timer = false;
 
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  ngOnInit() {

  }

  
  onSubmit(openMail:any, lockKey:any) :void{    
    if (openMail.value !== '' && lockKey.value !== '') {
      this.loginData = {
        _UserId: openMail.value,
        _Password: lockKey.value,
      };
      this.spinner.show()
      this.serviceObject.getloginCheck('login/login/', this.loginData).subscribe(
          (response: any) => {
                    
            this.spinner.hide();
            if (response.body.status== 1) {
              
              const logCheck = response.body;              
                 
              localStorage.setItem('Tokeniser', logCheck['token']);
              localStorage.setItem('SessionKey',logCheck['str_session_key'])
              localStorage.setItem('Name', logCheck['userdetails']['Name']);
              localStorage.setItem('username',openMail.value );
              localStorage.setItem('Email', logCheck['userdetails']['email']);
              localStorage.setItem('group_permissions', JSON.stringify(logCheck['permission']));              
              localStorage.setItem('UserId', logCheck['userdetails']['int_user_id']);             
              localStorage.setItem('menuName','Master');
              
              
              if (localStorage.getItem('Tokeniser')!= null && localStorage.getItem('Tokeniser')!= undefined){  
                if (logCheck['userdetails']['bln_password'] == false){

                  localStorage.setItem('blnPass', logCheck['userdetails']['bln_password']);
                  this.router.navigate(['/pass/changeUserPass']);

                } 
                else{
                  localStorage.setItem('blnPass', logCheck['userdetails']['bln_password']);
                  this.router.navigate(['/service/followupservices']);
                  

                }                                             
              
              }

             
                
              if(logCheck['userdetails']['bln_expiry']){
  
              }


              
             
            }else if (response.body['status'] === 2){
              swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Not a privileged user',
              });
            }
             else if (response.body['status']==0) {
              swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Invalid username or password',
              });
            }
          },
          () => {
            this.spinner.hide();
          }
        );
    } else {
      swal.fire({
        title: 'Error',
        text: 'E-mail and password mandatory',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }


 

  startTimer() {

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      if (this.timeLeft == 0) {
        this.bln_timer = true
      }
    }, 1000)
  }


 
  ReSendOTP():void {
      let data = {
        userName:localStorage.getItem('username')
      }
      this.serviceObject
        .postData('user/generateotp/', {data})
        .subscribe(
          (response) => {
            if (response.body.status == 1) {
              this.str_OTP_entered = null
              this.bln_timer = false
              this.timeLeft = 60
              this.startTimer()
            }
            else {
              swal.fire({
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                title: 'error',
                text: 'Failed to Resent OTP'
              });
              return;
            }
          }
        );
    }
  
  VerifyOTP(pswdresetpopup:any):void {
      this.serviceObject
        // .postData('user/varifyotp/', {str_otp:this.str_OTP_entered})
        // .subscribe(
        //   (response) => {
        //     if (response.body.status == 1) {
            
              // this.showModalOtp.close();
              // bln=true;
              // this.getPswdType();
              // this.showModal = this.modalService.open(pswdresetpopup, { centered: true, size: 'lg' ,backdrop : 'static',keyboard : false,windowClass: 'pswdresetpopup' });
            // }
            // else {
            //   swal.fire({
            //     icon: 'error',
            //     showConfirmButton: false,
            //     timer: 2000,
            //     title: 'error',
            //     text: 'OTP validation failed'
            //   });
            //   return;
            // }
          }
        // );
  
    // }
    

  resetPswd():void{
    // alert('test')
    if(this.passwordContent['existing_pass'].length === 0) {
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Please enter the current password'
      });
      return;
    }
    if(this.passwordContent['existing_pass'] === this.passwordContent['new_pass'] ) {
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Please enter different password'
      });
      return;
    }
    if (!/(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/g.test(this.passwordContent['new_pass'])){
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Password must contain atleast one special Character.'
      });
      return;  
    }
    if (!/(?=.*[A-Z])/g.test(this.passwordContent['new_pass'])){
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Password must contain atleast one Uppercase Letter.'
      });
      return;
    }
    if (!/(?=.*[a-z])/g.test(this.passwordContent['new_pass'])){
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Password must contain atleast one Lowercase Letter.'
      });
      return;
    }
    if (!/(?=.*\d)/g.test(this.passwordContent['new_pass'])){
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Password must contain atleast one Number.'
      });
      return;      
    }
    if(this.passwordContent['new_pass'].length < this.dctPswdType['json_type']['MIN_LEN']) {
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Password strength is too short. Minimum length : '+this.dctPswdType['json_type']['MIN_LEN']
      });
      return ;
    }
    if(this.passwordContent['new_pass'] !== this.passwordContent['confirm_pass']) {
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'New password and confirm password does not match'
      });
      return ;
    } else {
      let data = {
        userName:localStorage.getItem('username'),
        oldPassword:this.passwordContent['existing_pass'],
        newPassword:this.passwordContent['new_pass']
      }
      
      this.serviceObject.postData("api/user/change_passward/",data).subscribe(
        (response) => {

          if (response.body.status== 1) {
            swal.fire({
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
              title: 'Success',
              text: 'Password updated successfully..!\nPlease login again.'
            });
            this.closePopup();
            localStorage.removeItem('Tokeniser');
            localStorage.removeItem('Name');
            localStorage.removeItem('Email');
            localStorage.removeItem('UserId');
            localStorage.removeItem('selectedIndex');
            localStorage.setItem('previousUrl','/login/userlogin');
            this.router.navigate(['/login/userlogin']);
            
          }
          if(response.body.status == 0) {
            swal.fire({
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
              title: 'Failed',
              text: response['message']
            });
          }
        },
        (error) => {
          swal.fire({
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
            title: 'Failed',
            text: error['message']
          });
        }
      );


    }      
  }
  getPswdType(){
    this.serviceObject.getData('api/user/get_pswd_type/').subscribe(
      (response)=>{
        if(response.data.status == 1){
          this.dctPswdType = response['data']
          
        }
      }
    );
  }

  closePopup(){
    this.showModalConfirmation.close();
  }

  openPswdResetPopup(pswdresetpopup:any) {
    this.getPswdType();
    this.showModalConfirmation = this.modalService.open(pswdresetpopup, { centered: true, size: 'lg' ,backdrop : 'static',keyboard : false,windowClass:'confirmpage'});
  }

  ngOnDestroy(){
    localStorage.setItem('previousUrl', '/login/userlogin');
    this.modalService.dismissAll()    
  }

  ForgotPassword(id:any){

    this.blnForgot = !this.blnForgot

  }

  SendOtp(openMail:any):void{
    
    if(openMail.value == undefined || openMail.value  == '' || openMail.value  == null){
      swal.fire('Warning','Enter Mobile Number','warning')
      return;
    }
  
    let dct_data = {
      "number":openMail.value 
    }
  
    this.spinner.show()
    this.serviceObject.postTableData('api/user/sendOtp/',dct_data).subscribe(res=>{
    this.spinner.hide()
    if(res.body.status==1){
      this.blnSendOtp = true

      this.intMobileNumber = openMail.value

    }else{
      swal.fire('Error',res.body.reason,'error')
    }
  
    },(error)=>{
      this.spinner.hide()
      swal.fire('Error',error.body.reason,'error')
    })
  
  }
  
  
  movefocus(id:any) {

    document.getElementById(id)?.focus();
   
    
    if(this.otp1 && this.otp2 && this.otp3 && this.otp4 && this.otp5 && this.otp6){
      this.spinner.show()
      
      let otp = this.otp1.toString() + this.otp2.toString() + this.otp3.toString() + this.otp4.toString() + this.otp5.toString() + this.otp6.toString()
      let dct_data = {
        "otp":otp,
        "number":this.intMobileNumber
      }
      this.spinner.show()
      this.serviceObject.postTableData('api/user/checkOtp/',dct_data).subscribe(res=>{
        this.spinner.hide()
  
        if(res.body.status==1){
            this.otpform = false
            this.blnResetPassword = true
  
        }else{
          swal.fire('Error',res.body.reason,'error')
  
        }
  
  
      },(error)=>{
        this.spinner.hide()
        swal.fire('Error',error.body.reason,'error')
  
      })
      
    }
  
   }

   OnRestPassword(openMail:any,lockKey:any){    
    if (openMail.value == null || openMail.value == undefined || openMail.value == '')
    {
      swal.fire('Warning','Enter Password','warning')
      return
    }
    if(lockKey.value == null || lockKey.value == undefined || lockKey.value == '')
    {
      swal.fire('Warning','Enter Confirm Password','warning')
      return;
    }
    if(openMail.value != lockKey.value){
      swal.fire('Warning','Confirm Password Mismatch','warning')
      return;
    }
  
    let dct_data = {
      password : openMail.value,
      confirmpassword : lockKey.value,
      number:this.intMobileNumber
    }
  
    this.spinner.show()
  
    this.serviceObject.postTableData('api/user/changepassword/',dct_data).subscribe(res=>{
  
    this.spinner.hide()
  
      if(res.body.status == 1){
  
        this.blnResetPassword = false
        this.blnForgot = false
        this.blnSendOtp = false
        this.blnForgot = false
        this.otp1=null
        this.otp2=null
        this.otp3=null
        this.otp4=null
        this.otp5=null
        this.otp6 =null
        this.intMobileNumber = null
        swal.fire('Success','Password Changed Succesfully','success')
      return;
  
      }else{
  
          swal.fire('Error',res.body.reason,'error')
      }
  
  
    },(error)=>{
      this.spinner.hide()
      swal.fire('Error',error.body.reason,'error')
    })
  
  }
  
}

