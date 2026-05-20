import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  @Output() checklistClick = new EventEmitter<void>();

  openChecklistModal() {
    this.checklistClick.emit();
  }

}