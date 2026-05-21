import { Component } from '@angular/core';
import { AddStudentModal } from '../../components/add-student-modal/add-student-modal';

@Component({
  selector: 'app-create-group-page',
  imports: [AddStudentModal],
  templateUrl: './create-group-page.html',
  styleUrl: './create-group-page.css',
})

export class CreateGroupPage {
  showAddStudentModal = false;
}
