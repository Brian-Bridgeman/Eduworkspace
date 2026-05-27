import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { RouterModule } from '@angular/router';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { RouterLink } from '@angular/router';
import { Signal } from '@angular/core';
import { AddStudentModal } from '../../components/add-student-modal/add-student-modal';
@Component({
  selector: 'app-student-page',
  imports: [CommonModule, TemplateHeaderComponent, FormsModule, RouterModule, DropdownMenu, RouterLink, AddStudentModal],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})

export class StudentPage {
  addStudent(student: any) {
    this.persons.push(student);
    this.showModal.set(false);
  }

  showModal = signal(false);
  openModal() {
    this.showModal.set(true);
  }

  removeStudent(id: string) {
    // fetch anrop till delete här, med id
  }

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