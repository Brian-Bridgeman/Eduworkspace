import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { CommonModule } from '@angular/common';
import { ChecklistModal } from './components/checklist-modal/checklist-modal';
import { ChecklistSetCard } from './components/checklist-set-card/checklist-set-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, CommonModule, ChecklistModal, ChecklistSetCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Client');
  showModal = false;
}
