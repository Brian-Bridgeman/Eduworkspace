import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checklist-set-card',
  standalone: true,
  imports: [],
  templateUrl: './checklist-set-card.html',
  styleUrl: './checklist-set-card.css',
})
export class ChecklistSetCard {
  @Input() title = 'Checklista';
  @Input() description = 'Beskrivning av checklistan?';
  @Input() checklistExamples = ['A', 'B', 'C', 'D'];

  showAll = false;

  toggleDetails() {
    this.showAll = !this.showAll;
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}

