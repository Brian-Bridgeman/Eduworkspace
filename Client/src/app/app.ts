import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { CommonModule } from '@angular/common';
import { ChecklistModal } from './components/checklist-modal/checklist-modal';
import { filter } from 'rxjs';
import { HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, CommonModule, ChecklistModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Client');
  showModal = false;

  showSidebar = true;

  @HostBinding('class.start-route')
  isStartRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const isStart = event.url === '/start';

        this.isStartRoute = isStart;
        this.showSidebar = !isStart;
      });
  }
}
