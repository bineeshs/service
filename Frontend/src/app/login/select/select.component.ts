import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements OnInit {
  lstDesignation :any
  @ViewChild('showDesList') showDesList: any;
  designOptions : { pk_bint_id:number,vchr_name: string}[] = [];
  designConfig = {displayKey:"design_name",search:true , height: '200px',customComparator: ()=>{} ,placeholder:'Designations',searchOnKey: 'design_name',clearOnSelection: true  }
  constructor(
    private serviceObject: ServerService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    localStorage.setItem('previousUrl', '/login/design');
    if(!localStorage.getItem('CurrDesignId') || localStorage.getItem('CurrDesignId')==null || !localStorage.getItem('CurrDesignId')==undefined){
      this.GetData();
    }
    else{
      this.router.navigateByUrl('/user/list-user');
    }
  }

  GetData(){
    this.serviceObject.getData('api/designation/get-design/').subscribe(
      result => {
        
        if (result.body.status == 1 && result.body.data.length>1) {
          this.designOptions = result.body.data;
          this.showRolePopup(this.showDesList);
        } 
        else if (result.body.status==1 && result.body.data.length==1){
          this.lstDesignation = result.body.data[0]
          this.savepopup()
        }
        else if (result.body.status==0){
          swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:'Error',
            customClass: {
              confirmButton: "WarningBtn"
            }
          })
          return
        }
      },
      error => {
        swal.fire('Error!', 'Something went wrong!!', 'error');
      }
    );
  }

  showRolePopup(showDesList:any){
    this.modalService.open(showDesList,{ centered: true, size: 'lg' , keyboard: false ,backdrop:false ,windowClass: 'unit-class'});
  }

  savepopup(){
    if(this.lstDesignation.length == 0){
      swal.fire({
        position:'center',
        title:'Warning!',
        icon:'warning',
        text:'Select Designation',
        customClass: {
          confirmButton: "WarningBtn"
        }
      })
      return
    }
    localStorage.setItem('CurrDesignId',JSON.stringify(this.lstDesignation['pk_bint_id']))
    localStorage.setItem('CurrDesignName',this.lstDesignation['vchr_name'])
    let dctData = {
      intDesignId:this.lstDesignation['pk_bint_id']
    }

    this.serviceObject.postData('api/designation/get-design/',dctData).subscribe(
      result => {
        if (result.body.status == 1) {
          this.modalService.dismissAll()
          this.router.navigateByUrl('/user/list-user');
        }
        else{
          swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:'Error',
            customClass: {
              confirmButton: "WarningBtn"
            }
          })
          return
        }
      },
      error => {
        swal.fire('Error!', 'Something went wrong!!', 'error');
      }
    );
   
  }
  ngOnDestroy(){
    localStorage.setItem('previousUrl', '/login/design');
    this.modalService.dismissAll()
    
  }
}
