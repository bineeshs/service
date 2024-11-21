import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeUserPassComponent } from './change-user-pass/change-user-pass.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [

  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'changeUserPass',
        // canActivate: [AuthGuard],
        component: ChangeUserPassComponent,
        data: {
          title: 'Update password ',
          urls: [
            { title: 'Dashboard', url: '' },
            { title: 'Update password ' }
          ]
        }
      
      },

]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePassRoutingModule { }
