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

  ongoingGroups = [
    {
      groupName: 'Oscar & Johan',
      course: 'Elinstallation',
      location: 'Sal B',
      status: 'Pågående',
      participants: [
        {name: 'Oscar Marcusson'},
        {name: 'Johan Dahlin'}]
    },

    {
      groupName: 'Kalle & Alfred',
      course: 'Webbutveckling',
      location: 'Sal C',
      status: 'Pågående',
      participants: [
        {name: 'Kalle Anka'},
        {name: 'Alfred Dumpling'}]
    }
  ];

  upcomingGroups = [
    {
      groupName: 'Simon & Hugo',
      course: 'Industrisäkerhet',
      location: 'Sal E',
      status: 'Kommande',
      participants: [
        {name: 'Simon Knatte'},
        {name: 'Hugo Larry'}]
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
}
