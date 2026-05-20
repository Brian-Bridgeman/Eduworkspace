import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checklist-set-card',
  imports: [],
  templateUrl: './checklist-set-card.html',
  styleUrl: './checklist-set-card.css',
})
export class ChecklistSetCard {
  @Input() title = '';
  @Input() description = '';
  @Input() checklistExamples: string[] = [];
}
