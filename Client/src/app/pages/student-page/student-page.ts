import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { RouterModule } from '@angular/router';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Signal } from '@angular/core';
import { AddStudentModal } from '../../components/add-student-modal/add-student-modal';
import { Client, StudentDto } from '../../services/api-client.service';
@Component({
  selector: 'app-student-page',
  imports: [
    CommonModule,
    TemplateHeaderComponent,
    FormsModule,
    RouterModule,
    DropdownMenu,
    RouterLink,
    AddStudentModal,
  ],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})
export class StudentPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Client,
  ) {}

  ngOnInit(): void {
    this.loadStudents();

    this.route.queryParams.subscribe((params) => {
      if (params['create'] === 'true') {
        this.showModal.set(true);

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { create: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });
  }
  addStudent(student: any) {
    this.persons.push(student);
    this.showModal.set(false);
  }

  loadStudents() {
    this.api.getApiStudents().subscribe({
      next: (students) => {
        this.persons = students;
      },
      error: (err) => {
        console.error('Failed to load students', err);
      },
    });
  }

  showModal = signal(false);
  openModal() {
    this.showModal.set(true);
  }

  removeStudent(id: string) {
    // fetch anrop till delete här, med id
  }

  searchTerm: string = '';

  persons: StudentDto[] = [];

  get filteredPersons() {
    return this.persons.filter(
      (person) =>
        (person.name ?? '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (person.course ?? '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (person.company ?? '').toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
