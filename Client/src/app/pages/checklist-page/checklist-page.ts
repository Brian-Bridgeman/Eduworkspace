import { Component } from '@angular/core';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { ChecklistModal } from '../../components/checklist-modal/checklist-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checklist-page',
  standalone: true,
  imports: [TemplateHeaderComponent, ChecklistModal, CommonModule],
  templateUrl: './checklist-page.html',
  styleUrl: './checklist-page.css'
})
export class ChecklistPage {

  showModal = false;

  openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

}