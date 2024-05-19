import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightDataComponent } from './copyright-data.component';

describe('CopyrightDataComponent', () => {
  let component: CopyrightDataComponent;
  let fixture: ComponentFixture<CopyrightDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyrightDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyrightDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
