import { Routes } from '@angular/router';
import { CoursesPage } from './pages/courses-page/courses-page';
import { StudentPage } from './pages/student-page/student-page';

export const routes: Routes = [
    {path: 'courses-page',
        component: CoursesPage
    },
    {
    path: 'student-page',
    component: StudentPage
    }
];
