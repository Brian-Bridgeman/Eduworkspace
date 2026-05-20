import { Routes } from '@angular/router';
import { StartPage } from './pages/start-page/start-page';
import { StudentPage } from './pages/student-page/student-page';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start-page',
    pathMatch: 'full',
  },
  {
    path: 'start-page',
    component: StartPage,
  },
  {
    path: 'student-page',
    component: StudentPage,
  },
];
