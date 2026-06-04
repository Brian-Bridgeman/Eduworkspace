import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { HostBinding } from '@angular/core';
import { Settings } from './pages/settings/settings';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Header, CommonModule, Footer, Breadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Client');
  checklists = signal<any[]>([]);
  showModal = signal(false);
  showSidebar = true;

  @HostBinding('class.start-route')
  isStartRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;

        this.isStartRoute = currentUrl === '/start';

        this.showSidebar = currentUrl !== '/start' && currentUrl !== '/login';
      });
  }
  addChecklist(checklist: any) {
    this.checklists.update(list => [...list, checklist]);
  }
}
