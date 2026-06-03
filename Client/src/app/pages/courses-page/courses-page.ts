import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../services/api-client.service';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { CreateCourseModal } from '../../components/create-course-modal/create-course-modal';
import { firstValueFrom } from 'rxjs';
import { ApiException } from '../../services/api-client.service';

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
    private client: Client,
  ) { }

  courses = signal<any[]>([]);
  searchTerm = signal('');
  showModal = signal(false);
  errorMessage = signal('');

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
      this.client.getApiCourses().subscribe(courses => {
        this.courses.set(courses);
      });
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  }

  async removeCourse(id: number) {
    try {
      await firstValueFrom(this.client.deleteApiCourses(id));

      this.courses.update(courses =>
        courses.filter(c => c.id !== id)
      );

    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  }

  async addCourse(course: any) {
    try {
      this.errorMessage.set('');
      const createdCourse = await firstValueFrom(
        this.client.postApiCourses(course)
      );

      this.courses.update(courses => [...courses, createdCourse]);
      this.showModal.set(false);
    }

    catch (error: any) {

      this.errorMessage.set(
        error.response.replaceAll('"', '')
      );
      console.error('Failed to add course:', error);

    }
  }

  openModal() {
    this.showModal.set(true);
  }
}