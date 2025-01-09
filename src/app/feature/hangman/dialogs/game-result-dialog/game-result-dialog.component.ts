import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-game-result-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './game-result-dialog.component.html',
  standalone: true,
  styleUrl: './game-result-dialog.component.scss',
})
export class GameResultDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
