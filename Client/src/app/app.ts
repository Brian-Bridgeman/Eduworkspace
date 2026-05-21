import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { SearchBar } from './components/search-bar/search-bar';
import { CommonModule } from '@angular/common';
import { ChecklistModal } from './components/checklist-modal/checklist-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, SearchBar, CommonModule, ChecklistModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Client');
  showModal = false;
}
