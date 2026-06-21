import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SettingsService } from '../../../../core/services/settings.service';
import { OnlineStatusService } from '../../../../core/services/online-status.service';
import { SyncService } from '../../../../core/services/sync.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly settingsService = inject(SettingsService);
  readonly onlineStatus = inject(OnlineStatusService);
  readonly syncService = inject(SyncService);

  @Output() createNoteClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();

  readonly darkMode$ = this.settingsService.darkMode$;

  createNote(): void {
    this.createNoteClicked.emit();
  }

  onSearch(value: string): void {
    this.searchChanged.emit(value);
  }

  async toggleDarkMode(): Promise<void> {
    await this.settingsService.toggleDarkMode();
  }
}