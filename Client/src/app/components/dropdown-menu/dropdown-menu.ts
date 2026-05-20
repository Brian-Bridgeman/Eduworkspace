import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dropdown-menu',
  imports: [CommonModule],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.css',
})

export class DropdownMenu {
  isOpen = false;
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
