import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CrudModalComponent } from './crud-modal.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ListComponent } from '../list/list.component';
import { ListItemComponent } from '../list/list-item/list-item.component';
import { ListItemEditBtnComponent } from '../list/list-item/list-item-edit-btn/list-item-edit-btn.component';
import { ListItemDeleteBtnComponent } from '../list/list-item/list-item-delete-btn/list-item-delete-btn.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AddEntityComponent } from '../add-entity/add-entity.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { listItemsReducer } from 'src/app/store/reducers/list-items.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ListItemsEffects } from 'src/app/store/effects/list-items.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { of } from 'rxjs';
import { ListItem } from 'src/app/models/list-item';

describe('CrudModalComponent', () => {
  let component: CrudModalComponent;
  let fixture: ComponentFixture<CrudModalComponent>;
  const mockData: ListItem = { id: "test", title: '', description: '', date: new Date() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        StoreModule.forRoot({ itemsState: listItemsReducer }),
        EffectsModule.forRoot([ListItemsEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        BrowserAnimationsModule,
        MaterialModule],
      declarations: [AppComponent,
        ListComponent,
        ListItemComponent,
        CrudModalComponent,
        ListItemEditBtnComponent,
        ListItemDeleteBtnComponent,
        ConfirmComponent,
        AddEntityComponent],
      providers: [{
        provide: MatDialogRef, useValue: {
          backdropClick: () => of([1]),
          close: () => { of([1]) },
          keydownEvents: () => of([1]),
        }
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudModalComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title "Create dialog"', () => {
    const debugElement = fixture.debugElement;
    const cardTitle = debugElement.query(By.css('.mat-card-title > h3'));
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.nativeElement.textContent).toContain('Create dialog');
  });

  it('should render title "Edit dialog"', () => {
    component.data = mockData;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const cardTitle = debugElement.query(By.css('.mat-card-title > h3'));
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.nativeElement.textContent).toContain('Edit dialog');
  });

  it('should render "Create" and "Cancel" buttons', () => {
    const debugElement = fixture.debugElement;
    const createButton = debugElement.query(By.css('button.mat-primary > .mat-button-wrapper'));
    const cancelButton = debugElement.query(By.css('button.mat-warn > .mat-button-wrapper'));

    expect(createButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    expect(createButton.nativeElement.textContent).toContain('Create');
    expect(cancelButton.nativeElement.textContent).toContain('Cancel');
  });

  it('should render "Save" and "Cancel" buttons"', () => {
    component.data = mockData;
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const createButton = debugElement.query(By.css('button.mat-primary > .mat-button-wrapper'));
    const cancelButton = debugElement.query(By.css('button.mat-warn > .mat-button-wrapper'));

    expect(createButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    expect(createButton.nativeElement.textContent).toContain('Save');
    expect(cancelButton.nativeElement.textContent).toContain('Cancel');
  });

  it('should render "Create" button as disabled', () => {
    const debugElement = fixture.debugElement;
    const createButton = debugElement.query(By.css('button.mat-primary'));
    expect(createButton.attributes['disabled']).toBeTruthy();
  });

  it('should render "Edit" button as disabled', () => {
    component.data = mockData;
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const createButton = debugElement.query(By.css('button.mat-primary'));

    expect(createButton.attributes['disabled']).toBeTruthy();
  });

  it('should render "Create" button as enabled', () => {
    expect(component.form.valid).toBeFalsy();
    const title = component.form.controls['title'];
    const date = component.form.controls['date'];
    const description = component.form.controls['description'];

    title.setValue("Im a title");
    date.setValue(new Date());
    description.setValue('Im a description');
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const createButton = debugElement.query(By.css('button.mat-primary'));

    expect(createButton.attributes['disabled']).toBeFalsy();
  });

  it('should render "Edit" button as enabled', () => {
    component.data = mockData;
    fixture.detectChanges();

    const title = component.form.controls['title'];
    const date = component.form.controls['date'];
    const description = component.form.controls['description'];

    title.setValue("Im a title");
    date.setValue(new Date());
    description.setValue('Im a description');

    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const createButton = debugElement.query(By.css('button.mat-primary'));

    expect(createButton.attributes['disabled']).toBeFalsy();
  });

  it('should set form validation as "invalid"', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should require "title" field', () => {
    let errors = {};
    const title = component.form.controls['title'];
    errors = title.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('should require "date" field', () => {
    let errors = {};
    const date = component.form.controls['date'];
    errors = date.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('should set form as "invalid" because date is not valid', () => {
    const date = component.form.controls['date'];
    date.setValue("Im invalid date!");

    expect(component.form.valid).toBeFalsy();
  });

  it('should require "description" field', () => {
    let errors = {};
    const description = component.form.controls['description'];
    errors = description.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('should set form validation as "valid" and call "closeDialog"', () => {
    spyOn(component, 'closeDialog').and.callThrough();
    expect(component.form.valid).toBeFalsy();

    const title = component.form.controls['title'];
    const date = component.form.controls['date'];
    const description = component.form.controls['description'];

    title.setValue("Im a title");
    date.setValue(new Date());
    description.setValue('Im a description');
    
    expect(component.form.valid).toBeTruthy();

    component.action();
    expect(component.closeDialog).toHaveBeenCalled();
  });

});
