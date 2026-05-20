import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-group-page',
  imports: [CommonModule, TemplateHeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './group-page.html',
  styleUrl: './group-page.css',
})
export class GroupPage {
  grupper = [
  {
    namn: 'Oscar',
    telefonNr: '070-111 11 11',
    epost: 'oscar@mail.com',
    foretag: 'Tech AB',
    kurs: 'Angular'
  },
  {
    namn: 'Johan',
    telefonNr: '070-222 22 22',
    epost: 'johan@mail.com',
    foretag: 'Webbbolaget',
    kurs: 'TypeScript'
  },
  {
    namn: 'Kalle',
    telefonNr: '070-333 33 33',
    epost: 'kalle@mail.com',
    foretag: 'IT Solutions',
    kurs: 'Frontend'
  },
  {
    namn: 'Alfred',
    telefonNr: '070-444 44 44',
    epost: 'alfred@mail.com',
    foretag: 'Digital AB',
    kurs: 'Angular'
  },
  {
    namn: 'Kalle',
    telefonNr: '070-333 33 33',
    epost: 'kalle@mail.com',
    foretag: 'IT Solutions',
    kurs: 'Frontend'
  },
  {
    namn: 'Kalle',
    telefonNr: '070-333 33 33',
    epost: 'kalle@mail.com',
    foretag: 'IT Solutions',
    kurs: 'Frontend'
  },
  {
    namn: 'Kalle',
    telefonNr: '070-333 33 33',
    epost: 'kalle@mail.com',
    foretag: 'IT Solutions',
    kurs: 'Frontend'
  },
  {
    namn: 'Kalle',
    telefonNr: '070-333 33 33',
    epost: 'kalle@mail.com',
    foretag: 'IT Solutions',
    kurs: 'Frontend'
  }
];
}
