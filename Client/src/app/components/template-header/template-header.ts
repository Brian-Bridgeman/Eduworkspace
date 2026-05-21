import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-template-header',
  standalone: true,
  imports: [],
  templateUrl: './template-header.html',
  styleUrl: './template-header.css'
})
export class TemplateHeaderComponent {

  @Input() title: string = '';

  @Input() subtitle: string = '';

  @Input() buttonText: string = '';

  @Output() buttonClick = new EventEmitter<void>();
}