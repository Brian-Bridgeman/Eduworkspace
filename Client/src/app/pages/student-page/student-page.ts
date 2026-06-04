import { Component, OnInit, signal, computed } from '@angular/core';
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
  standalone: true,
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
  async addStudent(student: any) {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      const newCourse = await response.json();

      this.persons.update((students) => [...students, newCourse]);
      this.showModal.set(false);
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  }

  loadStudents() {
    this.api.getApiStudents().subscribe({
      next: (students) => {
        this.persons.set(students);
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

  async removeStudent(id: number) {
    try {
      await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      this.persons.update((students) => students.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  }
  persons = signal<StudentDto[]>([]);
  searchTerm = signal('');

  filteredPersons = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.persons().filter(
      (person) =>
        (person.name ?? '').toLowerCase().includes(term) ||
        (person.course ?? '').toLowerCase().includes(term) ||
        (person.company ?? '').toLowerCase().includes(term),
    );
  });
}
