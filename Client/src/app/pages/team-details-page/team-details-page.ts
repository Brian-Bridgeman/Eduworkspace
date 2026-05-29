import { Component } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-details-page',
  imports: [],
  templateUrl: './team-details-page.html',
  styleUrl: './team-details-page.css',
})
export class TeamDetailsPage {
  groupId: string | null = null;
  teamId: string | null = null;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.teamId = this.route.snapshot.paramMap.get('teamId');
  }

  ngOnInit(): void {
      setTimeout(() => {
      this.breadcrumbService.set([
        {label: "Grupper", url: "/groups"},
        {label: "H1 26", url: `/groups/${this.groupId}`},
        {label: "Oscar & Johan", url: `/groups/${this.groupId}/teams/`}
      ])
    });
  }
}
