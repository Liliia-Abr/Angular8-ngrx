import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IModalData } from '../../models/modal-data';
import { ListItem } from '../../models/list-item';
import { merge } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ListItemsState } from '../../store/reducers/list-items.reducer';
import { updateListItems, createListItems } from '../../store/actions/list-items.actions';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as selectors from '../../store/selectors/list-items.selectors';

const DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
};

@Component({
    selector: 'app-crud-modal',
    templateUrl: './crud-modal.component.html',
    styleUrls: ['./crud-modal.component.scss'],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: DATE_FORMATS
        }
    ]
})
export class CrudModalComponent implements OnInit {
    public data: ListItem;
    public form: FormGroup;

    constructor(
      @Inject(MAT_DIALOG_DATA) private _data: IModalData,
      private matDialogRef: MatDialogRef<CrudModalComponent>,
      private store: Store<ListItemsState>,
      private _fb: FormBuilder
    ) {
        this.data = Object.assign({}, this._data && this._data.item);
    }

    public ngOnInit() {
        this._watchDialogEvents();
        this._buildForm();
    }

    private _buildForm(): void {
        this.form = this._fb.group({
            title: [this.data.title || '', Validators.compose([Validators.required, Validators.minLength(2)])],
            description: [this.data.description || '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
            date: [this.data.date || '', Validators.compose([Validators.required])]
        });
    }

    private _watchDialogEvents(): void {
        merge(
            this.matDialogRef.backdropClick(),
            this.matDialogRef.keydownEvents().pipe(
                filter((result: KeyboardEvent) => result.code === 'Escape')
            )
        ).subscribe(() => this.closeDialog());
    }

    public action(): void {
        if (this.form.valid) {
            if (this.data.id) {
                this.store.dispatch(updateListItems({listItem: {
                        ...this.form.value,
                        id: this.data.id
                    }}
                ));
            } else {
                this.store.pipe(select(selectors.getMaxEntityId)).pipe(
                    take(1),
                    tap((maxId: number) => {
                        this.store.dispatch(createListItems({listItem: {
                                ...this.form.value,
                                id: maxId + 1
                            }}
                        ))
                    })
                ).subscribe();
            }

            this.closeDialog(true);
        }
    }

    public closeDialog(status?: boolean): void {
        this.matDialogRef.close({
            isUpdate: status
        });
    }
}
