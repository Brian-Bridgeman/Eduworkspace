import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { Router, RouterLink } from '@angular/router';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-course-details-page',
  imports: [CommonModule, TemplateHeaderComponent, DropdownMenu, RouterLink],
  templateUrl: './course-details-page.html',
  styleUrl: './course-details-page.css',
})
export class CourseDetailsPage {
  constructor(private router: Router) { }

  navigateToCreateGroup() {
    this.router.navigate(['/groups/create']);
  }

  searchTerm: string = '';

  courseGroups = [
    {
      id: '3',
      namn: 'H3 26',
      ar: 2026,
      startdatum: '2026-08-18',
      slutdatum: '2026-12-19',
      plats: 'Sal D',
      antalElever: '22 / 25',
      status: 'Pågående'
    },
    {
      id: '4',
      namn: 'H4 26',
      ar: 2026,
      startdatum: '2026-08-18',
      slutdatum: '2026-12-19',
      plats: 'Sal E',
      antalElever: '20 / 22',
      status: 'Pågående'
    },
    {
      id: '8',
      namn: 'H12 26',
      ar: 2026,
      startdatum: '2026-01-15',
      slutdatum: '2026-06-07',
      plats: 'Online',
      antalElever: '24 / 25',
      status: 'Avslutad'
    }
  ];

  get filteredGroups() {
    return this.courseGroups.filter(group =>
      group.namn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      group.ar.toString().includes(this.searchTerm.toLowerCase()) ||
      group.plats.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
