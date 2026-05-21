import { Component } from '@angular/core';
import { AddStudentModal } from '../../components/add-student-modal/add-student-modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-group-page',
  imports: [AddStudentModal],
  templateUrl: './create-group-page.html',
  styleUrl: './create-group-page.css',
})

export class CreateGroupPage {
  showAddStudentModal = false;

  constructor(private router: Router){}

  // TODO: skicka post till backend och navigera till groups när gruppen är skapad
  createGroup() {
    this.router.navigate(["/groups"]);
  }

  exitCreateGroupPage() {
    this.router.navigate(["/groups"]);
  }
}
