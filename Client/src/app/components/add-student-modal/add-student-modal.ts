import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-student-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-student-modal.html',
  styleUrl: './add-student-modal.css',
})
export class AddStudentModal {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  closeModal() {
    this.close.emit();
  }

  saveModal() {
    // TODO:emit newly created student object
    this.save.emit();
  }
}
