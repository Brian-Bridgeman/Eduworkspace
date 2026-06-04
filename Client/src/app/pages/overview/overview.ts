import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Client } from '../../services/api-client.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, DropdownMenu, TemplateHeaderComponent, RouterLink, FormsModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview implements OnInit {
  constructor(private router: Router,
              private apiClient: Client,
  ) { }

  statistics = signal<any>(null);
  ongoingTeam = signal<any[]>([]);
  upcomingCourse = signal<any[]>([]);

  ngOnInit(){
    this.apiClient.getApiOverviewStatistic().subscribe(data => {this.statistics.set(data)
    this.apiClient.getApiOverviewOngoingteams().subscribe(data => {this.ongoingTeam.set(data)})
    this.apiClient.getApiOverviewUpcomingcourse().subscribe(data => {this.upcomingCourse.set(data)})
    })
  }
  goToTeam() {
    this.router.navigate(['/groups/1/teams/1']);
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
    }
  }

  scrollToOngoing() {
    document.getElementById('ongoing-section')?.scrollIntoView({ behavior: 'smooth' })
  }
  scrollToUpComingGroups() {
    document.getElementById('upcoming-groups')?.scrollIntoView({ behavior: 'smooth' })
  }
  scrollToActivePersons() {
    document.getElementById('activePersons')?.scrollIntoView({ behavior: 'smooth' })
  }

  showNoteModal = false;
  newNoteText = '';
  selectedTeam = '';
  openNoteModal(teamName: string) {
    this.selectedTeam = teamName;
    this.showNoteModal = true;
  }
  closeNoteModal() {
    this.showNoteModal = false;
    this.newNoteText = '';
  }
  saveNote() {
    if (!this.newNoteText.trim()) return;
     this.latestNotes.unshift({ 
      date: new Date().toLocaleDateString(), 
      group: this.selectedTeam, 
      note: this.newNoteText, 
      createdBy: 'Johan Dahlin' }); 
      this.newNoteText = ''; 
      this.closeNoteModal();
  }
 

  latestNotes = [
    {
      date: '2026-05-20',
      group: 'Oscar & Johan',
      note: 'Kontroll av utrustning genomförd.',
      createdBy: 'Johan Kalle'
    }
  ];
  activePersons = [
    { id: '1', img: 'https://i.pravatar.cc/150?img=16', fornamn: 'Emma', efternamn: 'Andersson', foretag: 'Tech AB', grupp: 'H1 26' },
    { id: '2', img: 'https://i.pravatar.cc/150?img=14', fornamn: 'Johan', efternamn: 'Berg', foretag: 'Webbbolaget', grupp: 'H1 26' },
    { id: '3', img: 'https://i.pravatar.cc/150?img=12', fornamn: 'Kalle', efternamn: 'Svensson', foretag: 'IT Solutions', grupp: 'H1 26' },
    { id: '4', img: 'https://i.pravatar.cc/150?img=33', fornamn: 'Alfred', efternamn: 'Nilsson', foretag: 'Digital AB', grupp: 'H1 26' },
    { id: '5', img: 'https://i.pravatar.cc/150?img=5', fornamn: 'Sofia', efternamn: 'Lundgren', foretag: 'Innovate AB', grupp: 'H1 26' },
    { id: '6', img: 'https://i.pravatar.cc/150?img=13', fornamn: 'Erik', efternamn: 'Johansson', foretag: 'CodeFactory', grupp: 'H1 26' },
    { id: '7', img: 'https://i.pravatar.cc/150?img=26', fornamn: 'Maria', efternamn: 'Ekholm', foretag: 'DataPark', grupp: 'H1 26' },
    { id: '8', img: 'https://i.pravatar.cc/150?img=8', fornamn: 'Lars', efternamn: 'Lindström', foretag: 'SoftCorp', grupp: 'H1 26' },
    { id: '9', img: 'https://i.pravatar.cc/150?img=32', fornamn: 'Anna', efternamn: 'Karlsson', foretag: 'NetSolutions', grupp: 'H1 26' },
    { id: '10', img: 'https://i.pravatar.cc/150?img=11', fornamn: 'Per', efternamn: 'Olsson', foretag: 'TechStart', grupp: 'H1 26' }
  ]
}
