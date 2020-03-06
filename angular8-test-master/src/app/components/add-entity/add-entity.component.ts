import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { IDataAfterClose } from '../../models/modal-data';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent {
    @Output() public afterCloseEmit = new EventEmitter<any>();

    constructor(
      private _dialogService: MatDialog
    ) { }

  public openCreateModal(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '400px';
      dialogConfig.height = 'auto';

      const editDialog: MatDialogRef<CrudModalComponent> = this._dialogService.open(CrudModalComponent, dialogConfig);

      editDialog.afterClosed().subscribe((dataAfterClose: IDataAfterClose) => this.afterCloseEmit.next(dataAfterClose.isUpgrade));
  }
}
