import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { RouterModule } from '@angular/router';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-page',
  imports: [CommonModule, TemplateHeaderComponent, FormsModule, RouterModule, DropdownMenu, RouterLink],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})

export class StudentPage {
  searchTerm: string = '';

  persons = [
    {
      id: '1',
      namn: 'Oscar',
      telefonNr: '070-111 11 11',
      epost: 'oscar@mail.com',
      foretag: 'Tech AB',
      kurs: 'Angular'
    },
    {
      id: '2',
      namn: 'Johan',
      telefonNr: '070-222 22 22',
      epost: 'johan@mail.com',
      foretag: 'Webbbolaget',
      kurs: 'TypeScript'
    },
    {
      id: '3',
      namn: 'Kalle',
      telefonNr: '070-333 33 33',
      epost: 'kalle@mail.com',
      foretag: 'IT Solutions',
      kurs: 'Frontend'
    },
    {
      id: '4',
      namn: 'Alfred',
      telefonNr: '070-444 44 44',
      epost: 'alfred@mail.com',
      foretag: 'Digital AB',
      kurs: 'Angular'
    },
    {
      id: '5',
      namn: 'Kalle',
      telefonNr: '070-333 33 33',
      epost: 'kalle@mail.com',
      foretag: 'IT Solutions',
      kurs: 'Frontend'
    },
    {
      id: '6',
      namn: 'Kalle',
      telefonNr: '070-333 33 33',
      epost: 'kalle@mail.com',
      foretag: 'IT Solutions',
      kurs: 'Frontend'
    },
    {
      id: '7',
      namn: 'Kalle',
      telefonNr: '070-333 33 33',
      epost: 'kalle@mail.com',
      foretag: 'IT Solutions',
      kurs: 'Frontend'
    },
    {
      id: '8',
      namn: 'Kalle',
      telefonNr: '070-333 33 33',
      epost: 'kalle@mail.com',
      foretag: 'IT Solutions',
      kurs: 'Frontend'
    }
  ];

  get filteredPersons() {
    return this.persons.filter(person =>
      person.namn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      person.kurs.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      person.foretag.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}