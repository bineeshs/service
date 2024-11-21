import { Component, AfterViewInit, OnInit, ViewChild, TemplateRef, Input,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {
  NgbModal,
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DataService } from '../../global.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ServerService } from 'src/app/server.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';


declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit, OnInit {

  @ViewChild('myInput', { static: false }) myInput!: ElementRef;
  unitname:string | null | undefined
  blnShow = false
  // unitname

  focusInput() {
    this.myInput.nativeElement.focus()
    if(this.blnShow == false){
      this.blnShow = true
    }
    else{
      this.blnShow = false
    }
  }
  focusOut() {    
    this.selectedModule = ''
    if(this.blnShow == false){
      this.blnShow = true
    }
    else{
      this.blnShow = false
    }
  }

  public config: PerfectScrollbarConfigInterface = {};
  searchModule: FormControl = new FormControl();
  userName:any='';
  userEmail:any = '';
  public showSearch = false;

  selectedModule ='';
  blnClicked=false
  sidebarnavItems={};
  lstMainTitles =['white','white','white'];
  lstColor:any=[];
  intCount: number = 0;

  lstNotification: { 
    blnRead: string,
    datNotify:Date,
    strTitle:string,
    strBody:string,
    
  }[] = [];
  ReminderModel: any;
  searchAssignUser: FormControl = new FormControl();
  lst_assignuser: { full_name: string }[] = [];
  lst_assignuser_all = []
  strSelectedAssignuser = null;
  strSubject = '';
  lstSidebar: { strModuleName: string }[] = [];
  intAssignuserId = null;
  strassignuser = null;
  datPickup='';
  strPickupTime = '';
  AlarmModel: any;
  hostName:any
  lstAlarm = [];
  warningModelInstance: any;
  ReminderMOdelInstance: any;
  minDate = moment(new Date()).format('YYYY-MM-DD')
  audio = new Audio('assets/audio/reminder_tone.mp3');
  audio1 = new Audio('assets/audio/notification_tone.mp3');
  audio_warning : any;
  sounds = document.getElementsByTagName('audio1');

  strWarningContent = [];
  profileImage = '';
  strHostAddress = '';
  sub:any;
  @ViewChild("AlarmModel") modalContent: TemplateRef<any> | any;
  @ViewChild("WarningModel") WarningModelContent: TemplateRef<any> | any;
  @ViewChild("ReminderModel") modelReminder: TemplateRef<any> | any;

  constructor(private modalService: NgbModal,  
    public router: Router, 
    private serverService: ServerService,
    private data:DataService
    ) {

    }


  
  playmusic(){
    // this.audio1.loop = true
    // this.audio1.play()
    // document.getElementsByTagName("body")[0].appendChild(this.audio1);
    
  }

  onLoggedout() {
    
    localStorage.removeItem('Tokeniser');
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');
    localStorage.removeItem('selectedIndex');
    localStorage.removeItem('intPending');
    localStorage.removeItem('incomingcalls');
    localStorage.removeItem('CurrDesignId');   
    localStorage.removeItem('username');
    localStorage.removeItem('group_permissions');
    localStorage.removeItem('profile_image');
    localStorage.removeItem('DesignationId');
    localStorage.removeItem('UserId');
    localStorage.removeItem('SessionKey');
    
    localStorage.setItem('previousUrl','/login/userlogin');
    this.sub.unsubscribe();
    this.router.navigate(['/login/userlogin']);



  }

  accountSettings(){
    this.router.navigate(['/pass/changeUserPass'])
  }

  ngAfterViewInit() { }

  ngOnInit() {   
    // if (localStorage.getItem('UnitName') != null){
    //   this.unitname = localStorage.getItem('UnitName')
    // } 
    this.unitname = localStorage.getItem('UnitName')

    this.sub = Observable.interval(600000)
    .subscribe((val) => { this.getNotification() });
    this.userName = localStorage.getItem('Name');
    this.userEmail = localStorage.getItem('Email');
    this.hostName = this.serverService.hostAddress
    this.hostName = this.hostName.slice(0, this.hostName.length - 1)
    this.profileImage = this.hostName + localStorage.getItem('profile_image');

    

    if (!localStorage.getItem('Tokeniser')) {
    } else {
      this.serverService.getData('login/sidebar/').subscribe(
        result => {

          console.log('tetsttttt');
          
          
          this.sidebarnavItems = result.body['data'];
          if (this.sidebarnavItems){
            this.lstMainTitles = Object.keys(this.sidebarnavItems)
            this.menuClicked(localStorage.getItem('menuName'));
            console.log();
            

          }
         
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/landing/landing1']);
          }
        });

        this.searchModule.valueChanges.pipe(
          debounceTime(400))
          .subscribe((strData: string) => {
            if (strData === undefined || strData === null) {
              this.lstSidebar = [];
            } else {
              if (strData.length >= 2) {
                this.serverService
                  .postData('group_permissions/searsidebar/',{term:strData})
                  .subscribe(
                    (response) => {
                      this.lstSidebar = response.body['data'];
                    }
                  );
    
              }
            }
          }
          );
    }
   

    this.searchAssignUser.valueChanges.subscribe((strData: string) => {
      if(strData == undefined){
        this.lst_assignuser = this.lst_assignuser_all
      }else{
        this.lst_assignuser = this.lst_assignuser_all.filter((res)=>{
          if(JSON.stringify(res['full_name']).toUpperCase().indexOf(strData.toUpperCase()) > -1){
            return true
          }
          else{
            return false
          }
        })
      }
    })

    
    this.getNotification()
    
  }

  getNotification(){    
    // this.serverService.getData('api/notification/get-notification').subscribe((res:any)=>{
    //   if(res && res.body.status == 1){
    //     this.lstNotification = res.body.data
    //     this.intCount = res.body.count
    //   }else{

    //   }
    // },(error)=>{

    // })
  }


  SidebarTypeahead(item:any){ 
    this.selectedModule = item.strModuleName;
    this.router.navigate([item.strURL]);
  }
  OpenProfile(){
    this.router.navigate(['/myprofile/view'])
  }




  // openModal(modalName:any){
  
  // }



  menuClicked(item:any){ 

    this.lstColor = Array<string>(this.lstMainTitles.length).fill('black')
    this.lstColor[this.lstMainTitles.indexOf(item)] ='#d52222'
    this.data.changeSidebar(item)
    
  }

  // NOTIFICATIONS CODE
  refreshNotifications(){
    this.audio1.pause()
  }

  showNotification(item : any){
    let dctTempData={}
  }
  // NOTIFICATIONS END
  blnTimeDisabled = false;

  timePickerOpened(){
    console.log('jkdbkshdgj')
    this.blnTimeDisabled=true;
  }

  timePickerClosed(){
    console.log('closed')
    this.blnTimeDisabled=false;
  }


  assignUserChanged(item : any){
    this.intAssignuserId = item.user_ptr_id;
    this.strassignuser= item.full_name;
  }


  saveReminder(){

  }

  stopWarning(){
    this.audio_warning.pause();
    this.warningModelInstance.close();
  }
  
 
}













@Component({
  selector: 'ngbd-modal-content',
  template: `
  <mat-card>
  <mat-card-title class="card-title" style="text-align: center;color: #3e958d; ;">
  
  <div>
    <div class="shake-rotate shake-constant" style = "font-size: 170% !important;">
      <i class="mdi mdi-alarm" style="font-size: 400%; color:#5090c4; text-shadow: 1px 12px 12px rgba(11, 8, 8, 0.52);"></i>
    
    </div>
  </div>
  <div>
    <label>
      Reminder
    </label>
  </div>
  </mat-card-title>
  <mat-card-content>
    <div  style="margin: 0;padding: 0;" class="row">
    
      <div class="col-md-12" style="max-width: 100%;  font-size: 120%; text-align: center;padding-top: 8%;padding-bottom: 8%;">
        <div class="col-md-12">
     
        <p >{{data['json_content']['body']}} </p>
      </div>
      </div>
      <div class="col-md-12" style="text-align: center;background: #ddcab0; margin: 0;
      padding: 0;
      border-radius: 24px;">
        <button class= "reminderset" style="font-size: 372%; border: none;background: #ddcab0;color: #3aa345;cursor:pointer;">
        <div>
          <i class="mdi mdi-alarm-plus" style="text-shadow: 1px 12px 12px rgba(11, 8, 8, 0.52);" (click)="snoozeAlarm(data)" title="Snooze">
          </i>
        </div>
        </button>

        <button class= "reminderset" style="font-size: 372%; border: none;background: #ddcab0;color: #be2d2d;cursor:pointer;">
          <div>
            <i class="mdi mdi-alarm-off" style="text-shadow: 1px 12px 12px rgba(11, 8, 8, 0.52);" (click)="stopAlarm(data)" title="Stop">
            </i>
          </div>
          </button>
      </div>
    </div>
  </mat-card-content>
</mat-card>
  `
})
export class NgbdModalContent {
  @Input() data :any;
  // @Input() index;
  audio : any;
  constructor(public activeModal: NgbActiveModal,private serverService: ServerService, 
    // private toastr: ToastrService
    ) {}

  ngOnInit() { 
    // this.playSound('assets/audio/reminder_tone.mp3');
    }
  

  snoozeAlarm(data:any){
    // this.audio.pause()
    // this.serverService.putData('reminder/reminder/',{id : data['pk_bint_id'], blnSnooze:true}).subscribe((response) => {

    //   if(response['status'] == 1){
    //     this.activeModal.close() 
    //   }
      
    // },(error)=>{
    //   this.toastr.error('Something went wrong','Error !');
    //   this.activeModal.close()
    // });

    
  }

  stopAlarm(data:any){
    // this.audio.pause()
    // this.serverService.putData('reminder/reminder/',{id : data['pk_bint_id'],blnStop : true}).subscribe((response) => {

    //   if(response['status'] == 1){
    //     this.activeModal.close()
        
    //   }
      
    // },(error)=>{
    //   this.toastr.error('Something went wrong','Error !');
    //   this.activeModal.close()
    // });
  
  }

  // playSound(url:any) {
  //   this.audio = new Audio(url);
  //   this.audio.loop = true;
  //   this.audio.play();
  // }
}
