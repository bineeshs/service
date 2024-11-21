import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServerService } from '../../server.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
// import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-up-service',
  templateUrl: './follow-up-service.component.html',
  styleUrls: ['./follow-up-service.component.css']
})
export class FollowUpServiceComponent implements OnInit {

  companyId = Number(localStorage.getItem("companyId"));


 



  blnDataResponse = true;
  validationStatus: any = true;
  popUp: any;
  datFrom:any
  datTo:any

  StatusConfig = {displayKey:"vchr_name",search:true , height: '200px',customComparator: ()=>{} ,placeholder:'Status',searchOnKey: 'vchr_name',clearOnSelection: true }
  lstSelectedStatus: any=[];
  StatusOptions:any = [];
  selectedStatus: any=[];


  ServiceConfig = {displayKey:"vchr_name",search:true , height: '200px',customComparator: ()=>{} ,placeholder:'Service',searchOnKey: 'vchr_name',clearOnSelection: true  }
  lstServiceOption:any = []
  lstService:any =  []

  StatusConfigflt = {displayKey:"vchr_name",search:true , height: '200px',customComparator: ()=>{} ,placeholder:'Status',searchOnKey: 'vchr_name',clearOnSelection: true  }
  lstStatusOption:any = []
  lstStatus: any = [];

  TotalAmount:any = 0;
  PaidAmount:any = 0;
  lstDetails: any = [];
  masterId: any;
  selectedStatusId: any;
  total_dbl_paid_amt: any;
  statusId: any;
  lstData:any[] =[];
  StrMsg: any;
  StrErrMsg: any;

  constructor(private serviceObject: ServerService,
    private fb: FormBuilder,
    public router: Router,
    private spinnerService: NgxSpinnerService,
    private modalService: NgbModal
    
  ) { }
  

  userListJsonData = [];
  displayedColumns = ['SLNO',
    "Service",
    "Date",
    "Age",
    "Amount",
    "Service_charge",
    "Total",
    "Status",
    "action"
  ];
  dataSource:any = new MatTableDataSource;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  ngOnInit(): void {
    let ToDate = new Date()
    let FromDate = new Date()

    this.datTo = ToDate
    this.datFrom = FromDate
    this.serviceChart()
    this.FilterStatusTypes()
    this.funcGetServiceList();  
  
  }

  serviceChart(){
    this.serviceObject.getData('service_url/servicetypes/').subscribe((response) => {      
      this.lstServiceOption = response.body['service'];                 
    });
  }

  FilterStatusTypes(){
    this.serviceObject.getData('service_url/statustypes/').subscribe((response) => {      
      this.lstStatusOption = response.body['status_data'];                 
    });
  }



  funcGetServiceList() {
    let dctData:any = {};
    dctData['datFrom'] = this.datFrom;
    dctData['datTo'] = this.datTo;
    dctData['service'] = this.lstService.map((ele:any)=>ele.pk_bint_id)
    dctData['status'] = this.lstStatus.map((ele:any)=>ele.pk_bint_id)

    this.spinnerService.show()
    this.serviceObject.postData('service_url/listservice/',dctData).subscribe(
      result => {
        this.spinnerService.hide()
        if(result.body.status==1) {
          this.lstData = result.body.data;
         
          this.dataSource = new MatTableDataSource(this.lstData);          
          this.dataSource.paginator = this.paginator;

          // this.dataSource.paginator.firstPage();
          this.dataSource.sort = this.sort;
          
          
        }
      },
      error => {
        this.spinnerService.hide()
        this.blnDataResponse = false;
        swal.fire("Error", error, "error");
      }
    );
  }


  


  OpenModal(item:any, data:any):any {
   
    this.masterId = data    
    this.ViewDetails()
  
    if (this.validationStatus == true) {
    this.popUp = this.modalService.open(item, { size: 'lg', windowClass: 'filteritemclass' });
    }
  }

  ViewDetails(){
    this.serviceObject.postData('service_url/listservice/',{master_id:this.masterId}).subscribe(res => {
      if(res.body.status==1) {
        this.lstDetails = res.body.data;
        let statusId =  this.lstDetails[0]['fk_status_id']            
        this.StatusTypes(statusId)
      }

    })
  }

  StatusTypes(id:any){
        
    this.serviceObject.postData('service_url/statustypes/',{View:'viewdetails'}).subscribe((response) => {      
      this.StatusOptions = response.body['data'];       
      this.lstSelectedStatus = [];
        this.StatusOptions.forEach((statusOption:any) => {         
          if (statusOption.pk_bint_id === id) {          
            this.lstSelectedStatus.push(statusOption);
          }
        });
      
    });
  }

  saveFollowup(item: any) {
    
    this.selectedStatusId = this.lstSelectedStatus;  
    
    if (item.vchr_remark == '' || item.vchr_remark == undefined || item.vchr_remark == null){
      swal.fire("Error", 'Please enter remark', "error");
      return
    }
     
    this.serviceObject.putData('service_url/listservice/', { statusId: this.selectedStatusId, master:item }).subscribe((response) => {

      if(response.body.status==1) {
        this.StrMsg = response.body.data;
        this.closeModal()
        this.funcGetServiceList()
        swal.fire("Success", this.StrMsg, "success");
        
        
      }
      else{
        this.StrErrMsg = response.body.msg;
        swal.fire("Error", this.StrErrMsg, "error");
      }
     
      
    });
  }


  closeModal(){   
    this.popUp.close()
  }
}

