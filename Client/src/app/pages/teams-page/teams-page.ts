import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { OverviewSection } from '../../components/overview-section/overview-section';

@Component({
  selector: 'app-teams-page',
  imports: [CommonModule, TemplateHeaderComponent, FormsModule, RouterLink, DropdownMenu, OverviewSection],
  templateUrl: './teams-page.html',
  styleUrl: './teams-page.css',
})

export class TeamsPage {
  searchTerm: string = '';
  groupId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
  }

  removeTeam(id: string) {
    // fetch anrop till delete här, med id
  }

  teams = [
    {
      id: 1,
      gruppNamn: 'Oscar & Johan',
      kurs: 'Elinstallation',
      grupp: 'Grupp A',
      plats: 'Sal B',
      deltagare: ['Oscar', 'Johan']
    },
    {
      id: 2,
      gruppNamn: 'Kalle & Alfred',
      kurs: 'Webbutveckling',
      grupp: 'Grupp B',
      plats: 'Sal C',
      deltagare: ['Kalle', 'Alfred']
    },
    {
      id: 3,
      gruppNamn: 'Lisa & Emma',
      kurs: 'Systemutveckling med AI',
      grupp: 'Grupp C',
      plats: 'Sal D',
      deltagare: ['Lisa', 'Emma']
    },
    {
      id: 4,
      gruppNamn: 'Erik & Viktor',
      kurs: 'Brandskydd',
      grupp: 'Grupp A',
      plats: 'Sal B',
      deltagare: ['Erik', 'Viktor']
    },
    {
      id: 5,
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

  navigateToEditTeamsPage() {
    this.router.navigate([`/groups/${this.groupId}/teams`])
  }
}
