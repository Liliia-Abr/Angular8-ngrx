import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../confirm/confirm.component';
import { switchMap, tap } from 'rxjs/operators';
import { IDataAfterClose } from '../../../../models/modal-data';
import { iif, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ListItemsState } from '../../../../store/reducers/list-items.reducer';
import { deleteListItems } from '../../../../store/actions/list-items.actions';
import { ListItem } from '../../../../models/list-item';

@Component({
  selector: 'app-list-item-delete-btn',
  templateUrl: './list-item-delete-btn.component.html',
  styleUrls: ['./list-item-delete-btn.component.scss']
})
export class ListItemDeleteBtnComponent {
    @Input() public item: ListItem;
    @Output() public afterCloseEmit = new EventEmitter<any>();

    constructor(
        private _dialogService: MatDialog,
        private store: Store<ListItemsState>
    ) { }

    public openConfirmDialog(): void {
        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.width = 'auto';
        matDialogConfig.height = 'auto';
        matDialogConfig.restoreFocus = false;
        matDialogConfig.data = {
            item: this.item
        };

        const dialog: MatDialogRef<ConfirmComponent> = this._dialogService.open(ConfirmComponent, matDialogConfig);

        dialog.afterClosed().pipe(
            switchMap((dataAfterClose: IDataAfterClose) => iif(
                () => dataAfterClose.isUpgrade,
                of(null).pipe(
                    tap(() => this.store.dispatch(deleteListItems({ listItem: this.item })))
                )
            ))
        ).subscribe();
    }
}
