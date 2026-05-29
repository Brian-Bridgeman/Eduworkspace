import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Crumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private crumbs = new BehaviorSubject<Crumb[]>([]);
  breadcrumbs$ = this.crumbs.asObservable();

  set(crumbs: Crumb[]) {
    this.crumbs.next(crumbs);
  }
}
