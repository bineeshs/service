import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { NotfoundComponent } from './authentication/404/not-found.component';

export const Approutes: Routes = [
  
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login/userlogin', pathMatch: 'full' },
      { path: 'companypermissions', loadChildren: () => import('./company-permissions/company-permissions.module').then(routing => routing.CompanyPermissionsModule) },
     
      { path: 'pass', loadChildren: () => import('./change-pass/change-pass.module').then(routing => routing.ChangePassModule) },

      { path: 'myprofile', loadChildren: () => import('./my-profile/my-profile.module').then(routing => routing.MyProfileModule) },
      { path: 'service', loadChildren: () => import('./service/service.module').then(routing => routing.ServiceModule) },

    ]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(routing => routing.LoginModule) },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

