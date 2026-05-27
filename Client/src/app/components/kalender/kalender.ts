
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type CalendarEvent = {
  id: string;
  startDay: number;
  endDay: number;
  title: string;
  time: string;
  place: string;
  description: string;
};
//Tilåter månad, vecka och dag vy i kalender
type CalendarViewMode = 'month' | 'week' | 'day';

@Component({
  selector: 'app-kalender',
  standalone: true,
  imports: [FormsModule],
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

  events: CalendarEvent[] = [];
  selectedDay: number | null = null;
  selectedEventId: string | null = null;
  draggedEventId: string | null = null;
  resizingEventId: string | null = null;
  showEventOverview = false;

  ngOnInit() {
    this.createCalendar();
    this.loadEvents();
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
 // Placerar händelsen på rätt timrad i veckovyn utifrån event.time.
getEventGridRow(event: CalendarEvent) {
  const startHour = 6;
  const endHour = 19;
  const hour = Number(event.time.split(':')[0]);
  const clampedHour = Number.isFinite(hour)
    ? Math.min(Math.max(hour, startHour), endHour)
    : startHour;
  return `${clampedHour - startHour + 1} / span 1`;
}

  handleDayKeydown(event: KeyboardEvent, day: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openDay(day);
    }
  }

//Hantera drag and drop i kalendern
  handleDragStart(dragEvent: DragEvent, calendarEvent: CalendarEvent) {
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
      endDay: day
    }
  ];

  this.draggedEventId = null;
  this.saveEvents();
}

startResize(event: MouseEvent, calendarEvent: CalendarEvent) {
  event.stopPropagation();
  event.preventDefault();

  this.resizingEventId = calendarEvent.id;
}

resizeEventToDay(day: number) {
  if (!this.resizingEventId) return;

  this.events = this.events.map(event => {
    if (event.id !== this.resizingEventId) {
      return event;
    }

    return {
      ...event,
      endDay: Math.max(event.startDay, day)
    };
  });

  this.saveEvents();
}

stopResize() {
  this.resizingEventId = null;
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
place = '';
description = '';

prepareModal() {
  const event = this.selectedEvent;

  if (event) {
    this.title = event.title;
    this.time = event.time;
    this.place = event.place;
    this.description = event.description;
  } else {
    this.title = '';
    this.time = '';
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




}}
