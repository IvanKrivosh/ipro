import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitulsComponent } from './tituls.component';

describe('TitulsComponent', () => {
  let component: TitulsComponent;
  let fixture: ComponentFixture<TitulsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitulsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitulsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
