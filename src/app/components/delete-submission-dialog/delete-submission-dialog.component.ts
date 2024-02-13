import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-submission-dialog',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './delete-submission-dialog.component.html',
})
export class DeleteSubmissionDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteSubmissionDialogComponent>);

  reject() {
    this.dialogRef.close(false);
  }

  accept() {
    this.dialogRef.close(true);
  }
}
