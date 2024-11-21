import { Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { SelectComponent } from './select/select.component';



export const LoginRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userlogin',
        component: UserloginComponent,
        data: {
          title: 'Login',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Login' }
          ]
        }
      },
      {
        path: 'design',
        component: SelectComponent,
        data: {
          title: 'select Designation',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Select' }
          ]
        }
      }
    ]
  }
];
