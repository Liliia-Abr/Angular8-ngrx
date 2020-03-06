import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';

const MATERIAL_MODULES = [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ...MATERIAL_MODULES
    ],
    providers: [MatDatepickerModule],
    exports: [...MATERIAL_MODULES]
})
export class MaterialModule { }
