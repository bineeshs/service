import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-company-permissions',
  templateUrl: './company-permissions.component.html',
  styleUrls: ['./company-permissions.component.css']
})
export class CompanyPermissionsComponent implements OnInit {


  searchCompany: FormControl = new FormControl();
  lstCompany: { name: string,id:number }[] = [];
  intCompanyId = null;
  strCompany='';
  companyName='';

  lstPerms = [] as {
    main_status: any;sub_items: any[];levelOneClicked:any;blnArrowLevelOne:any;name:any}[];;
  
  lstPermsCopy = [];
  lstPermsSow = [];
  blnAdminGroup = false;
  blnAddAdminGroup = false;
  blnAddAdminUser = false;

  blnAdminUser = false;

  blnIsAllDisable = false;
  blnTrue=false;

  blnIsAllDisablesub = true;
  blnTrueSub=false;
  blnArrowLevelOne = true;
  blnArrowLevelTwo = true;
  blnArrowLevelThree = false;

  validationSuccess = true;
  errorPlace = '';
  blnLevelOne = true;
  blnLevelTwo =true;
  blnLevelThree =true;
  blnSubItem = false;
  constructor(
    private serverService:ServerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.searchCompany.valueChanges.pipe(
      debounceTime(400))
      .subscribe((strData: string) => {
        if (strData === undefined || strData === null) {
          this.lstCompany = [];
        } else {
          
          if (strData.length >= 3) {
            this.serverService
              .postData('company/company_typeahead/', { term: strData })
              .subscribe(
                (response) => {
                  this.lstCompany = response.body.data;
    
                }
              );
          }
        }
      }
    ); 
  }


  companyChanged(item:any){
    
    this.intCompanyId = item.id;
    this.strCompany = item.name;
    const pusheditems = {int_company_id : this.intCompanyId};
    this.serverService.postData("company/company_list/", pusheditems).subscribe(res => {
      const result = res;
      if (result.body['status'] === 1) {
        this.blnLevelOne=true;
        this.blnLevelTwo = true;
        this.blnLevelThree = true;
        this.lstPerms = result.body['data'];
   
        this.lstPermsCopy = JSON.parse(JSON.stringify(result.body['data']));
        this.blnAddAdminGroup = result.body['bln_add_admin_group'];
        this.blnAddAdminUser = result.body['bln_add_admin_user'];
        for(let i =0;i<this.lstPerms.length;i++){
          for(let j =0;j<this.lstPerms[i]['sub_items'].length;j++){
            this.blnSubItem =false;
            for(let k = 0;k<this.lstPerms[i]['sub_items'][j]['menu_items'].length;k++){              
             if(!this.lstPerms[i]['sub_items'][j]['menu_items'][k]['bln_menu_add_perm']){
              this.blnSubItem = true;
              break;
             }
            }
             if(this.blnSubItem){
              this.lstPerms[i]['sub_items'][j]['sub_status'] = false;
             }
             else{
              this.lstPerms[i]['sub_items'][j]['sub_status'] = true;
             }
          }
        }
      
      } else {
      }
    });

  }

    
  menuItemChanged(event:any,i:any,j:any,subItem:any){
    let blnmenuAllChecked = true;    
    for (let temp2 = 0; temp2 < this.lstPerms[i].sub_items[j].menu_items.length; temp2++){
      if(! this.lstPerms[i].sub_items[j].menu_items[temp2].bln_menu_add_perm){
        blnmenuAllChecked= false;
        break;
      }
      else{
        blnmenuAllChecked =true;
      }
    }
    this.lstPerms[i].sub_items[j].sub_status = blnmenuAllChecked;
  }
  levelThreeClicked(){
    this.blnLevelThree =  !this.blnLevelThree;
  }
  mainChangedSub(event:any, i:any, j:any,strType:any) {
    for (let temp2 = 0; temp2 < this.lstPerms[i].sub_items[j].menu_items.length; temp2++){
    if (strType === 'bln_menu_add_perm') {
      this.lstPerms[i].sub_items[j].menu_items[temp2]['bln_menu_add_perm'] = event.checked;
    }
    }
  }
  levelOneClicked(item:any){
    if(item['levelOneClicked']){
      item['levelOneClicked'] = !item['levelOneClicked'];
      item['blnArrowLevelOne'] = !item['blnArrowLevelOne'];
      for(let temp=0 ; temp< item.sub_items.length;temp++){
        if(item.sub_items[temp].levelTwoClicked){
          item.sub_items[temp].levelTwoClicked = !item.sub_items[temp].levelTwoClicked;
          item.sub_items[temp].blnArrowLevelTwo = !item.sub_items[temp].blnArrowLevelTwo;
        }
      }
    
    }else{      
      item['levelOneClicked']=this.blnLevelOne;
      item['blnArrowLevelOne'] =this.blnArrowLevelOne;
    
    }
  }
  isAllCheckedSub(i:any,j:any,strType:any) {
    this.blnTrue = true;
    this.blnIsAllDisable = true;
    this.blnTrueSub = true;
    this.blnIsAllDisablesub =true;
     for(let temp2 = 0 ; temp2 < this.lstPerms[i].sub_items[j].menu_items.length; temp2++){

      
      if (!this.lstPerms[i].sub_items[j].menu_items[temp2]['bln_menu_add_perm']) {
        this.blnTrueSub = false;
        break;
      }
     }

    if (this.blnTrueSub) {
      return true;
    }
    else {
      return false;
    }
  }
  levelTwoClicked(subItem:any){
    if(subItem['levelTwoClicked']){
      subItem['levelTwoClicked'] = !subItem['levelTwoClicked'];
      subItem['blnArrowLevelTwo'] = !subItem['blnArrowLevelTwo'];
    }

    else{
      subItem['levelTwoClicked']=this.blnLevelTwo;
      subItem['blnArrowLevelTwo']=this.blnArrowLevelTwo;
    } 
  }

  savePermission() {

    if (this.blnAdminUser && !this.validationSuccess) {
      // this.toastr.error(this.errorPlace, 'Error!');
    } else {
      const frmPublishedData = new FormData;+
      frmPublishedData.append('int_company_id',JSON.stringify(this.intCompanyId));
      frmPublishedData.append('lst_per',JSON.stringify(this.lstPerms));
      frmPublishedData.append('lst_perms_copy',JSON.stringify(this.lstPermsCopy));
      frmPublishedData.append('bln_add_admin_group',this.blnAdminGroup.toString());
      frmPublishedData.append('bln_add_admin_user',this.blnAdminUser.toString());


      this.serverService.postFormData("company/save/", frmPublishedData).subscribe(res => {
        if (res.body['status'] === 1) {
          this.lstPerms = [] as {
            main_status: any;sub_items: any[];levelOneClicked:any;blnArrowLevelOne:any;name:any}[];
          this.lstPermsCopy = [];   
          this.lstCompany = []
          this.companyName = ''

          swal.fire({
            position:'center',
            title:'Success',
            icon:'success',
            text:'Permission Saved Successfully',
            customClass: {
              confirmButton: "SuccessSwalBtn"
            }
          })
        } 
      }); 
    }   
    
  }
  mainChanged(event:any, i:any, strType:any) {
    for (let temp = 0; temp < this.lstPerms[i].sub_items.length; temp++) {
      for(let temp1 = 0;temp1 < this.lstPerms[i].sub_items.length; temp1++){
      if (strType === 'sub_status') {
        this.lstPerms[i].sub_items[temp][strType] = event.checked;
        this.lstPerms[i].main_status = event.checked;
      }
      for (let temp2 = 0; temp2 < this.lstPerms[i].sub_items[temp1].menu_items.length; temp2++){
        this.lstPerms[i].sub_items[temp1].menu_items[temp2].bln_menu_add_perm = event.checked;        
      }
      
    }
   }
  }
  isAllChecked(i:any, strType:any) {
    this.blnTrue = true;
    this.blnIsAllDisable = true;
    for (let temp = 0; temp < this.lstPerms[i].sub_items.length; temp++) {

      if (!this.lstPerms[i].sub_items[temp]['sub_status']) {
        this.blnTrue = false;
        break;
      }
    }

    if (this.blnTrue) {
      return true;
    }
    else {
      return false;
    }
  }

}
