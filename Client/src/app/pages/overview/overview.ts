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
  activeStudents = signal<any[]>([])

  ngOnInit(){
    this.apiClient.getApiOverviewStatistic().subscribe(data => {this.statistics.set(data)
    this.apiClient.getApiOverviewOngoingteams().subscribe(data => {this.ongoingTeam.set(data)})
    this.apiClient.getApiOverviewUpcomingcourse().subscribe(data => {this.upcomingCourse.set(data)})
    this.apiClient.getApiOverviewActivestudents().subscribe(data => {this.activeStudents.set(data)})
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
}
