import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(false);

  toggleTheme(): void {
    this.isDark.update((value) => !value);
    document.body.classList.toggle('dark-theme', this.isDark());
  }
}
