import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { Router, RouterLink } from '@angular/router';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-group-page',
  imports: [CommonModule, TemplateHeaderComponent, DropdownMenu, RouterLink],
  templateUrl: './group-page.html',
  styleUrl: './group-page.css',
})

export class GroupPage {
  constructor(private router: Router) { }

  removeGroup(id: number) {
    // fetch anrop till delete här, med id
  }

  searchTerm: string = '';

  grupper = [
    {
      id: '1',
      namn: 'H1 26',
      kurs: 'Elinstallation',
      ar: 2026,
      startdatum: '2026-01-12',
      slutdatum: '2026-03-22',
      plats: 'Sal B',
      antalElever: '18 / 20',
      status: 'Kommande'
    },
    {
      id: '2',
      namn: 'H2 26',
      kurs: 'Elinstallation',
      ar: 2026,
      startdatum: '2026-01-12',
      slutdatum: '2026-03-22',
      plats: 'Sal C',
      antalElever: '16 / 20',
      status: 'Kommande'
    },
    {
      id: '3',
      namn: 'H3 26',
      kurs: 'Systemutveckling med AI',
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
      kurs: 'Webbutveckling',
      ar: 2026,
      startdatum: '2026-08-18',
      slutdatum: '2026-12-19',
      plats: 'Sal E',
      antalElever: '20 / 22',
      status: 'Pågående'
    },
    {
      id: '5',
      namn: 'H5 26',
      kurs: 'Brandskydd',
      ar: 2026,
      startdatum: '2026-09-01',
      slutdatum: '2026-11-28',
      plats: 'Sal B',
      antalElever: '15 / 18',
      status: 'Kommande'
    },
    {
      id: '6',
      namn: 'H10 26',
      kurs: 'Elkraftteknik',
      ar: 2026,
      startdatum: '2026-01-13',
      slutdatum: '2026-05-23',
      plats: 'Sal C',
      antalElever: '19 / 20',
      status: 'Avslutad'
    },
    {
      id: '7',
      namn: 'H11 26',
      kurs: 'Nätverksteknik',
      ar: 2026,
      startdatum: '2026-08-19',
      slutdatum: '2026-12-20',
      plats: 'Sal D',
      antalElever: '17 / 20',
      status: 'Avslutad'
    },
    {
      id: '8',
      namn: 'H12 26',
      kurs: 'Systemutveckling med AI',
      ar: 2026,
      startdatum: '2026-01-15',
      slutdatum: '2026-06-07',
      plats: 'Online',
      antalElever: '24 / 25',
      status: 'Avslutad'
    }
  ];

  get filteredGroups() {
    return this.grupper.filter(group =>
      group.namn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      group.kurs.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      group.plats.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  navigateToCreateGroup() {
    this.router.navigate(['/groups/create']);
  }
}
