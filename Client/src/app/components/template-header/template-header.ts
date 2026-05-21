import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
@Component({
  selector: 'app-template-header',
  standalone: true,
  imports: [SearchBar],
  templateUrl: './template-header.html',
  styleUrl: './template-header.css'
})

export class TemplateHeaderComponent {

  @Output() searchChange = new EventEmitter<string>();

  @Input() title: string = '';

  @Input() subtitle: string = '';

  @Input() buttonText: string = '';

  @Output() buttonClick = new EventEmitter<void>();
}