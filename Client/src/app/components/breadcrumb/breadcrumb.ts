import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreadcrumbService, Crumb } from '../../services/breadcrumb.service';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit {
  breadcrumbs$!: Observable<Crumb[]>;
  constructor(private router: Router, private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbService.set(this.buildFromUrl(this.router.url));
      });
  }

  private buildFromUrl(url: string): Crumb[] {
    const segments = url.split('/').filter(s => s);
    const crumbs: Crumb[] = [];
    let builtUrl = '';
    for (const segment of segments) {
      builtUrl += `/${segment}`;
      const route = this.findRoute(segment, builtUrl);
      if (route) crumbs.push(route);
    }
    return crumbs;
  }

  private findRoute(segment: string, url: string): Crumb | null {
    const labelMap: Record<string, string> = {
      'groups': 'Grupper',
      'create': 'Skapa',
      'students': 'Deltagare',
      'courses': 'Kurser',
      'settings': 'Inställningar',
      'overview': 'Översikt',
      'checklist': 'Checklistor',
      'kalender': 'Kalender',
      'teams': 'Redigera lag',
    };
    return labelMap[segment]
      ? { label: labelMap[segment], url }
      : null;
  }
}
