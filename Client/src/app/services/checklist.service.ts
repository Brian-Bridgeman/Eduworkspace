import { Injectable } from '@angular/core';

export interface ChecklistItem {
    id: number;
    text: string;
    completed: boolean;
}

export interface Checklist {
    id: number;
    title: string;
    studentIds: number[];
    items: ChecklistItem[];
}

@Injectable({
    providedIn: 'root'
})

export class ChecklistService {

    private checklists: Checklist[] = [

  {
    id: 1,
    title: 'Fiber',
    studentIds: [1],

    items: [
      {
        id: 1,
        text: 'Mätning',
        completed: true
      },
      {
        id: 2,
        text: 'Felsökning',
        completed: false
      },
      {
        id: 3,
        text: 'Svetsning',
        completed: false
      },
      {
        id: 4,
        text: 'Dokumentation',
        completed: true
      }
    ]
  },

  {
    id: 2,
    title: 'Angular',
    studentIds: [1],

    items: [
      {
        id: 1,
        text: 'Components',
        completed: true
      },
      {
        id: 2,
        text: 'Services',
        completed: false
      },
      {
        id: 3,
        text: 'Routing',
        completed: false
      }
    ]
  },

  {
    id: 3,
    title: 'Backend',
    studentIds: [1],

    items: [
      {
        id: 1,
        text: 'API',
        completed: false
      },
      {
        id: 2,
        text: 'JWT',
        completed: false
      },
      {
        id: 3,
        text: 'Database',
        completed: true
      }
    ]
  },

  {
    id: 4,
    title: 'Docker',
    studentIds: [1],

    items: [
      {
        id: 1,
        text: 'Containers',
        completed: false
      },
      {
        id: 2,
        text: 'Compose',
        completed: true
      }
    ]
  },

  {
    id: 5,
    title: 'Projektledning',
    studentIds: [1],

    items: [
      {
        id: 1,
        text: 'Scrum',
        completed: true
      },
      {
        id: 2,
        text: 'Sprintplanering',
        completed: false
      }
    ]
  }

];

    getChecklistsForStudent(studentId: number): Checklist[] {

        return this.checklists.filter(c =>
            c.studentIds.includes(studentId)
        );

    }

    updateChecklist(updatedChecklist: Checklist) {

        const index = this.checklists.findIndex(
            c => c.id === updatedChecklist.id
        );

        if (index !== -1) {
            this.checklists[index] = updatedChecklist;
        }

    }
    addChecklist(checklist: Checklist) {

        this.checklists.push(checklist);

    }
}