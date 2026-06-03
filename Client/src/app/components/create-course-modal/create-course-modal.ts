import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course-modal',
  imports: [FormsModule],
  templateUrl: './create-course-modal.html',
  styleUrl: './create-course-modal.css',
})
export class CreateCourseModal {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Input() errorMessage = '';

  courseName = '';
  educator = '';

  closeModal() {
    this.close.emit();
  }

  saveModal() {
    this.save.emit({
      id: crypto.randomUUID(),
      name: this.courseName,
      educator: this.educator,
    });
  }
}
