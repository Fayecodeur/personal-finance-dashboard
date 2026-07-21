import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSidenavModule, Header, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  isMobile = signal(false);
  sidenavOpened = signal(true);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile.set(result.matches);
      this.sidenavOpened.set(!result.matches);
    });
  }

  toggleSidenav(): void {
    this.sidenavOpened.update((v) => !v);
  }
}
