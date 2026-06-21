import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { db } from '../db/recall-db';
import { UserSettings } from '../models/note.model';

const SETTINGS_ID = 'default';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly darkModeSubject = new BehaviorSubject<boolean>(false);
  readonly darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    void this.loadSettings();
  }

  async loadSettings(): Promise<UserSettings> {
    const settings =
      (await db.userSettings.get(SETTINGS_ID)) ??
      (await this.createDefaultSettings());

    this.darkModeSubject.next(settings.darkMode);
    this.applyDarkMode(settings.darkMode);

    return settings;
  }

  async setDarkMode(darkMode: boolean): Promise<void> {
    await db.userSettings.put({
      id: SETTINGS_ID,
      darkMode,
    });

    this.darkModeSubject.next(darkMode);
    this.applyDarkMode(darkMode);
  }

  async toggleDarkMode(): Promise<boolean> {
    const nextValue = !this.darkModeSubject.value;
    await this.setDarkMode(nextValue);
    return nextValue;
  }

  private async createDefaultSettings(): Promise<UserSettings> {
    const prefersDark =
      isPlatformBrowser(this.platformId) &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    const settings: UserSettings = {
      id: SETTINGS_ID,
      darkMode: prefersDark,
    };

    await db.userSettings.put(settings);
    return settings;
  }

  private applyDarkMode(darkMode: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.classList.toggle('dark', darkMode);
  }
}
