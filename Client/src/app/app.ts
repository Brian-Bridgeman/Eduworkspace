import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { ChecklistSetCard } from './components/checklist-set-card/checklist-set-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, ChecklistSetCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Client');
}
