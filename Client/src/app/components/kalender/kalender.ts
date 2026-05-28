
import { Component, HostListener, OnInit } from '@angular/core';
import { EventModal } from './event-modal/event-modal';
import { WeekView } from './week-view/week-view';
import { DayView } from './day-view/day-view';
import { MonthView } from './month-view/month-view';

export type CalendarEvent = {
  id: string;
  startDay: number;
  endDay: number;
  title: string;
  time: string;
  endTime?: string;
  place: string;
  description: string;
};
//Tilåter månad, vecka och dag vy i kalender
type CalendarViewMode = 'month' | 'week' | 'day';

@Component({
  selector: 'app-kalender',
  standalone: true,
  imports: [EventModal, WeekView, DayView, MonthView],
  templateUrl: './kalender.html',
  styleUrl: './kalender.css'
})
export class Kalender implements OnInit {
  veckodagar = [
    'MÅNDAG',
    'TISDAG',
    'ONSDAG',
    'TORSDAG',
    'FREDAG',
    'LÖRDAG',
    'SÖNDAG',
    
  ];

  monthName = 'Maj';
  year = 2026;
  month = 4;
  today = new Date();
  todayDay = this.today.getDate();
  calendarDays: (number | null)[] = [];
  weeks: (number | null)[][] = [];

  // Används i veckovyn för att skapa tidsrader. från 06:00 til 19:00
  hours = Array.from({ length: 14 }, (_, index) => {
  const hour = index + 6;
  return `${hour.toString().padStart(2, '0')}:00`;
});

  viewMode: CalendarViewMode = 'month'; 

  selectedWeekIndex = 0;

  events: CalendarEvent[] = [];
  selectedDay: number | null = null;
  selectedEventId: string | null = null;
  selectedDayForView: number | null = this.todayDay;
  draggedEventId: string | null = null;
  resizingEventId: string | null = null;
  resizingTimeEventId: string | null = null;
  resizeChanged = false;
  suppressNextOpen = false;
  showEventOverview = false;

  ngOnInit() {
    this.createCalendar();
    this.loadEvents();
  }

  @HostListener('document:mouseup')
  handleDocumentMouseup() {
    this.stopResize();
  }
// Visar event-översikten i kalendern
  get selectedEvent(): CalendarEvent | null {
    if (this.selectedEventId === null) {
      return null;
    }
    return this.events.find(event => event.id === this.selectedEventId) ?? null;
  }

//Visar vecka-vyn i kalendern
  get selectedWeek() {
  return this.weeks[this.selectedWeekIndex] ?? [];
}
//Visar dag-vyn i kalendern
get selectedDayForViewEvents() {
  if (this.selectedDayForView === null) {
    return [];
  }

  return this.getEventsForDay(this.selectedDayForView);
}
// Default sluttid för ett event baserat på starttiden, 1 timme senare.
getDefaultEndTime(startTime: string) {
  if (!startTime) {
    return '';
  }

  const [hours, minutes] = startTime.split(':').map(Number);
  const endHours = Math.min(hours + 1, 23);

  return `${endHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

getEventEndTime(event: CalendarEvent) {
  return event.endTime || this.getDefaultEndTime(event.time);
}

  createCalendar() {
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const startDay = (firstDay + 6) % 7;
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }

    for (let i = 0; i < this.calendarDays.length; i += 7) {
      this.weeks.push(this.calendarDays.slice(i, i + 7));
    }
  }

//Ändrar vy i kalendern
  setViewMode(mode: CalendarViewMode) {
  this.viewMode = mode;
  if (mode === 'week') {
    this.setCurrentWeek();
  }
  if (mode === 'day' && this.selectedDayForView === null) {
    this.selectedDayForView = this.todayDay;
  }
}
setCurrentWeek() {
  const dayToShow = this.selectedDayForView ?? this.selectedDay ?? this.todayDay;
  const currentWeekIndex = this.weeks.findIndex(week =>
    week.includes(dayToShow)
  );
  this.selectedWeekIndex = currentWeekIndex >= 0 ? currentWeekIndex : 0;
}

// Navigerar till föregående eller nästa vecka i veckovyn
previousWeek() {
  if (this.selectedWeekIndex > 0) {
    this.selectedWeekIndex--;
    this.setSelectedDayFromWeek();
  }
}
nextWeek() {
  if (this.selectedWeekIndex < this.weeks.length - 1) {
    this.selectedWeekIndex++;
    this.setSelectedDayFromWeek();
  }
}
setSelectedDayFromWeek() {
  const firstDayInWeek = this.selectedWeek.find(day => day !== null);

  if (firstDayInWeek !== undefined) {
    this.selectedDayForView = firstDayInWeek;
  }
}
// Samma som med veckovyn fast för dag-vyn
previousDay() {
  if (this.selectedDayForView !== null && this.selectedDayForView > 1) {
    this.selectedDayForView--;
  }
}
nextDay() {
  const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
  if (
    this.selectedDayForView !== null &&
    this.selectedDayForView < daysInMonth
  ) {
    this.selectedDayForView++;
  }
}
get daysInCurrentMonth() {
  return new Date(this.year, this.month + 1, 0).getDate();
}




 openDay(day: number) {
  if (this.resizingEventId || this.resizingTimeEventId || this.suppressNextOpen) {
    this.suppressNextOpen = false;
    return;
  }

  this.selectedDay = day;
  this.selectedEventId = null;
  this.showEventOverview = false;
  this.prepareModal();
}

openEvent(event: CalendarEvent) {
  this.selectedDay = event.startDay;
  this.selectedEventId = event.id;
  this.showEventOverview = true;
  this.prepareModal();
}
 getEventsForDay(day: number) {
  return this.events.filter(event =>
    day >= event.startDay && day <= event.endDay
  );
}
getTimeAsMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

 // Placerar händelsen på rätt timrad i veckovyn utifrån event.time.
getEventGridRow(event: CalendarEvent) {
  const startHour = 6;
  const endHour = 19;

  const start = this.getTimeAsMinutes(event.time);
  const end = this.getTimeAsMinutes(event.endTime || this.getDefaultEndTime(event.time));

  const clampedStart = Math.max(start, startHour * 60);
  const clampedEnd = Math.min(end, endHour * 60);

  const startRow = Math.floor((clampedStart - startHour * 60) / 60) + 1;
  const span = Math.max(1, Math.ceil((clampedEnd - clampedStart) / 60));

  return `${startRow} / span ${span}`;
}

  handleDayKeydown(event: KeyboardEvent, day: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openDay(day);
    }
  }
//Hantera drag and drop i kalendern
  handleDragStart(dragEvent: DragEvent, calendarEvent: CalendarEvent) {
    if (this.resizingTimeEventId) {
      dragEvent.preventDefault();
      return;
    }

    this.draggedEventId = calendarEvent.id;
    dragEvent.dataTransfer?.setData('text/plain', calendarEvent.id);

    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.effectAllowed = 'copy';
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }


copyEventToDay(dragEvent: DragEvent, day: number) {
  dragEvent.preventDefault();

  const draggedId =
    dragEvent.dataTransfer?.getData('text/plain') || this.draggedEventId;

  const eventToCopy = this.events.find(event => event.id === draggedId);

  if (!eventToCopy || eventToCopy.startDay === day) {
    this.draggedEventId = null;
    return;
  }

  this.events = [
    ...this.events,
    {
      ...eventToCopy,
      id: crypto.randomUUID(),
      startDay: day,
      endDay: day,
      endTime: eventToCopy.endTime || this.getDefaultEndTime(eventToCopy.time)
    }
  ];

  this.draggedEventId = null;
  this.saveEvents();
}

startResize(event: MouseEvent, calendarEvent: CalendarEvent) {
  event.stopPropagation();
  event.preventDefault();

  this.resizingEventId = calendarEvent.id;
  this.resizeChanged = false;
}

startTimeResize(event: MouseEvent, calendarEvent: CalendarEvent) {
  event.stopPropagation();
  event.preventDefault();

  this.resizingTimeEventId = calendarEvent.id;
  this.resizeChanged = false;
  this.suppressNextOpen = true;
}

resizeEventEndTime(hour: string) {
  if (!this.resizingTimeEventId) return;

  let changed = false;

  this.events = this.events.map(event => {
    if (event.id !== this.resizingTimeEventId) {
      return event;
    }

    const proposedEndTime = this.getDefaultEndTime(hour);
    const startMinutes = this.getTimeAsMinutes(event.time);
    const proposedEndMinutes = this.getTimeAsMinutes(proposedEndTime);
    const endTime =
      proposedEndMinutes > startMinutes
        ? proposedEndTime
        : this.getDefaultEndTime(event.time);

    if (event.endTime === endTime) {
      return event;
    }

    changed = true;

    return {
      ...event,
      endTime
    };
  });

  this.resizeChanged = this.resizeChanged || changed;
}

resizeEventToDay(day: number) {
  if (!this.resizingEventId) return;

  let changed = false;

  this.events = this.events.map(event => {
    if (event.id !== this.resizingEventId) {
      return event;
    }

    const endDay = Math.max(event.startDay, day);

    if (event.endDay === endDay) {
      return event;
    }

    changed = true;

    return {
      ...event,
      endDay
    };
  });

  this.resizeChanged = this.resizeChanged || changed;
}

stopResize() {
  if ((this.resizingEventId || this.resizingTimeEventId) && this.resizeChanged) {
    this.saveEvents();
  }

  this.resizingEventId = null;
  this.resizingTimeEventId = null;
  this.resizeChanged = false;
}



  handleEventKeydown(keyboardEvent: KeyboardEvent, calendarEvent: CalendarEvent) {
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      keyboardEvent.preventDefault();
      keyboardEvent.stopPropagation();
      this.openEvent(calendarEvent);
    }
  }

  loadEvents() {
    const savedEvents = localStorage.getItem('calendar-events');

    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    }
  }

  saveEvents() {
    localStorage.setItem('calendar-events', JSON.stringify(this.events));
  }
title = '';
time = '';
endTime = '';
place = '';
description = '';

prepareModal() {
  const event = this.selectedEvent;

  if (event) {
    this.title = event.title;
    this.time = event.time;
    this.endTime = event.endTime || this.getDefaultEndTime(event.time);
    this.place = event.place;
    this.description = event.description;
  } else {
    this.title = '';
    this.time = '';
    this.endTime = '';
    this.place = '';
    this.description = '';
  }
}

closeModal() {
  this.selectedDay = null;
  this.selectedEventId = null;
  this.showEventOverview = false;
}

saveEvent() {
  if (this.selectedDay === null) return;

  const savedEvent: CalendarEvent = {
    id: this.selectedEvent?.id ?? crypto.randomUUID(),
    startDay: this.selectedDay,
    endDay: this.selectedEvent?.endDay ?? this.selectedDay,
    title: this.title,
    time: this.time,
    endTime: this.endTime || this.getDefaultEndTime(this.time),
    place: this.place,
    description: this.description
  };

  this.events = this.events.filter(event => event.id !== savedEvent.id);
  this.events = [...this.events, savedEvent];

  this.saveEvents();
  this.closeModal();
}

deleteEvent() {
  if (!this.selectedEventId) return;

  this.events = this.events.filter(
    event => event.id !== this.selectedEventId
  );

  this.saveEvents();
  this.closeModal();
}




}
