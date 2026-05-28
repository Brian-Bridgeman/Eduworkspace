import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { RouterModule } from '@angular/router';
import { CreateCourseModal } from '../../components/create-course-modal/create-course-modal';

@Component({
  selector: 'app-courses-page',
  imports: [TemplateHeaderComponent, RouterModule, CommonModule, DropdownMenu, CreateCourseModal],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
})
export class CoursesPage {
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
