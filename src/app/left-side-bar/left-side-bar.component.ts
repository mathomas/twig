import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { List, Map, OrderedMap } from 'immutable';

import { StateService } from './../state.service';

@Component({
  selector: 'app-left-side-bar',
  styleUrls: ['./left-side-bar.component.scss'],
  templateUrl: './left-side-bar.component.html',
})
export class LeftSideBarComponent {
  twiglet: Map<string, any> = Map({});
  model: Map<string, any> = Map({});
  userState: Map<string, any> = Map({});
  events: OrderedMap<string, Map<string, any>>;
  sequences;
  views;

  constructor(private stateService: StateService, private cd: ChangeDetectorRef) {
    stateService.userState.observable.subscribe(userState => {
      this.userState = userState;
      this.cd.markForCheck();
    });

    stateService.twiglet.observable.subscribe(twiglet => {
      this.twiglet = twiglet;
      this.cd.markForCheck();
    });

    stateService.model.observable.subscribe(model => {
      this.model = model;
      this.cd.markForCheck();
    });

    stateService.twiglet.viewService.observable.subscribe(views => {
      this.views = views;
      this.cd.markForCheck();
    });

    stateService.twiglet.eventsService.events.subscribe(events => {
      this.events = events;
    });

    stateService.twiglet.eventsService.sequences.subscribe(sequences => {
      this.sequences = sequences;
    });
  };

}
