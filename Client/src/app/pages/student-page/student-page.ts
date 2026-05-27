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
    { id: '1', namn: 'Emma Andersson', telefonNr: '070-111 11 11', epost: 'emma.andersson@mail.com', foretag: 'Tech AB', kurs: 'Angular', grupp: 'A3 24' },
    { id: '2', namn: 'Johan Berg', telefonNr: '070-222 22 22', epost: 'johan.berg@mail.com', foretag: 'Webbbolaget', kurs: 'TypeScript', grupp: 'H7 25' },
    { id: '3', namn: 'Kalle Svensson', telefonNr: '070-333 33 33', epost: 'kalle.svensson@mail.com', foretag: 'IT Solutions', kurs: 'Frontend', grupp: 'A1 26' },
    { id: '4', namn: 'Alfred Nilsson', telefonNr: '070-444 44 44', epost: 'alfred.nilsson@mail.com', foretag: 'Digital AB', kurs: 'React', grupp: 'H2 23' },
    { id: '5', namn: 'Sofia Lundgren', telefonNr: '070-555 55 55', epost: 'sofia.lundgren@mail.com', foretag: 'Innovate AB', kurs: 'Vue.js', grupp: 'A9 22' },
    { id: '6', namn: 'Erik Johansson', telefonNr: '070-666 66 66', epost: 'erik.johansson@mail.com', foretag: 'CodeFactory', kurs: 'Node.js', grupp: 'H11 24' },
    { id: '7', namn: 'Maria Ekholm', telefonNr: '070-777 77 77', epost: 'maria.ekholm@mail.com', foretag: 'DataPark', kurs: 'Python', grupp: 'A5 25' },
    { id: '8', namn: 'Lars Lindström', telefonNr: '070-888 88 88', epost: 'lars.lindstrom@mail.com', foretag: 'SoftCorp', kurs: 'Django', grupp: 'H4 26' },
    { id: '9', namn: 'Anna Karlsson', telefonNr: '070-999 99 99', epost: 'anna.karlsson@mail.com', foretag: 'NetSolutions', kurs: 'Flask', grupp: 'A12 23' },
    { id: '10', namn: 'Per Olsson', telefonNr: '071-111 11 11', epost: 'per.olsson@mail.com', foretag: 'TechStart', kurs: 'MongoDB', grupp: 'H6 22' },
    { id: '11', namn: 'Lisa Pettersson', telefonNr: '072-222 22 22', epost: 'lisa.pettersson@mail.com', foretag: 'WebDev AB', kurs: 'SQL', grupp: 'A8 24' },
    { id: '12', namn: 'Mikael Sjöberg', telefonNr: '073-333 33 33', epost: 'mikael.sjoberg@mail.com', foretag: 'CloudNine', kurs: 'AWS', grupp: 'H1 25' },
    { id: '13', namn: 'Karin Holm', telefonNr: '074-444 44 44', epost: 'karin.holm@mail.com', foretag: 'DevOpsPro', kurs: 'Docker', grupp: 'A10 26' },
    { id: '14', namn: 'Anders Wikström', telefonNr: '075-555 55 55', epost: 'anders.wikstrom@mail.com', foretag: 'Kubernetes AB', kurs: 'Kubernetes', grupp: 'H9 23' },
    { id: '15', namn: 'Cecilia Nyström', telefonNr: '076-666 66 66', epost: 'cecilia.nystrom@mail.com', foretag: 'GitLab Inc', kurs: 'Git', grupp: 'A2 22' },
    { id: '16', namn: 'Fredrik Bergman', telefonNr: '077-777 77 77', epost: 'fredrik.bergman@mail.com', foretag: 'AgileWorks', kurs: 'Scrum', grupp: 'H12 24' },
    { id: '17', namn: 'Linnea Sandberg', telefonNr: '078-888 88 88', epost: 'linnea.sandberg@mail.com', foretag: 'TestCorp', kurs: 'Jest', grupp: 'A6 25' },
    { id: '18', namn: 'Niklas Gustafsson', telefonNr: '079-999 99 99', epost: 'niklas.gustafsson@mail.com', foretag: 'MobileX', kurs: 'React Native', grupp: 'H3 26' },
    { id: '19', namn: 'Helena Forsberg', telefonNr: '070-121 21 21', epost: 'helena.forsberg@mail.com', foretag: 'iOSDev', kurs: 'Swift', grupp: 'A11 23' },
    { id: '20', namn: 'Sebastian Dahl', telefonNr: '070-232 32 32', epost: 'sebastian.dahl@mail.com', foretag: 'Android AB', kurs: 'Kotlin', grupp: 'H8 22' },
    { id: '21', namn: 'Jessica Blomqvist', telefonNr: '070-343 43 43', epost: 'jessica.blomqvist@mail.com', foretag: 'GameDev', kurs: 'Unity', grupp: 'A4 24' },
    { id: '22', namn: 'Patrik Engström', telefonNr: '070-454 54 54', epost: 'patrik.engstrom@mail.com', foretag: 'UnrealStudio', kurs: 'Unreal Engine', grupp: 'H5 25' },
    { id: '23', namn: 'Elin Löfgren', telefonNr: '070-565 65 65', epost: 'elin.lofgren@mail.com', foretag: 'DataScience AB', kurs: 'Pandas', grupp: 'A7 26' },
    { id: '24', namn: 'Magnus Öberg', telefonNr: '070-676 76 76', epost: 'magnus.oberg@mail.com', foretag: 'ML Solutions', kurs: 'TensorFlow', grupp: 'H10 23' },
    { id: '25', namn: 'Therese Nordin', telefonNr: '070-787 87 87', epost: 'therese.nordin@mail.com', foretag: 'AI Labs', kurs: 'PyTorch', grupp: 'A1 22' },
    { id: '26', namn: 'Henrik Viklund', telefonNr: '070-898 98 98', epost: 'henrik.viklund@mail.com', foretag: 'BigData Inc', kurs: 'Hadoop', grupp: 'H6 24' },
    { id: '27', namn: 'Camilla Åström', telefonNr: '070-909 09 09', epost: 'camilla.astrom@mail.com', foretag: 'Spark AB', kurs: 'Apache Spark', grupp: 'A9 25' },
    { id: '28', namn: 'Robin Strand', telefonNr: '071-212 12 12', epost: 'robin.strand@mail.com', foretag: 'CyberSafe', kurs: 'Cybersecurity', grupp: 'H2 26' },
    { id: '29', namn: 'Sandra Kvist', telefonNr: '072-323 23 23', epost: 'sandra.kvist@mail.com', foretag: 'NetSec AB', kurs: 'Penetration Testing', grupp: 'A12 23' },
    { id: '30', namn: 'Tobias Hedlund', telefonNr: '073-434 34 34', epost: 'tobias.hedlund@mail.com', foretag: 'Blockchain AB', kurs: 'Solidity', grupp: 'H4 22' },
    { id: '31', namn: 'Maja Gran', telefonNr: '074-545 45 45', epost: 'maja.gran@mail.com', foretag: 'CryptoCorp', kurs: 'Web3', grupp: 'A3 24' },
    { id: '32', namn: 'Emil Norberg', telefonNr: '075-656 56 56', epost: 'emil.norberg@mail.com', foretag: 'IoT Solutions', kurs: 'Arduino', grupp: 'H11 25' },
    { id: '33', namn: 'Julia Malm', telefonNr: '076-767 67 67', epost: 'julia.malm@mail.com', foretag: 'Robotics AB', kurs: 'ROS', grupp: 'A5 26' },
    { id: '34', namn: 'Victor Söderberg', telefonNr: '077-878 78 78', epost: 'victor.soderberg@mail.com', foretag: 'EmbeddedDev', kurs: 'C++', grupp: 'H7 23' },
    { id: '35', namn: 'Frida Lundin', telefonNr: '078-989 89 89', epost: 'frida.lundin@mail.com', foretag: 'SystemDev', kurs: 'Rust', grupp: 'A8 22' },
    { id: '36', namn: 'Adam Bergström', telefonNr: '079-090 90 90', epost: 'adam.bergstrom@mail.com', foretag: 'HighTech AB', kurs: 'Go', grupp: 'H1 24' },
    { id: '37', namn: 'Jennie Holmgren', telefonNr: '070-131 31 31', epost: 'jennie.holmgren@mail.com', foretag: 'MicroServices', kurs: 'Spring Boot', grupp: 'A10 25' },
    { id: '38', namn: 'Oscar Lindberg', telefonNr: '070-242 42 42', epost: 'oscar.lindberg@mail.com', foretag: 'JEE Solutions', kurs: 'Java EE', grupp: 'H9 26' },
    { id: '39', namn: 'Nina Ek', telefonNr: '070-353 53 53', epost: 'nina.ek@mail.com', foretag: 'DotNet AB', kurs: '.NET Core', grupp: 'A6 23' },
    { id: '40', namn: 'Rickard Falk', telefonNr: '070-464 64 64', epost: 'rickard.falk@mail.com', foretag: 'CSharpDev', kurs: 'C#', grupp: 'H12 22' },
    { id: '41', namn: 'Ida Hellström', telefonNr: '070-575 75 75', epost: 'ida.hellstrom@mail.com', foretag: 'PHP Masters', kurs: 'Laravel', grupp: 'A2 24' },
    { id: '42', namn: 'Joakim Svanberg', telefonNr: '070-686 86 86', epost: 'joakim.svanberg@mail.com', foretag: 'Symfony AB', kurs: 'Symfony', grupp: 'H5 25' },
    { id: '43', namn: 'Erica Björk', telefonNr: '070-797 97 97', epost: 'erica.bjork@mail.com', foretag: 'RubyDev', kurs: 'Ruby on Rails', grupp: 'A11 26' },
    { id: '44', namn: 'Mattias Kling', telefonNr: '070-808 08 08', epost: 'mattias.kling@mail.com', foretag: 'PerlCorp', kurs: 'Perl', grupp: 'H3 23' },
    { id: '45', namn: 'Isabella Myrberg', telefonNr: '071-919 19 19', epost: 'isabella.myrberg@mail.com', foretag: 'Cobol Solutions', kurs: 'COBOL', grupp: 'A4 22' },
    { id: '46', namn: 'David Fransson', telefonNr: '072-020 20 20', epost: 'david.fransson@mail.com', foretag: 'Fortran AB', kurs: 'Fortran', grupp: 'H8 24' },
    { id: '47', namn: 'Johanna Ståhl', telefonNr: '073-121 21 21', epost: 'johanna.stahl@mail.com', foretag: 'AssemblyDev', kurs: 'Assembly', grupp: 'A7 25' },
    { id: '48', namn: 'Pontus Vesterlund', telefonNr: '074-232 32 32', epost: 'pontus.vesterlund@mail.com', foretag: 'ScriptCorp', kurs: 'Bash', grupp: 'H10 26' },
    { id: '49', namn: 'Madeleine Nygren', telefonNr: '075-343 43 43', epost: 'madeleine.nygren@mail.com', foretag: 'PowerShell AB', kurs: 'PowerShell', grupp: 'A1 23' },
    { id: '50', namn: 'Christoffer Åkerlund', telefonNr: '076-454 54 54', epost: 'christoffer.akerlund@mail.com', foretag: 'CloudDev', kurs: 'Terraform', grupp: 'H6 22' },
  ];

  get filteredPersons() {
    return this.persons.filter(person =>
      person.namn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      person.kurs.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      person.foretag.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
