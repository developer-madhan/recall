import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() createNoteClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();

  darkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode = document.documentElement.classList.contains('dark');
    }
  }

  createNote(): void {
    this.createNoteClicked.emit();
  }

  onSearch(value: string): void {
    this.searchChanged.emit(value);
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle('dark', this.darkMode);
    }
  }
}
