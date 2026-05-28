import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { RouterLink } from '@angular/router';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, DropdownMenu, TemplateHeaderComponent, RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
constructor(private router:Router) {}
goToTeam() {
  this.router.navigate(['/groups/1/teams/1']);
}
  onImageSelected(event:any) {
    const file = event.target.files[0];
    if(file) {
      console.log(file);
    }
  }

  scrollToOngoing() {
    document.getElementById('ongoing-section')?.scrollIntoView({behavior: 'smooth'})
  }
  scrollToUpComingGroups(){
    document.getElementById('upcoming-groups')?.scrollIntoView({behavior: 'smooth'})
  }
  ongoingTeams = [
    {
      teamName: 'Oscar & Johan',
      course: 'Elinstallation',
      location: 'Sal B',
      status: 'Pågående',
      participants: [
        {name: 'Oscar Marcusson'},
        {name: 'Johan Dahlin'}]
    },

    {
      teamName: 'Kalle & Alfred',
      course: 'Webbutveckling',
      location: 'Sal C',
      status: 'Pågående',
      participants: [
        {name: 'Kalle Anka'},
        {name: 'Alfred Dumpling'}]
    },
    {
      teamName: 'Oscar & Johan',
      course: 'Elinstallation',
      location: 'Sal B',
      status: 'Pågående',
      participants: [
        {name: 'Oscar Marcusson'},
        {name: 'Johan Dahlin'}]
    },
    {
      teamName: 'Oscar & Johan',
      course: 'Elinstallation',
      location: 'Sal B',
      status: 'Pågående',
      participants: [
        {name: 'Oscar Marcusson'},
        {name: 'Johan Dahlin'}]
    }
  ];

  upcomingGroups = [
    {
      groupName: 'H1 26',
      course: 'Industrisäkerhet',
      location: 'Sal E',
      status: 'Kommande',
      startDate: '2026-01-12',
      endDate: '2026-03-22'
      
    }
  ];

  latestNotes = [
    {
      date: '2026-05-20',
      group: 'Oscar & Johan',
      note: 'Kontroll av utrustning genomförd.',
      createdBy: 'Johan Kalle'
    }
  ];
  activePersons = [
    { id: '1', fornamn: 'Emma', efternamn: 'Andersson', foretag: 'Tech AB', grupp: 'H1 26' },
    { id: '2', fornamn: 'Johan', efternamn: 'Berg',  foretag: 'Webbbolaget',  grupp: 'H1 26' },
    { id: '3', fornamn: 'Kalle', efternamn: 'Svensson',  foretag: 'IT Solutions',  grupp: 'H1 26' },
    { id: '4', fornamn: 'Alfred', efternamn: 'Nilsson',  foretag: 'Digital AB',  grupp: 'H1 26' },
    { id: '5', fornamn: 'Sofia', efternamn: 'Lundgren',  foretag: 'Innovate AB', grupp: 'H1 26' },
    { id: '6', fornamn: 'Erik', efternamn: 'Johansson',  foretag: 'CodeFactory', grupp: 'H1 26' },
    { id: '7', fornamn: 'Maria', efternamn: 'Ekholm',  foretag: 'DataPark', grupp: 'H1 26' },
    { id: '8', fornamn: 'Lars', efternamn: 'Lindström',  foretag: 'SoftCorp', grupp: 'H1 26'},
    { id: '9', fornamn: 'Anna', efternamn: 'Karlsson', foretag: 'NetSolutions', grupp: 'H1 26' },
    { id: '10', fornamn: 'Per', efternamn: 'Olsson',  foretag: 'TechStart',  grupp: 'H1 26' }
  ]
}
