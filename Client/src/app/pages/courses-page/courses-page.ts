import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CreateCourseModal } from '../../components/create-course-modal/create-course-modal';

@Component({
  selector: 'app-courses-page',
  imports: [TemplateHeaderComponent, RouterModule, CommonModule, DropdownMenu, CreateCourseModal],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
})
export class CoursesPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
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
  removeCourse(id: string) {
    // fetch anrop till delete här, med id
  }
  addCourse(course: any) {
    this.courses.push(course);
    this.showModal.set(false);
  }
  showModal = signal(false);
  openModal() {
    this.showModal.set(true);
  }
  searchTerm: string = '';

  courses = [
    {
      id: '1',
      name: 'C#',
      educator: 'Oscar',
    },
    {
      id: '2',
      name: 'FIB',
      educator: 'Johan',
    },
    {
      id: '3',
      name: 'NIB',
      educator: 'Johan',
    },
  ];

  get filteredCourses() {
    return this.courses.filter(
      (course) =>
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.educator.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
