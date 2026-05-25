import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export interface User {
  id: number;
  name: string;
  role: string;
  avatarInitials: string;
  arbetslag: number | null;
}

export interface Arbetslag {
  id: number;
  name: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-edit-teams-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-teams-page.html',
  styleUrl: './edit-teams-page.css',
})
export class EditTeamsPage {
  numberOfArberslag: number = 0;
  groupId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
  }

  // TODO: hämta användare i grupp från backend
  users: User[] = [
    { id: 1, name: 'Anna Lindström', role: 'Tekniker', avatarInitials: 'AL', arbetslag: null },
    { id: 2, name: 'Erik Johansson', role: 'Tekniker', avatarInitials: 'EJ', arbetslag: null },
    { id: 3, name: 'Maria Svensson', role: 'Tekniker', avatarInitials: 'MS', arbetslag: null },
    { id: 4, name: 'Johan Karlsson', role: 'Tekniker', avatarInitials: 'JK', arbetslag: null },
    { id: 5, name: 'Sara Nilsson', role: 'Tekniker', avatarInitials: 'SN', arbetslag: null },
    { id: 6, name: 'Mikael Eriksson', role: 'Tekniker', avatarInitials: 'ME', arbetslag: null },
    { id: 7, name: 'Karin Larsson', role: 'Tekniker', avatarInitials: 'KL', arbetslag: null },
    { id: 8, name: 'Anders Persson', role: 'Tekniker', avatarInitials: 'AP', arbetslag: null },
    { id: 9, name: 'Lena Olsson', role: 'Tekniker', avatarInitials: 'LO', arbetslag: null },
    { id: 10, name: 'Peter Gustafsson', role: 'Tekniker', avatarInitials: 'PG', arbetslag: null },
  ];

  // TODO: hamta arbetslag fran databas
  arbetslag: Arbetslag[] = [
  ];

  get visibleArbetstlag(): Arbetslag[] {
    return this.arbetslag.slice(0, this.numberOfArberslag);
  }

  getMemberCount(arbetslagId: number): number {
    return this.users.filter(u => u.arbetslag === arbetslagId).length;
  }

  toggleArbetstlag(group: Arbetslag): void {
    group.isOpen = !group.isOpen;
  }

  isUserInArbetstlag(user: User, arbetslagId: number): boolean {
    return user.arbetslag === arbetslagId;
  }

  toggleUserInArbetstlag(user: User, arbetslagId: number): void {
    user.arbetslag = user.arbetslag == arbetslagId ? null : arbetslagId;
  }

  getArbetstlagLabel(user: User): string {
    if (user.arbetslag === null) return 'Ej tilldelad';
    return `Arbetslag ${user.arbetslag}`;
  }

  onNumberChange(value: number): void {
    this.numberOfArberslag = Math.max(1, Math.min(10, value));
    while (this.arbetslag.length < this.numberOfArberslag) {
      const nextId = this.arbetslag.length + 1;
      this.arbetslag.push({ id: nextId, name: `Arbetslag ${nextId}`, isOpen: false });
    }
  }

  save() {
    // TODO: spara arbetslag i databas
    this.router.navigate([`/groups/${this.groupId}`])
  }
}
