/* tslint:disable:no-unused-variable */
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageScrollService } from 'ng2-page-scroll';
import { fromJS, List } from 'immutable';
import { NgbAccordionConfig, NgbAccordionModule, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { fullTwigletMap, fullTwigletModelMap } from '../../non-angular/testHelpers';
import { ImmutableMapOfMapsPipe } from './../immutable-map-of-maps.pipe';
import { NodeInfoComponent } from './../twiglets/node-info/node-info.component';
import { NodeSearchPipe } from './../node-search.pipe';
import { ObjectSortPipe } from './../object-sort.pipe';
import { FilterNodesPipe } from './../filter-nodes.pipe';
import { RightSideBarComponent } from './right-side-bar.component';
import { stateServiceStub, pageScrollService } from '../../non-angular/testHelpers';
import { StateService } from './../state.service';
import { TwigletNodeListComponent } from './../twiglets/twiglet-node-list/twiglet-node-list.component';

describe('RightSideBarComponent', () => {
  let compRef;
  let component: RightSideBarComponent;
  let fixture: ComponentFixture<RightSideBarComponent>;
  const stateServiceStubbed = stateServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterNodesPipe,
        ImmutableMapOfMapsPipe,
        NodeInfoComponent,
        NodeSearchPipe,
        ObjectSortPipe,
        RightSideBarComponent,
        TwigletNodeListComponent,
      ],
      imports: [ NgbAccordionModule ],
      providers: [
        NgbAccordionConfig,
        { provide: PageScrollService, useValue: pageScrollService },
        { provide: StateService, useValue: stateServiceStubbed },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideBarComponent);
    compRef = fixture.componentRef.hostView['internalView']['compView_0'];
    component = fixture.componentInstance;
    component.twiglet = fullTwigletMap();
    component.twigletModel = fullTwigletModelMap();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('router sets appropriate mode', () => {
    it('shows the twiglets sidebar mode is twiglet', () => {
      component.userState = fromJS({
        currentNode: 'firstNode',
        filters: {
          attributes: [],
          types: {}
        },
        mode: 'twiglet',
        sortNodesAscending: 'true',
        sortNodesBy: 'type',
        textToFilterOn: '',
      });
      compRef.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('app-twiglet-node-list')).toBeTruthy();
    });

    it('shows a placeholder for models when mode is model', () => {
      component.userState = fromJS({ mode: 'model' });
      compRef.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('p').innerHTML).toContain('Model');
    });

    it('shows a placeholder for the home page the mode is home', () => {
      component.userState = fromJS({ mode: 'home' });
      compRef.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('p').innerHTML).toContain('Home');
    });
  });
});
