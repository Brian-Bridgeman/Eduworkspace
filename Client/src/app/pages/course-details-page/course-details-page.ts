import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateHeaderComponent } from '../../components/template-header/template-header';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { OverviewSection } from '../../components/overview-section/overview-section';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { firstValueFrom } from 'rxjs';
import { Client } from '../../services/api-client.service';
import { CourseSessionDto } from '../../services/api-client.service';

@Component({
  selector: 'app-course-details-page',
  imports: [CommonModule, TemplateHeaderComponent, DropdownMenu, RouterLink, OverviewSection],
  templateUrl: './course-details-page.html',
  styleUrl: './course-details-page.css',
})
export class CourseDetailsPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private client: Client,
  ) { }

  courseId = signal<number>(1);
  searchTerm = signal('');
  sessions = signal<CourseSessionDto[]>([]);

  courseName = signal('');

  filteredSessions = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.sessions().filter(session =>
      (session.name ?? '').toLowerCase().includes(term) ||
      (session.courseName ?? '').toLowerCase().includes(term) ||
      (session.location ?? '').toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.courseId.set(id);

      this.loadSessions();
    });

    this.breadcrumbService.set([
      { label: 'Kurser', url: '/courses' }
    ]);
  }

  navigateToCreateGroup() {
    this.router.navigate(['/groups/create']);
  }

  async loadSessions() {
    const sessions = await firstValueFrom(
      this.client.getApiCoursesSessions(this.courseId())
    );

    this.sessions.set(sessions);

    this.courseName.set(sessions[0]?.courseName ?? '');
  }

  async removeSession(sessionId: number) {
    await firstValueFrom(
      this.client.deleteApiCoursesSessions(this.courseId(), sessionId)
    );

    this.sessions.update(s =>
      s.filter(x => x.id !== sessionId)
    );
  }
}
