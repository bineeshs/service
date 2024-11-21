import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [

  {
    path: '',
    children: [
      
      {
        path: 'view',
        // canActivate: [AuthGuard],
        component: ViewProfileComponent,
        data: {
          title: 'My Profile',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'My Profile' }
          ]
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
