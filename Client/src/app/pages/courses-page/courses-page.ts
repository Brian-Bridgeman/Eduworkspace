import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { CreateCourseModal } from '../../components/create-course-modal/create-course-modal';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TemplateHeaderComponent,
    DropdownMenu,
    CreateCourseModal
  ],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
})
export class CoursesPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  courses = signal<any[]>([]);
  searchTerm = signal('');
  showModal = signal(false);

  filteredCourses = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.courses().filter(course =>
      (course.name ?? course.Name ?? '').toLowerCase().includes(term) ||
      (course.educator ?? course.Educator ?? '').toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.loadCourses();

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

  async loadCourses() {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();

      this.courses.set(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  }

  async removeCourse(id: number) {
    try {
      await fetch(`/api/courses/${id}`, {
        method: 'DELETE'
      });

      this.courses.update(courses =>
        courses.filter(c => c.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  }

  async addCourse(course: any) {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });

      const newCourse = await response.json();

      this.courses.update(courses => [...courses, newCourse]);
      this.showModal.set(false);

    } catch (error) {
      console.error('Failed to add course:', error);
    }
  }

  openModal() {
    this.showModal.set(true);
  }
}