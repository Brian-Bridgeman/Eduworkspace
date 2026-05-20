import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checklist-modal',
  standalone: true,
  imports: [],
  templateUrl: './checklist-modal.html',
  styleUrl: './checklist-modal.css'
})
export class ChecklistModal {

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}