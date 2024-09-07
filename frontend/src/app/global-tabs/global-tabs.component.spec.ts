import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTabsComponent } from './global-tabs.component';

describe('GlobalTabsComponent', () => {
  let component: GlobalTabsComponent;
  let fixture: ComponentFixture<GlobalTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
