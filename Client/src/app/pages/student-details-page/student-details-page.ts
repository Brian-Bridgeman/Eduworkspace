import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistModal }
  from '../../components/checklist-modal/checklist-modal';
import { FormsModule } from '@angular/forms';

import {
  ChecklistService,
  Checklist
} from '../../services/checklist.service';

@Component({
  selector: 'app-student-details-page',

  standalone: true,

  imports: [CommonModule, ChecklistModal, FormsModule],

  templateUrl: './student-details-page.html',

  styleUrl: './student-details-page.css',
})

export class StudentDetailsPage {

  showChecklistModal = false;
  showNoteModal = false;
  newNoteText = '';
  activeTab = 'overview';

  checklists: Checklist[] = [];
  activeChecklist: Checklist | null = null;

  constructor(private checklistService: ChecklistService) {

    this.checklists =
      this.checklistService.getChecklistsForStudent(1);

    this.activeChecklist = this.checklists[0];
    this.activeNoteCollection =
      this.noteCollections[0];

  }

  noteCollections = [

    {
      id: 1,
      title: 'Fiber',

      notes: [
        {
          date: '2025-05-12',
          text: 'Oscar gjorde bra framsteg idag.'
        },

        {
          date: '2025-05-10',
          text: 'Behöver träna mer på felsökning.'
        }
      ]
    },

    {
      id: 2,
      title: 'Angular',

      notes: [
        {
          date: '2025-05-11',
          text: 'Bra förståelse för Angular components.'
        },

        {
          date: '2025-05-09',
          text: 'Behöver träna mer på services.'
        }
      ]
    },

    {
      id: 3,
      title: 'Backend',

      notes: [
        {
          date: '2025-05-08',
          text: 'API-anrop fungerar bra.'
        }
      ]
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
  activeNoteCollection: any = null;

  selectNoteCollection(collection: any) {

    this.activeNoteCollection = collection;

  }
  openNoteModal() {

    this.showNoteModal = true;

  }

  closeNoteModal() {

    this.showNoteModal = false;

  }

  deleteNote(noteToDelete: any) {

  this.activeNoteCollection.notes =
    this.activeNoteCollection.notes.filter(

      (note: any) => note !== noteToDelete

    );

}
  saveNote() {

    if (!this.newNoteText.trim()) return;

    this.activeNoteCollection.notes.unshift({

      date: new Date()
        .toISOString()
        .split('T')[0],

      text: this.newNoteText

    });

    this.newNoteText = '';

    this.closeNoteModal();

  }
 

}
