
import {debounceTime} from 'rxjs/operators';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../server.service';
import swal from 'sweetalert2';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  direction: Direction = 'ltr'; // Add this line to your component class

  // Footer nav 
    blnOpen = false;
    blnShow = false
  // Footer nav end

  public config: PerfectScrollbarConfigInterface = {};

  modelopen : any;


  lstItemName: { code_name: string }[] = [];
  IntItemNameId=0;
  strItemName = '';
  lstFilterData=[]
  selectedItemName : any;
  searchItemName: FormControl = new FormControl();

  dctData = {};
  unitname:any
  intItemMopPrice = 0;
  intItemMrpPrice = 0;
  blnItemShow = false;

  constructor(public router: Router,
    public modalService: NgbModal,
    public serviceObject :ServerService,
    // private toastr: ToastrService
    ) { }

  // Footer nav 
    handler() {
      this.blnOpen = !this.blnOpen;
    }
    
    handler1(){
      this.blnOpen = false;
    }

  // Footer nav end
  
  branchName = localStorage.getItem('BranchName');
  time = new Date();

  tabStatus = 'justified';

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;
  blnfooter=false
  public blnInvoice = 0
  public isNav = 0
  lstGroup=["BRANCH MANAGER","ASSISTANT BRANCH MANAGER","ASM2","ASM3","ASM4","PURCHASE MANAGER","ADMIN"]
  strGroupname:any = localStorage.getItem("group_name")

  options = {
    theme: 'light',
    dir: 'LTR', // specify as a Direction enum
    layout: 'vertical',
    sidebartype: 'full',
    sidebarpos: 'fixed',
    headerpos: 'fixed',
    boxed: 'full',
    navbarbg: 'skin5',
    sidebarbg: 'skin4',
    logobg: 'skin5'
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    this.unitname = localStorage.getItem('UnitName')
    // update time 
    setInterval(() => {
      this.time = new Date();
   }, 1000);

   
    this.blnInvoice = 0
    this.isNav = 0

    if (this.router.url === '/') {
    localStorage.setItem('previousUrl','/dashboard/classic');
      
      this.router.navigate(['/dashboard/classic']);
    }
    this.defaultSidebar = this.options.sidebartype;
    
    if (String(this.router.url) == '/invoice/invoiceview'){
      this.defaultSidebar = 'mini-sidebar';
      this.options.sidebartype = 'mini-sidebar';
    }
    this.handleSidebar();
    
        
    if(this.lstGroup.includes(this.strGroupname)){
      this.blnfooter=true
    }
    else{
       this.blnfooter=false
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleSidebar();
    
  }

  @HostListener('click', ['$event.target']) onClick(btn :any) {

    if (this.isNav == 1){
      if (this.blnInvoice == 1){
        this.blnInvoice = 0
        this.isNav = 0
        this.options.sidebartype = 'mini-sidebar';
        this.toggleSidebarType()
      }
    }    
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType() {
    if(this.blnInvoice == 1){
      this.options.sidebartype = 'full';
      this.isNav == 0
    }

    switch (this.options.sidebartype) {

      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  setInvoice(){
    this.blnInvoice = 1
    this.isNav = 0
    this.toggleSidebarType()
  }


  openimeipopup(imeipopup :any) {
  
  this.blnOpen = !this.blnOpen;    

  this.intItemMopPrice = 0;
  this.intItemMrpPrice = 0;
  this.blnItemShow = false;
  this.IntItemNameId = 0
  this.strItemName = '';
  this.selectedItemName = '';

   
    
    this.modelopen = this.modalService.open(imeipopup, { centered: true, size: 'lg' ,keyboard : false});
  } 

  closePricePopUp() {

    this.modelopen.close();
   
  }


  itemNameChanged(item : any)
   {
    this.IntItemNameId = item.id;
    this.strItemName = item.code_name;
    this.selectedItemName = item.code_name;
  }

  ngOnDestroy() {
   
    if(this.modelopen){
      this.modelopen.close();
      }
    }

}
