import { Routes } from '@angular/router';
import { CoursesPage } from './pages/courses-page/courses-page';
import { StudentPage } from './pages/student-page/student-page';
import { GroupPage } from './pages/group-page/group-page';
import { ChecklistModal } from './components/checklist-modal/checklist-modal';
import { StartPage } from './pages/start-page/start-page';

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
        path: 'groups',
        component: GroupPage
    },
    {
        path: 'start',
        component: StartPage,
    },
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
        redirectTo: '/courses'
    }

];
