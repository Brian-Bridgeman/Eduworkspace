import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChecklistService } from '../../services/checklist.service';

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
    constructor(
        private checklistService: ChecklistService
    ) { }

    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();
    @Input() checklist: any;
    @Input() studentId?: number;

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

        const newChecklist = {

            id: Date.now(),

            title: this.title,

            studentIds: this.studentId
                ? [this.studentId]
                : [],

            items: this.checklistItems.map(item => ({
                id: Date.now() + Math.random(),
                text: item.text,
                completed: item.done
            }))

        };

        this.checklistService.addChecklist(newChecklist);

        this.save.emit(newChecklist);

        this.closeModal();

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

    trackByIndex(index: number): number {
        return index;
    }

}