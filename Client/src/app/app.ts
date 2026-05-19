import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateHeaderComponent } from './components/template-header/template-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TemplateHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Client');
}
