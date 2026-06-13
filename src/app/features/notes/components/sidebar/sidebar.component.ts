import { Component, EventEmitter, Output } from '@angular/core';

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

  darkMode = true;

  createNote(): void {
    this.createNoteClicked.emit();
  }

  onSearch(value: string): void {
    this.searchChanged.emit(value);
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
