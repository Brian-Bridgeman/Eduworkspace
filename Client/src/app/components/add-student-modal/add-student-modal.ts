import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student-modal.html',
  styleUrl: './add-student-modal.css',
})
export class AddStudentModal {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  student = {
    fornamn: '',
    efternamn: '',
    grupp: '',
    foretag: '',
    telefonNr: '',
    epost: ''
  };

  closeModal() {
    this.close.emit();
  }

  saveModal() {
    this.save.emit({
      id: Date.now().toString(),
      ...this.student
    });
  }
}
