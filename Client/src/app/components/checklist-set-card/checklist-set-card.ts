import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checklist-set-card',
  standalone: true,
  imports: [],
  templateUrl: './checklist-set-card.html',
  styleUrl: './checklist-set-card.css',
})
export class ChecklistSetCard {
  @Input() title = 'Granska riskbedömning';
  @Input() description = 'Checklista';
  @Input() checklistExamples = ['A', 'B', 'C'];
}
