import { Component, OnInit,ViewChild , ViewChildren } from '@angular/core';
import { ServerService } from '../../server.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment' ; 
import { debounceTime } from 'rxjs/operators'; 
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  form!: FormGroup;
  datTo:any;
 
  lstService:any=[];
  vchr_name:any;
  intPhone:any;
  strRemarks:any
  dblAmount:any ;
  dblServChange: any
  strReffNum:any
  dblPaidAmount:any
  dblTotalAmount:any ;


  searchLocation: FormControl = new FormControl();
  lstlocation:any = []
  selectedLocation: any= []

  ServiceConfig = {displayKey:"vchr_name",search:true , height: '200px',customComparator: ()=>{} ,placeholder:'Service',searchOnKey: 'vchr_name',clearOnSelection: true }
  lstSelectedService: any=[];
  ServiceOptions:any[]= [];

  StatusConfig = {displayKey:"vchr_name",search:true , height: '200px',customComparator: ()=>{} ,placeholder:'Status',searchOnKey: 'vchr_name',clearOnSelection: true }
  lstSelectedStatus: any=[];
  StatusOptions:any = [];

  intLocationId: any;
  lstServiceTypes: any;
  blnCashSale = true;
  Strmsg: any;
  dblvalidation = false;
  bln_admin = false;
  constructor(
    private serviceObject: ServerService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    let ToDate = new Date()  
    this.datTo = ToDate   
    
    this.serviceChart()
    this.StatusTypes()

    this.form = this.fb.group({
      intPhone: ['', Validators.required],
      vchr_name: ['', Validators.required], 
      ser_charge: ['', Validators.required],
      });
    
    

    this.searchLocation.valueChanges.pipe(
      debounceTime(400))
      .subscribe((strData: string) => {

        if (strData === undefined || strData === null || strData === '') {
          this.lstlocation = [];
          this.intLocationId = null;
        } else {
          if (strData.length >= 2) {         
            
            this.serviceObject
              .putData('service_url/location/', { strData: strData })
              .subscribe(
                (response) => {
                  let list = response.body['data'];
                  this.lstlocation = list                 
                }
              );
          }
        }
      }
      );
  }

  serviceChart(){
    this.serviceObject.getData('service_url/servicetypes/').subscribe((response) => {      
      this.ServiceOptions = response.body['service']; 
      this.bln_admin = response.body['bln_admin'];                
    });
  }


  StatusTypes(){
    this.serviceObject.getData('service_url/statustypes/').subscribe((response) => {      
      this.StatusOptions = response.body['data'];                 
    });
  }


  ServiceTypeChange(){
    console.log(this.lstSelectedService,'data');

    if (this.lstSelectedService['int_sales_type'] == 0){
      this.blnCashSale = true     
    }
    else{
      this.blnCashSale = false     
    }
    
  }
  LocationChanged(item:any){
    this.intLocationId = item.pk_bint_id  
  }

  AmountChange(){
    if (!this.dblAmount){      
      this.dblTotalAmount = 0 + Number(this.dblServChange)
    }

    else if (!this.dblServChange){
      0
      this.dblTotalAmount = Number(this.dblAmount) + 0
    }

    else {
      this.dblTotalAmount = Number(this.dblAmount) + Number(this.dblServChange)
    }
    
  }


  DataValidation(){  
    
      this.dblvalidation = true    
      if(this.lstSelectedService.length == 0){
        swal.fire('Warning!','Please select the  service type!', 'warning');
        this.dblvalidation = false
        return;
      }
      
      if (!this.blnCashSale){
        if (this.vchr_name == null || this.vchr_name == undefined || this.vchr_name == ''){
          swal.fire('Warning!','Please enter the  customer name!', 'warning');
          this.dblvalidation = false
          return;
        }

        if (this.intPhone == null || this.intPhone == undefined || this.intPhone == ''|| this.intPhone.toString().length < 10 || this.intPhone.toString().length >=12){
          swal.fire('Warning!','Please enter the valid customer number!', 'warning');
          this.dblvalidation = false
          return;
        }

        if (this.intLocationId == null || this.intLocationId == undefined || this.intLocationId == ''){
          swal.fire('Warning!','Please enter the customer location!', 'warning');
          this.dblvalidation = false
          return;
        }
      }

      if (this.dblServChange == null || this.dblServChange == undefined || this.dblServChange == ''){
        swal.fire('Warning!','Please enter the service charge!', 'warning');
        this.dblvalidation = false
        return;
      }

      if(this.lstSelectedStatus.length == 0){
        swal.fire('Warning!','Please select the  status!', 'warning');
        this.dblvalidation = false
        return;
      }     
      
      if(this.lstSelectedStatus['vchr_status_code'] == 'COMPLETED AND PAID'){        
        if (!this.dblPaidAmount || this.dblTotalAmount > this.dblPaidAmount){
          swal.fire('Warning!','Please pay the full amount!', 'warning');
          this.dblvalidation = false
          return;
        }        
      }


 

    if (!this.dblAmount){
      this.dblAmount = 0
      this.dblvalidation = true
    }
    if (!this.dblPaidAmount){
      this.dblAmount = 0
      this.dblvalidation = true
    }

  }

  
  SaveData(){
    
    this.DataValidation()
    if (this.dblvalidation){ 
      
         
      let dctData:any = {}
      dctData['date'] = this.datTo
      dctData['intServiceTypeId'] = this.lstSelectedService['pk_bint_id'] 
      dctData['strCustomerName'] = this.vchr_name
      dctData['intCustomerNum'] = this.intPhone
      dctData['intLocationId'] = this.intLocationId
      dctData['strRemarks'] = this.strRemarks

      dctData['dblAmount'] = this.dblAmount
      dctData['dblServCharge'] = this.dblServChange
      dctData['dblPaidAmount'] = this.dblPaidAmount
      dctData['intStatusId'] = this.lstSelectedStatus['pk_bint_id']
      dctData['dblTotalAmount'] = this.dblTotalAmount
      dctData['strReffNum'] = this.strReffNum

      this.spinner.show()
      this.serviceObject.postData('service_url/saveservice/', dctData).subscribe((res) => {  
        this.spinner.show()
        if (res.body['status'] == 1) {          
          this.Strmsg = res.body['data'];
          this.router.navigate(['/service/followupservices']);
          swal.fire('Success!',this.Strmsg, 'success');
        }  
        else{
          this.Strmsg = res.body['e'];
          swal.fire('Error!','Error', 'error');
        }
                        
      });
    }  

  }

  ClearData(){
    console.log('clearr');
    this.spinner.show()
    this.datTo= new Date() 
    this.lstService = [];
    this.vchr_name= null;
    this.intPhone = null;
    this.strRemarks = null
    this.dblAmount= null ;
    this.dblServChange= null
    this.strReffNum= null
    this.dblPaidAmount = null
    this.dblTotalAmount = null
    this.lstSelectedStatus = null;
    this.lstSelectedService = null;
    this.selectedLocation= null
    this.spinner.hide()
  }
  

}
