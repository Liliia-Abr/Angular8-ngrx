import {Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getListItems } from '../../store/actions/list-items.actions';
import * as fromRoot from '../../store/reducers/list-items.reducer';
import * as selectors from '../../store/selectors/list-items.selectors';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    itemsList$: Observable<any>;
    loading$: Observable<boolean>;

    constructor(
        private store: Store<fromRoot.ListItemsState>
    ) {
        this.store.dispatch(getListItems());
        this.itemsList$ = this.store.pipe(select(selectors.getEntities));
        this.loading$ = this.store.pipe(select(selectors.getStatusLoading));
    }

    ngOnInit() {}

}
