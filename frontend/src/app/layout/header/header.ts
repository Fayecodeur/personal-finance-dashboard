import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { ThemeService } from '../../core/services/theme';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() showMenuButton = false;
  @Output() menuClick = new EventEmitter<void>();

  constructor(
    private authService: Auth,
    private router: Router,
    public themeService: ThemeService,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
