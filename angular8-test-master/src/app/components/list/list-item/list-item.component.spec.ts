import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { ListItemEditBtnComponent } from '../list-item/list-item-edit-btn/list-item-edit-btn.component';
import { ListItemDeleteBtnComponent } from '../list-item/list-item-delete-btn/list-item-delete-btn.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserModule, By } from '@angular/platform-browser';
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
import { ListComponent } from '../list.component';
import { CrudModalComponent } from '../../crud-modal/crud-modal.component';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { AddEntityComponent } from '../../add-entity/add-entity.component';
import { ListItem } from 'src/app/models/list-item';

describe('ListItemComponent', () => {
  const currDate = new Date();
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  const mockData: ListItem = { id: "test", title: 'Im a title', description: 'Im a description', date: currDate };

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render passed data into component and action buttons', () => {
    const debugElement = fixture.debugElement;
    component.item = mockData;
    fixture.detectChanges();
    const itemTitle = debugElement.query(By.css('.mat-card-title > .title'));
    const itemDate = debugElement.query(By.css('.mat-card-title > .date'));
    const itemDescription = debugElement.query(By.css('.mat-card-content > .description'));
    const itemActionEditButton = debugElement.queryAll(By.css('button > span'))[0];
    const itemActionDeleteButton = debugElement.queryAll(By.css('button > span'))[1];

    expect(itemTitle).toBeTruthy();
    expect(itemDate).toBeTruthy();
    expect(itemDescription).toBeTruthy();
    expect(itemActionEditButton).toBeTruthy();
    expect(itemActionDeleteButton).toBeTruthy();

    expect(itemTitle.nativeElement.textContent).toContain(mockData.title);
    expect(itemDate.nativeElement.textContent).toContain(mockData.date);
    expect(itemDescription.nativeElement.textContent).toContain(mockData.description);
    expect(itemActionEditButton.nativeElement.textContent).toContain("Edit");
    expect(itemActionDeleteButton.nativeElement.textContent).toContain("Delete");
  });

});
