import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyEditorComponent } from './vacancy-editor.component';

describe('VacancyEditorComponent', () => {
  let component: VacancyEditorComponent;
  let fixture: ComponentFixture<VacancyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
