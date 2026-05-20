import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-student-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-student-modal.html',
  styleUrl: './add-student-modal.css',
})
export class AddStudentModal {
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  confirm() {
    this.confirmed.emit();
  }
}
