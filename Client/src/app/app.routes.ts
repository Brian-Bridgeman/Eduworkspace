import { Routes } from '@angular/router';
import { CoursesPage } from './pages/courses-page/courses-page';
import { StudentPage } from './pages/student-page/student-page';
import { GroupPage } from './pages/group-page/group-page';
import { StartPage } from './pages/start-page/start-page';
import { Kalender } from './components/kalender/kalender';
import { TeamsPage } from './pages/teams-page/teams-page';
import { ChecklistPage } from './pages/checklist-page/checklist-page';
import { StudentDetailsPage } from './pages/student-details-page/student-details-page';
import { CreateGroupPage } from './pages/create-group-page/create-group-page';
import { TeamDetailsPage } from './pages/team-details-page/team-details-page';
import { Overview } from './pages/overview/overview';

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
        path: 'groups/create',
        component: CreateGroupPage
    },
    {
        path: 'students/:id',
        component: StudentDetailsPage
    },
    
     {
        path: 'courses/:id',
        component: CoursesPage
    },
    
    {
        path: 'kalender',
        component: Kalender
    },
     {
        path: 'groups/:groupId',
        component: TeamsPage,
    },
    {
      path: 'groups/:groupId/teams/:teamId',
      component: TeamDetailsPage
    },
    {
        path: 'checklist',
        component: ChecklistPage
    },
    {
        path: 'overview',
        component: Overview
    },
     {
        path: 'groups/:id', //kolla om groups/id ersätts med groups/groupId
        component: TeamsPage
    },
    {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
    }

];
