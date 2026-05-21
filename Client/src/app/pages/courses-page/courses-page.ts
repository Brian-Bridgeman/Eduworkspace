import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-courses-page',
  imports: [TemplateHeaderComponent, CommonModule, DropdownMenu],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
})
export class CoursesPage {
  searchTerm: string = '';

  courses = [
    {
      name: 'C# Grund',
      code: 'C#',
      category: 'Databaser'
    },
    {
      name: 'Fiber Grund',
      code: 'PHP',
      category: 'Frontend'
    },
    {
      name: 'Kebab Grund',
      code: 'Python',
      category: 'Backend'
    }
  ];

  get filteredCourses() {
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
