import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemEditBtnComponent } from './list-item-edit-btn.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { listItemsReducer } from 'src/app/store/reducers/list-items.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ListItemsEffects } from 'src/app/store/effects/list-items.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from 'src/app/app.component';
import { ListComponent } from '../../list.component';
import { ListItemComponent } from '../list-item.component';
import { CrudModalComponent } from 'src/app/components/crud-modal/crud-modal.component';
import { ListItemDeleteBtnComponent } from '../list-item-delete-btn/list-item-delete-btn.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { AddEntityComponent } from 'src/app/components/add-entity/add-entity.component';

describe('ListItemEditBtnComponent', () => {
  let component: ListItemEditBtnComponent;
  let fixture: ComponentFixture<ListItemEditBtnComponent>;

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
        AddEntityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemEditBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
