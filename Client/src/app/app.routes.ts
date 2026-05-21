import { Routes } from '@angular/router';
import { CoursesPage } from './pages/courses-page/courses-page';
import { StudentPage } from './pages/student-page/student-page';
import { ChecklistModal } from './components/checklist-modal/checklist-modal';
import { ChecklistPage } from './pages/checklist-page/checklist-page';

export const routes: Routes = [
    {
        path: 'start-page',
        redirectTo: '/courses'
    },
    {
        path: 'courses',
        component: CoursesPage
    },
    {
        path: 'students',
        component: StudentPage
    },
    /* {
         path: 'groups',
         component: GroupPage
     },*/
    {
        /* ÄNDRA HÄR NÄR RESPEKTIVE SIDOR FINNS */
        path: 'classes',
        redirectTo: '/courses'
    },
    {
        path: 'calender',
        redirectTo: '/courses'
    },
    {
        path: 'checklist',
        component: ChecklistPage
    }
];
