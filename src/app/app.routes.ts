import { Routes } from '@angular/router';
import {AccountPage} from './account-page/account-page';
import {MainPage} from './main-page/main-page';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'account',
    component: AccountPage
  }
];
