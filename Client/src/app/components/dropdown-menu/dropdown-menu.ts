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
  constructor(private elementRef: ElementRef) { }

  isOpen = false;
  showModal = false;

  @Input() item: any;
  @Output() delete = new EventEmitter<string>();

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  openModal() {
    this.showModal = true;
    this.isOpen = false;
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
  }
}