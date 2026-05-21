import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-checklist-modal',
    standalone: true,

    imports: [
        CommonModule,
        FormsModule
    ],

    templateUrl: './checklist-modal.html',
    styleUrl: './checklist-modal.css'
})
export class ChecklistModal {

    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();

    checklistName = '';

    checklistItems = [
        {
            text: '',
            checked: false
        }
    ];

    closeModal() {
        this.close.emit();
    }

    saveChecklist() {
        this.save.emit({
            name: this.checklistName,
            items: this.checklistItems
        });

        this.closeModal();
    }
    addItem() {
        this.checklistItems.push({
            text: '',
            checked: false
        });
    }

    removeItem(index: number) {
        this.checklistItems.splice(index, 1);
    }

    trackByIndex(index: number): number {
        return index;
    }

}