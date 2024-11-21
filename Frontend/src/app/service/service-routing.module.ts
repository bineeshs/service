import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceComponent } from './add-service/add-service.component';
import { FollowUpServiceComponent } from './follow-up-service/follow-up-service.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'addservices',
        component: AddServiceComponent,
        data: {
          title: 'Add Service',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Add Service' }
          ]
        }
      },
    ]
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'followupservices',
        component: FollowUpServiceComponent,
        data: {
          title: 'Service Follow up',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Service Follow up' }
          ]
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
