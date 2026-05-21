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
  @Input() checklistExamples = [{ text: 'aaa', done: false },
  { text: 'bbb', done: false },
  { text: 'ccc', done: false },
  { text: 'ddd', done: false }
  ];

  showAll = false;

  toggleDetails() {
    this.showAll = !this.showAll;
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleItem(item: any) {
    item.done = !item.done;
  }
}

