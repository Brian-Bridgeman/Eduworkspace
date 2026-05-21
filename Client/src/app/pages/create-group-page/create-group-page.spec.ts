import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupPage } from './create-group-page';

describe('CreateGroupPage', () => {
  let component: CreateGroupPage;
  let fixture: ComponentFixture<CreateGroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroupPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGroupPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
