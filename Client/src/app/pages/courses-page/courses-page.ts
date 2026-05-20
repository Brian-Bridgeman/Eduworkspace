import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';


@Component({
  selector: 'app-courses-page',
  imports: [TemplateHeaderComponent, CommonModule],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
})
export class CoursesPage {
   courses = [
    { name: 'C# Grund',
       code: 'C#',
     category: 'Databaser' },
     { name: 'C# Grund',
       code: 'C#',
     category: 'Databaser' },
     { name: 'C# Grund',
       code: 'C#',
     category: 'Databaser' }
  ];
}
