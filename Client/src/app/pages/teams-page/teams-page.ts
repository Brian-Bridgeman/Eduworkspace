import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';

@Component({
  selector: 'app-teams-page',
  imports: [CommonModule, TemplateHeaderComponent, FormsModule],
  templateUrl: './teams-page.html',
  styleUrl: './teams-page.css',
})
export class TeamsPage {
  searchTerm: string = '';

  teams = [
    {
      gruppNamn: 'Oscar & Johan',
      kurs: 'Elinstallation',
      grupp: 'Grupp A',
      plats: 'Sal B',
      deltagare: ['Oscar', 'Johan']
    },
    {
      gruppNamn: 'Kalle & Alfred',
      kurs: 'Webbutveckling',
      grupp: 'Grupp B',
      plats: 'Sal C',
      deltagare: ['Kalle', 'Alfred']
    },
    {
      gruppNamn: 'Lisa & Emma',
      kurs: 'Systemutveckling med AI',
      grupp: 'Grupp C',
      plats: 'Sal D',
      deltagare: ['Lisa', 'Emma']
    },
    {
      gruppNamn: 'Erik & Viktor',
      kurs: 'Brandskydd',
      grupp: 'Grupp A',
      plats: 'Sal B',
      deltagare: ['Erik', 'Viktor']
    },
    {
      gruppNamn: 'Simon & Hugo',
      kurs: 'Industrisäkerhet',
      grupp: 'Grupp B',
      plats: 'Sal E',
      deltagare: ['Simon', 'Hugo']
    }
  ];

  get filteredTeams() {
    return this.teams.filter(team =>
      team.gruppNamn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      team.kurs.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      team.grupp.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
