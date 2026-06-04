import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent } from '../kalender';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.css',
})
export class EventModal {
  @Input() selectedDay: number | null = null;
  @Input() selectedEvent: CalendarEvent | null = null;
  @Input() showEventOverview = false;

  @Input() title = '';
  @Output() titleChange = new EventEmitter<string>();

  @Input() time = '';
  @Output() timeChange = new EventEmitter<string>();

  @Input() endTime = '';
  @Output() endTimeChange = new EventEmitter<string>();

  @Input() place = '';
  @Output() placeChange = new EventEmitter<string>();

  @Input() description = '';
  @Output() descriptionChange = new EventEmitter<string>();

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();


  @Input() month = 0;
  @Input() year = 2026;
  @Input() weeks: (number | null)[][] = [];
  @Input() monthName = '';
  
  @Output() selectedDayChange = new EventEmitter<number>();
  @Output() previousMonthClick = new EventEmitter<void>();
  @Output() nextMonthClick = new EventEmitter<void>();

  getEventEndTime(event: CalendarEvent) {
    if (event.endTime) {
      return event.endTime;
    }

    const [hours, minutes] = event.time.split(':').map(Number);
    const endHour = Math.min(hours + 1, 23);

    return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
 selectDay(day: number | null) {
  if (day === null) return;

  this.selectedDayChange.emit(day);
}

isSelectedDay(day: number | null) {
  return day !== null && day === this.selectedDay;
}


}
