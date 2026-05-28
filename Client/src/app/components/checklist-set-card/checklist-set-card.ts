import { Component, Input } from '@angular/core';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-checklist-set-card',
  standalone: true,
  imports: [DropdownMenu],
  templateUrl: './checklist-set-card.html',
  styleUrl: './checklist-set-card.css',
})
export class ChecklistSetCard {

  @Input() checklistExamples: any[] = [];

  @Output() edit = new EventEmitter<void>();

  showAll = false;

  toggleDetails() {
    this.showAll = !this.showAll;
  }

  toggleItem(item: any) {
    item.done = !item.done;
  }

  removeChecklist(id: string) {
    // fetch anrop till delete här, med id
  }


}

