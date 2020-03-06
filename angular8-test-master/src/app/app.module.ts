import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListComponent} from './components/list/list.component';
import {ListItemComponent} from './components/list/list-item/list-item.component';
import {CrudModalComponent} from './components/crud-modal/crud-modal.component';
import {StoreModule} from '@ngrx/store';
import {listItemsReducer} from './store/reducers/list-items.reducer';
import {EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {ListItemsEffects} from './store/effects/list-items.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ListItemEditBtnComponent } from './components/list/list-item/list-item-edit-btn/list-item-edit-btn.component';
import { ListItemDeleteBtnComponent } from './components/list/list-item/list-item-delete-btn/list-item-delete-btn.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        ListItemComponent,
        CrudModalComponent,
        ListItemEditBtnComponent,
        ListItemDeleteBtnComponent,
        ConfirmComponent,
        AddEntityComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        StoreModule.forRoot({itemsState: listItemsReducer}),
        EffectsModule.forRoot([ListItemsEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [CrudModalComponent, ConfirmComponent]
})
export class AppModule {
}
