import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    id: string;
    pk: string;
    title: string;
    message: string;
    object: any;
}


@Component({
    selector: 'dialog-delete',
    templateUrl: 'dialog-delete.component.html',
})
export class DialogDeleteComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    cancel(): void {
        this.dialogRef.close();
    }
}