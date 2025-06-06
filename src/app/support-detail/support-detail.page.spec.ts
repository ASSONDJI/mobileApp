import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportDetailPage } from './support-detail.page';

describe('SupportDetailPage', () => {
  let component: SupportDetailPage;
  let fixture: ComponentFixture<SupportDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
