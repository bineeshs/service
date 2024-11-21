import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPermissionsComponent } from './company-permissions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'companypermissions',
        component: CompanyPermissionsComponent,
        data: {
          title: 'companypermissions',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'companypermissions' }
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
export class CompanyPermissionsRoutingModule { }
