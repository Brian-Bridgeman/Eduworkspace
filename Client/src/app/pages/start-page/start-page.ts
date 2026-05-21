import { Component } from '@angular/core';
import { StartPageCard } from '../../components/start-page-card/start-page-card';

@Component({
  selector: 'app-start-page',
  imports: [StartPageCard],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {}
