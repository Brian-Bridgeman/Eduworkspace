import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateHeaderComponent } from './template-header';

describe('TemplateHeaderComponent', () => {
  let component: TemplateHeaderComponent;
  let fixture: ComponentFixture<TemplateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
