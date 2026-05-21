import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details-page',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './student-details-page.html',

  styleUrl: './student-details-page.css',
})

export class StudentDetailsPage {

  notes = [

    {
      date: '2025-05-12',
      text: 'Oscar gjorde bra framsteg idag.'
    },

    {
      date: '2025-05-10',
      text: 'Behöver träna mer på felsökning.'
    }

  ];

  checklists = [

    {
      title: 'Fibersvetsning',
      done: true
    },

    {
      title: 'Mätning',
      done: true
    },

    {
      title: 'Felsökning',
      done: false
    }

  ];

}