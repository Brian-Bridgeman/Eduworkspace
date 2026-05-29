import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-page-card',
  imports: [NgClass, RouterLink],
  templateUrl: './start-page-card.html',
  styleUrl: './start-page-card.css',
})
export class StartPageCard {
  @Input() symbol: string = '';

  @Input() title: string = '';

  @Input() description: string = '';

  @Input() viewText: string = '';

  @Input() createText: string = '';

  @Input() type: 'kurser' | 'elever' | 'grupper' | 'kalender' = 'kurser';

  @Input() page: 'courses' | 'students' | 'groups' | 'kalender' = 'courses';

  @Input() modalPage: 'createCourse' | 'createStudent' | 'groups/create' | 'createEvent' =
    'createCourse';

  @Input() createRoute?: string;
}
