import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { StateService } from '../state.service';
import { userStateServiceResponseToObject } from '../../non-angular/services-helpers';
import { D3Node, ModelEntity, UserState } from '../../non-angular/interfaces';
import { getColorFor, getNodeImage } from '../twiglet-graph/nodeAttributesToDOMAttributes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-edit',
  styleUrls: ['./header-edit.component.scss'],
  templateUrl: './header-edit.component.html',
})
export class HeaderEditComponent implements OnInit {
  userState: UserState;

  private model = { entities: {} };

  constructor(private stateService: StateService, private cd: ChangeDetectorRef) {
    this.stateService.twiglet.modelService.observable.subscribe(response => {
      this.model = response.toJS();
      this.cd.markForCheck();
    });
    this.stateService.userState.observable.subscribe(response => {
      userStateServiceResponseToObject.bind(this)(response);
      this.cd.markForCheck();
    });
  }

  ngOnInit() {

  }

  discardChanges() {
    this.stateService.userState.setEditing(false);
  }

}
