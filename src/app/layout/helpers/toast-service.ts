import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) { }

    showSuccess(message: string): void {
        const config = new MatSnackBarConfig();
        config.duration = 3000;
        config.horizontalPosition = "end";
        config.verticalPosition = "top";
        config.panelClass = "success-toast";
        this.snackBar.open(message, 'Close', config);
    }
}