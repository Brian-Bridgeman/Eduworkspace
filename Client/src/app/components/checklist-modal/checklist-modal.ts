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
    description = '';

    checklistItems = [
        {
            text: '',
            done: false
        }
    ];

    closeModal() {
        this.close.emit();
    }

    saveChecklist() {
        this.save.emit({
            id: Date.now(),
            title: this.title,
            description: this.description,
            items: this.checklistItems
        });
    }

    addItem() {
        this.checklistItems.push({
            text: '',
            done: false
        });
    }

    removeItem(index: number) {
        this.checklistItems.splice(index, 1);
    }

    moveItemUp(index: number) {
        if (index === 0)
            return;

        const item = this.checklistItems[index];

        this.checklistItems.splice(index, 1);
        this.checklistItems.splice(index - 1, 0, item);
    }

    moveItemDown(index: number) {
        if (index === this.checklistItems.length - 1)
            return;

        const item = this.checklistItems[index];

        this.checklistItems.splice(index, 1);
        this.checklistItems.splice(index + 1, 0, item);
    }
}