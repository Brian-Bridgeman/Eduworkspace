import { Component, Output, EventEmitter, Input } from '@angular/core';
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
    @Input() checklist: any;

    checklistName = '';
    title = '';

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
            id: Date.now(),
            title: this.title
        });

        this.close.emit();
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