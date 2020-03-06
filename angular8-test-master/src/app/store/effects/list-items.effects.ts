import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
    createListItems,
    createListItemsFail, createListItemsSuccess, deleteListItems, deleteListItemsFail, deleteListItemsSuccess,
    getListItems, getListItemsFail,
    getListItemsSuccess, updateListItems, updateListItemsFail,
    updateListItemsSuccess
} from '../actions/list-items.actions';
import { catchError, delay, exhaustMap, map } from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';
import {of} from 'rxjs';
import {Action, Store} from '@ngrx/store';

@Injectable()
export class ListItemsEffects {

    constructor(private actions$: Actions,
                private storage: StorageService) {
    }

    getListItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getListItems),
            delay(500),
            exhaustMap(()  =>
                of(this.storage.getList()).pipe(
                    map(listItems => getListItemsSuccess({listItems})),
                    catchError(err => of(getListItemsFail(err)))
                )
            )
        )
    );

    createListItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createListItems),
            map(action => action.listItem),
            exhaustMap((payload) =>
                of(this.storage.createListItem(payload)).pipe(
                    map(listItem => createListItemsSuccess({listItem})),
                    catchError(err => of(createListItemsFail(err)))
                )
            )
        )
    );

    updateListItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateListItems),
            map(action => action.listItem),
            exhaustMap((payload) =>
                of(this.storage.updateListItem(payload)).pipe(
                    map(listItem => updateListItemsSuccess({listItem})),
                    catchError(err => of(updateListItemsFail(err)))
                )
            )
        )
    );

    deleteListItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteListItems),
            map(action => action.listItem),
            exhaustMap((payload) =>
                of(this.storage.deleteListItem(payload)).pipe(
                    map(listItem => deleteListItemsSuccess({listItem})),
                    catchError(err => of(deleteListItemsFail(err)))
                )
            )
        )
    );
}
