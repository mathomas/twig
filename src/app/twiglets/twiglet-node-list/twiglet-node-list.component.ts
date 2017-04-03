import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Map } from 'immutable';
import { PageScrollConfig, PageScrollInstance, PageScrollService } from 'ng2-page-scroll';
import { clone } from 'ramda';

import { D3Node, ModelEntity, UserState } from '../../../non-angular/interfaces';
import { StateService } from '../../state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-twiglet-node-list',
  styleUrls: ['./twiglet-node-list.component.scss'],
  templateUrl: './twiglet-node-list.component.html',
})
export class TwigletNodeListComponent implements OnChanges, OnInit {

  @Input() twigletModel: Map<string, any> = Map({});
  @Input() userState = Map({});
  @Input() twiglet: Map<string, any> = Map({});
  nodesArray = [];


  constructor(private stateService: StateService,
              private elementRef: ElementRef,
              private cd: ChangeDetectorRef) {
    PageScrollConfig.defaultDuration = 250;
  }

  ngOnInit() {
    if (!this.userState.get('currentNode')) {
      this.userState = this.userState.set('currentNode', '');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.twiglet && changes.twiglet.currentValue !== changes.twiglet.previousValue) {
      const nodesObject = this.twiglet.get('nodes').reduce((object, node) => {
        const type = node.get('type');
        if (object[type]) {
          object[type].push(node);
        } else {
          object[type] = [node];
        }
        return object;
      }, {});
      this.nodesArray = Reflect.ownKeys(nodesObject).map(type =>
        [this.getTypeInfo(type), nodesObject[type]]
      ).sort((a, b) => a[0].type > b[0].type ? 1 : -1);
      console.log(this.nodesArray);
      this.cd.markForCheck();
    }
  }

  getTypeInfo(type) {
    const entity = this.twigletModel.getIn(['entities', type]);
    return {
      type,
      color: entity.get('color'),
      icon: entity.get('class'),
    };
  }
}
