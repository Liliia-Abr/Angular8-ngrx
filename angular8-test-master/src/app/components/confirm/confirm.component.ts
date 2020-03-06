import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(
      private matDialogRef: MatDialogRef<ConfirmComponent>
  ) { }

  public closeDialog(status: boolean): void {
      this.matDialogRef.close({ isUpgrade: status });
  }
}
