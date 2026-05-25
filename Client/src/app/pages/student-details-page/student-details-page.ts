import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistModal }
  from '../../components/checklist-modal/checklist-modal';

import {
  ChecklistService,
  Checklist
} from '../../services/checklist.service';

@Component({
  selector: 'app-student-details-page',

  standalone: true,

  imports: [CommonModule, ChecklistModal],

  templateUrl: './student-details-page.html',

  styleUrl: './student-details-page.css',
})

export class StudentDetailsPage {

  showChecklistModal = false;

  checklists: Checklist[] = [];
  activeChecklist: Checklist | null = null;

  constructor(private checklistService: ChecklistService) {

    this.checklists =
      this.checklistService.getChecklistsForStudent(1);

    this.activeChecklist = this.checklists[0];

  }

  notes = [

    {
      date: '2025-05-12',
      text: 'Oscar gjorde bra framsteg idag.'
    },

    {
      date: '2025-05-10',
      text: 'Behöver träna mer på felsökning.'
    }

  ];

  courses = [

    {
      id: 1,
      name: 'Frontendutveckling',
      active: true
    },

    {
      id: 2,
      name: 'Java Backend',
      active: false
    }

  ];

  toggleChecklistItem(checklist: Checklist, item: any) {

    item.completed = !item.completed;

    this.checklistService.updateChecklist(checklist);

  }

  openChecklistModal() {

    this.showChecklistModal = true;

  }

  closeChecklistModal() {

    this.showChecklistModal = false;

  }
  selectChecklist(checklist: Checklist) {

  this.activeChecklist = checklist;

}
}