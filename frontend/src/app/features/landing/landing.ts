import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from '../../core/services/theme';
import { AuthDialog } from './auth-dialog/auth-dialog';

@Component({
  selector: 'app-landing',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  menuOpen = false;

  constructor(
    private dialog: MatDialog,
    public themeService: ThemeService,
  ) {}

  openAuth(mode: 'login' | 'register'): void {
    this.menuOpen = false;

    this.dialog.open(AuthDialog, {
      width: '400px',
      maxWidth: '95vw',
      data: { mode },
    });
  }
}
