import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEvent } from '../kalender';

@Component({
  selector: 'app-week-view',
  standalone: true,
  imports: [],
  templateUrl: './week-view.html',
  styleUrl: './week-view.css',
})
export class WeekView {
  @Input() veckodagar: string[] = [];
  @Input() selectedWeek: (number | null)[] = [];
  @Input() selectedWeekIndex = 0;
  @Input() weeksLength = 0;
  @Input() todayDay = 0;
  @Input() hours: string[] = [];
  @Input() draggedEventId: string | null = null;
  @Input() isTimeResizing = false;

  @Input() getEventsForDay: (day: number) => CalendarEvent[] = () => [];
  @Input() getEventGridRow: (event: CalendarEvent) => string = () => '';
  @Input() getEventEndTime: (event: CalendarEvent) => string = () => '';

  @Output() previousWeek = new EventEmitter<void>();
  @Output() nextWeek = new EventEmitter<void>();
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
  @Output() startResize = new EventEmitter<{ event: MouseEvent; calendarEvent: CalendarEvent }>();
  @Output() startTimeResize = new EventEmitter<{ event: MouseEvent; calendarEvent: CalendarEvent }>();

  resizeTimeFromPointer(event: MouseEvent) {
    if (!this.isTimeResizing || this.hours.length === 0) {
      return;
    }

    const column = event.currentTarget as HTMLElement;
    const bounds = column.getBoundingClientRect();
    const rowHeight = bounds.height / this.hours.length;
    const rawIndex = Math.floor((event.clientY - bounds.top) / rowHeight);
    const hourIndex = Math.max(0, Math.min(this.hours.length - 1, rawIndex));

    this.resizeEventEndTime.emit(this.hours[hourIndex]);
  }
}
