import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  lstData = []
  hostName:any
  ViewUserId:any
  strDesignation:any
  str_other_unit:any
  intUnitHead:any
  constructor(
    private serverService: ServerService,
    public router: Router,
    public spinner:NgxSpinnerService
  ) { }

  UserId = localStorage.getItem('UserId')

  ngOnInit(): void {
    this.hostName = this.serverService.hostAddress
    this.hostName = this.hostName.slice(0, this.hostName.length - 1)
    this.getListData();
    
  }

  getListData(){
    this.spinner.show()
    this.serverService.getData('api/user/profile_view/?id='+this.UserId).subscribe(
      (response) => {
        this.spinner.hide()
        if (response.body.status == 1) {
          this.lstData = response.body.data
          if (response.body.data[0]['bln_unit_head']){
            this.intUnitHead = '1'
          }else{
            this.intUnitHead = '0'
          }
          this.strDesignation = response.body.lst_desc_view
          this.str_other_unit = response.body.lst_other_unit_view
          
          }
          
        else {
          swal.fire({
            position:'center',
            title:'Error!',
            icon:'error',
            text:response.body.reason,
            customClass: {
              confirmButton: "WarningBtn"
            }
          })
          return
        }
      },
      (error) => { 
        this.spinner.hide()
        swal.fire({
          position:'center',
          title:'Error!',
          icon:'error',
          text:'error',
          customClass: {
            confirmButton: "WarningBtn"
          }
        })
        return }
    );
  }
  
}
