import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['app-toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['app-toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
