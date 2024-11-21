import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from 'src/app/layouts/full/full.component';
import { ServerService } from '../../server.service';
import { NavigationComponent } from '../header-navigation/navigation.component'
import { DataService } from 'src/app/global.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[] | undefined;
  mainMenuItems:any

  mainCategoryClicked:any;
  dctData:any = {}
  temp_nav:any = []

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    localStorage.setItem('sidebarClick',element)
    this.fullObject.isNav = 1
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private serverService: ServerService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private fullObject: FullComponent,
    private data:DataService,
    private navObject : NavigationComponent,
  ) {}

  ngOnInit() {

    this.data.sidebarData.subscribe((message: any) => {
      if (message && this.dctData.hasOwnProperty(this.mainCategoryClicked)) {
        this.mainCategoryClicked = message;

        this.sidebarnavItems = []
        this.temp_nav = []

        // TO REMOVE DUPLICATES ENTRY
        this.dctData[this.mainCategoryClicked].forEach((element:any)=>{
          this.temp_nav = []
          let subMenuData:any = []
          element['submenu'].forEach((data:any)=>{
            if (this.temp_nav.indexOf(data['title']) == -1){
              this.temp_nav.push(data['title'])
              subMenuData.push(data)
            }
          })
          element['submenu'] = subMenuData
          this.sidebarnavItems?.push(element)
        })
      }
    })

    this.serverService.getData('login/sidebar/').subscribe(
      result => {
        console.log('324534344545');
        
        this.dctData = result.body.data
        this.mainCategoryClicked = [localStorage.getItem('menuName')]          
        this.sidebarnavItems = []
        this.temp_nav = []

        // TO REMOVE DUPLICATES ENTRY
        result.body['data'][this.mainCategoryClicked].forEach((element:any)=>{
          this.temp_nav = []
          let subMenuData:any = []
          element['submenu'].forEach((data:any)=>{
            if (this.temp_nav.indexOf(data['title']) == -1){
              this.temp_nav.push(data['title'])
              subMenuData.push(data)
            }
          })
          element['submenu'] = subMenuData
          this.sidebarnavItems?.push(element)
        })
      },
      (error) => {
        if (error.status === 401) {
          localStorage.setItem('previousUrl','/login/userlogin');
          this.router.navigate(['/login/userlogin']);
        }
      });
    }
}
