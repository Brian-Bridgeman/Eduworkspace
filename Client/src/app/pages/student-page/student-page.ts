import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
@Component({
  selector: 'app-student-page',
  imports: [CommonModule, TemplateHeaderComponent, FormsModule,DropdownMenu],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})
export class StudentPage {
  searchTerm: string = '';

  persons = [
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

  get filteredPersons() {
    return this.persons.filter(person =>
      person.namn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      person.kurs.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      person.foretag.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}