import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-dropdown-menu',
  imports: [CommonModule, ConfirmationModal],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.css',
})
export class DropdownMenu {
  constructor(private elementRef: ElementRef) {}
  static currentlyOpen: DropdownMenu | null = null;

  isOpen = false;
  showModal = false;

  @Input() item: any;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<void>();

  toggleMenu() {
    if (DropdownMenu.currentlyOpen && DropdownMenu.currentlyOpen !== this)
      DropdownMenu.currentlyOpen.isOpen = false;

    this.isOpen = !this.isOpen;
    DropdownMenu.currentlyOpen = this.isOpen ? this : null;
  }

  openModal() {
    this.showModal = true;
    this.isOpen = false;

    if (DropdownMenu.currentlyOpen === this) {
      DropdownMenu.currentlyOpen = null;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  deleteItem() {
    this.delete.emit(this.item.id);
    this.showModal = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isOpen = false;
    }

    if (DropdownMenu.currentlyOpen === this) {
      DropdownMenu.currentlyOpen = null;
    }
  }
}
