import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEvent } from '../kalender';

@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [],
  templateUrl: './month-view.html',
  styleUrl: './month-view.css',
})
export class MonthView {
  @Input() veckodagar: string[] = [];
  @Input() weeks: (number | null)[][] = [];
  @Input() todayDay = 0;

  @Input() getEventsForDay: (day: number) => CalendarEvent[] = () => [];

  @Output() stopResize = new EventEmitter<void>();
  @Output() openDay = new EventEmitter<number>();
  @Output() openEvent = new EventEmitter<CalendarEvent>();
  @Output() resizeEventToDay = new EventEmitter<number>();
  @Output() handleDragOver = new EventEmitter<DragEvent>();
  @Output() moveEventToDay = new EventEmitter<{ dragEvent: DragEvent; day: number }>();
  @Output() handleDayKeydown = new EventEmitter<{ event: KeyboardEvent; day: number }>();
  @Output() handleEventKeydown = new EventEmitter<{ event: KeyboardEvent; calendarEvent: CalendarEvent }>();
  @Output() handleDragStart = new EventEmitter<{ dragEvent: DragEvent; calendarEvent: CalendarEvent }>();
  @Output() dragEnded = new EventEmitter<void>();
  @Output() startResize = new EventEmitter<{ event: MouseEvent; calendarEvent: CalendarEvent }>();
}
