import { AfterViewChecked, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';

import { GravityPoint } from './../../../non-angular/interfaces/userState/index';
import { StateService } from './../../state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-gravity-point-modal',
  styleUrls: ['./edit-gravity-point-modal.component.scss'],
  templateUrl: './edit-gravity-point-modal.component.html',
})
export class EditGravityPointModalComponent implements OnInit, AfterViewChecked, OnDestroy {
  gravityPoint: GravityPoint;
  userStateSubscription: Subscription;
  gravityPointNames: Array<any>;
  form: FormGroup;
  formErrors = {
    name: '',
  };
  validationMessages = {
    name: {
      required: 'A name is required.',
      unique: 'Name already taken.',
    },
  };

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private stateService: StateService) { }

  ngOnInit() {
    this.buildForm();
    this.userStateSubscription = this.stateService.userState.observable.subscribe(userState => {
      const gravityPoints = userState.get('gravityPoints').toJS();
      this.gravityPointNames = Reflect.ownKeys(gravityPoints);
    });
  }

  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }

  buildForm() {
    const self = this;
    this.form = this.fb.group({
      name: ['', [Validators.required, this.validateUniqueName.bind(this)]],
    });
  }

  ngAfterViewChecked() {
    if (this.form) {
      this.form.valueChanges.subscribe(this.onValueChanged.bind(this));
    }
  }

  onValueChanged() {
    if (!this.form) { return; }
    const form = this.form;
    Reflect.ownKeys(this.formErrors).forEach((key: string) => {
      this.formErrors[key] = '';
      const control = form.get(key);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[key];
        Reflect.ownKeys(control.errors).forEach(error => {
          this.formErrors[key] = messages[error] + ' ';
        });
      }
    });
  }

  processForm() {
    this.gravityPoint.name = this.form.value.name;
    this.stateService.userState.addGravityPoint(this.gravityPoint);
    this.closeModal();
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  validateUniqueName(c: FormControl) {
    if (this.gravityPointNames) {
      if (this.gravityPointNames.includes(c.value)) {
        return {
          unique: {
            valid: false,
          }
        };
      }
    }
  }

}
