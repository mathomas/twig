/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StateService, StateServiceStub } from '../state.service';
import { FontAwesomeToggleButtonComponent } from '../font-awesome-toggle-button/font-awesome-toggle-button.component';
import { HeaderEnvironmentComponent } from './header-environment.component';

describe('HeaderEnvironmentComponent', () => {
  let component: HeaderEnvironmentComponent;
  let fixture: ComponentFixture<HeaderEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontAwesomeToggleButtonComponent, HeaderEnvironmentComponent ],
      providers: [ { provide: StateService, useValue: new StateServiceStub()} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});