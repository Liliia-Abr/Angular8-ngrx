import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ListComponent } from './components/list/list.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { listItemsReducer } from './store/reducers/list-items.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ListItemsEffects } from './store/effects/list-items.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { CrudModalComponent } from './components/crud-modal/crud-modal.component';
import { ListItemEditBtnComponent } from './components/list/list-item/list-item-edit-btn/list-item-edit-btn.component';
import { ListItemDeleteBtnComponent } from './components/list/list-item/list-item-delete-btn/list-item-delete-btn.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

describe('AppComponent', () => {
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
