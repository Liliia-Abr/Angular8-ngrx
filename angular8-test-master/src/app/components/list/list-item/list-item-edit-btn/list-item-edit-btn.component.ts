import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem } from '../../../../models/list-item';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CrudModalComponent } from '../../../crud-modal/crud-modal.component';
import { IDataAfterClose, IModalData } from '../../../../models/modal-data';

@Component({
  selector: 'app-list-item-edit-btn',
  templateUrl: './list-item-edit-btn.component.html',
  styleUrls: ['./list-item-edit-btn.component.scss']
})
export class ListItemEditBtnComponent {
    @Input() public item: ListItem;
    @Output() public afterCloseEmit = new EventEmitter<any>();

    constructor(
        private _dialogService: MatDialog
    ) { }

    public openModalEdit(): void {
        const dialogConfig = new MatDialogConfig<IModalData>();
        dialogConfig.width = '400px';
        dialogConfig.height = 'auto';
        dialogConfig.data = {
            item: this.item
        };

        const editDialog: MatDialogRef<CrudModalComponent> = this._dialogService.open(CrudModalComponent, dialogConfig);

        editDialog.afterClosed().subscribe((dataAfterClose: IDataAfterClose) => this.afterCloseEmit.next(dataAfterClose.isUpgrade));
    }
}
