import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEvent } from '../kalender';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [],
  templateUrl: './day-view.html',
  styleUrl: './day-view.css',
})
export class DayView {
  @Input() selectedDayForView: number | null = null;
  @Input() daysInCurrentMonth = 31;
  @Input() todayDay = 0;
  @Input() hours: string[] = [];
  @Input() selectedDayForViewEvents: CalendarEvent[] = [];
  @Input() isTimeResizing = false;

  @Input() getEventGridRow: (event: CalendarEvent) => string = () => '';
  @Input() getEventEndTime: (event: CalendarEvent) => string = () => '';

  @Output() previousDay = new EventEmitter<void>();
  @Output() nextDay = new EventEmitter<void>();
  @Output() stopResize = new EventEmitter<void>();
  @Output() openDay = new EventEmitter<number>();
  @Output() openEvent = new EventEmitter<CalendarEvent>();
  @Output() resizeEventToDay = new EventEmitter<number>();
  @Output() resizeEventEndTime = new EventEmitter<string>();
  @Output() handleDragOver = new EventEmitter<DragEvent>();
  @Output() copyEventToDay = new EventEmitter<{ dragEvent: DragEvent; day: number }>();
  @Output() handleDayKeydown = new EventEmitter<{ event: KeyboardEvent; day: number }>();
  @Output() handleEventKeydown = new EventEmitter<{ event: KeyboardEvent; calendarEvent: CalendarEvent }>();
  @Output() handleDragStart = new EventEmitter<{ dragEvent: DragEvent; calendarEvent: CalendarEvent }>();
  @Output() dragEnded = new EventEmitter<void>();
  @Output() startTimeResize = new EventEmitter<{ event: MouseEvent; calendarEvent: CalendarEvent }>();

  resizeTimeFromPointer(event: MouseEvent) {
    if (!this.isTimeResizing || this.hours.length === 0) {
      return;
    }

    const schedule = event.currentTarget as HTMLElement;
    const bounds = schedule.getBoundingClientRect();
    const rowHeight = bounds.height / this.hours.length;
    const rawIndex = Math.floor((event.clientY - bounds.top) / rowHeight);
    const hourIndex = Math.max(0, Math.min(this.hours.length - 1, rawIndex));

    this.resizeEventEndTime.emit(this.hours[hourIndex]);
  }
}
