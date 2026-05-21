import { Component } from '@angular/core';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { ChecklistModal } from '../../components/checklist-modal/checklist-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checklist-page',
  standalone: true,

  imports: [
    CommonModule,
    TemplateHeaderComponent,
    ChecklistModal
  ],

  templateUrl: './checklist-page.html',
  styleUrl: './checklist-page.css'
})

export class ChecklistPage {

  showModal = false;

  checklists: any[] = [];

  selectedChecklist: any = null;

  selectedIndex: number | null = null;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveChecklist(checklist: any) {

    checklist.open = false;

    if (this.selectedIndex !== null) {

      this.checklists[this.selectedIndex] = checklist;

    } else {

      this.checklists.push(checklist);
    }

    this.selectedChecklist = null;

    this.selectedIndex = null;

    this.closeModal();
  }

  toggleChecklist(index: number) {
    this.checklists[index].open =
      !this.checklists[index].open;
  }

  deleteChecklist(index: number) {
    this.checklists.splice(index, 1);
  }

  editChecklist(index: number) {

    this.selectedChecklist = {
      ...this.checklists[index]
    };

    this.selectedIndex = index;

    this.showModal = true;
  }

}