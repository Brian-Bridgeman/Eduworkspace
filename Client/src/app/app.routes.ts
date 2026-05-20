import { Routes } from '@angular/router';
import { CoursesPage } from './pages/courses-page/courses-page';
import { StudentPage } from './pages/student-page/student-page';

export const routes: Routes = [
    {
        path: 'courses',
        component: CoursesPage
    },
    {
        path: 'students',
        component: StudentPage
    },
    {
        /* ÄNDRA HÄR NÄR SIDAN FINNS */
        path: 'classes',
        redirectTo: '/courses'
    },
    {
        path: 'calender',
        redirectTo: '/courses'
    },
    {
        path: 'checklist',
        redirectTo: '/courses'
    }
];
