import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NavigationComponent } from 'src/app/shared/header-navigation/navigation.component';

@Component({
  selector: 'app-change-user-pass',
  templateUrl: './change-user-pass.component.html',
  styleUrls: ['./change-user-pass.component.css']
})
export class ChangeUserPassComponent implements OnInit {
  passwordContent = {password: '', new_pass: '', confirm_pass: ''}
  previousPage = localStorage.getItem('previousUrl')
  blnshow: boolean=false;

  blnPass:any


  constructor(
    private router: Router,
    private serverService: ServerService,
    private navcomponent:NavigationComponent
  
  ) { }
  
  dctPswdType:any={}

  blnPaswrdShowOld:boolean=false;
  blnPaswrdShowNew1:boolean=false;
  blnPaswrdShowNew2:boolean=false;

  ngOnInit() : void { 
    this.blnPass = localStorage.getItem('blnPass')
    // console.log(this.blnPass);
    if(this.blnPass == 'false'){
      swal.fire({position:'center',
      icon:'warning',
      title: 'Warning!',
      text:'Please change your Password',
      customClass: {
        confirmButton: "ConfirmBtn"
      }
    })
    return
    }
    
  }


  SaveUserPassword():void{

    if(this.passwordContent['password'].length === 0) {
      swal.fire({
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        title: 'error',
        text: 'Please enter the current password'
      });
      return 
    }

    {
      let data = {
        userName:localStorage.getItem('username'),
        oldPassword:this.passwordContent['password'],
        DROPDOWN:true
        
      }

      this.serverService.postData("api/user/changeUserpassword/",data).subscribe(
        (response) => {

          if (response.body.status == 1) {

           
            
            this.blnshow=true
            
          }
          if(response.body.status == 0) {
            swal.fire({
              icon: 'warning',
              showConfirmButton: false,
              timer: 2000,
              title: 'Incorrect Password!',
              text: response.body.message
              
            });
          }
        },
        // (error) => {
        //   swal.fire({
        //     icon: 'error',
        //     showConfirmButton: false,
        //     timer: 2000,
        //     title: 'Failed',
        //     text: error.body.message
        //   });
        // }
      );


    }
  }


  

  updateUserPassword(openMail:any,lockKey:any){    
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

    if(this.passwordContent['password'] === openMail.value ) {
      swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        title: 'Warning',
        text: 'Please enter different password'
      });
      return;
    }
    if(openMail.value.length < this.dctPswdType['MIN_LEN']) {
      swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        title: 'Warning',
        text: 'Password strength is too short. Minimum length : '+this.dctPswdType['MIN_LEN']
      });
      return;
    }
    if(!/(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/g.test(openMail.value)) {
      swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        title: 'Warning',
        text: 'Password must contain atleast one Special Character.'
      });
      return;
    }
    if(!/(?=.*[A-Z])/g.test(openMail.value)) {
      swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        title: 'Warning',
        text: 'Password must contain atleast one Uppercase Letter.'
      });
      return;
    }
    if(!/(?=.*[a-z])/g.test(openMail.value)) {
      swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        title: 'Warning',
        text: 'Password must contain atleast one Lowercase Letter.'
      });
      return; 
    }
    if(!/(?=.*\d)/g.test(openMail.value)) {
      swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        timer: 2000,
        title: 'Warning',
        text: 'Password must contain atleast one Number.'
      });
      return; 
    }
   
   if(openMail.value != lockKey.value){
    swal.fire({
      icon: 'warning',
      showConfirmButton: false,
      timer: 2000,
      title: 'Warning',
      text: 'Confirm Password Mismatch.'
    });
    return; 
      
    }
  
    let dct_data = {
      password : openMail.value,
      confirmpassword : lockKey.value,
      blnPass:this.blnPass,
      
    }
  
   this.serverService.postData('api/user/get_pswd/',dct_data).subscribe(res=>{
  
    if(res.body.status == 1){
  
      
        swal.fire('Success','Password Changed Succesfully','success')
        this.navcomponent.onLoggedout()
        this.router.navigate(['/login/userlogin']);
         
      }else{
  
          swal.fire('Error',res.body.reason,'error')
      }
  
  
     }
    // ,(error)=>{
      
    //   swal.fire('Error',error.body.reason,'error')
    // }
    )
  
  }
}

