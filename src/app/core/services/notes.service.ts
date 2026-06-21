import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { liveQuery } from 'dexie';
import { db } from '../db/recall-db';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  readonly notes$: Observable<Note[]>;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.notes$ = this.isBrowser
      ? (liveQuery(async () => {
          const notes = await db.notes
            .filter((note) => note.isArchived === false)
            .toArray();

          return notes.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          );
        }) as unknown as Observable<Note[]>)
      : of([]);
  }

  async createNote(): Promise<string> {
    this.assertBrowserDb();

    const now = new Date().toISOString();

    const note: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled note',
      content: '',
      type: 'text',
      tags: [],
      isPinned: false,
      isArchived: false,
      syncStatus: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    await db.notes.add(note);
    await this.addToSyncQueue(note.id, 'create', note);

    return note.id;
  }

  getNote(id: string): Promise<Note | undefined> {
    if (!this.isBrowser) return Promise.resolve(undefined);

    return db.notes.get(id);
  }

  async updateNote(id: string, changes: Partial<Note>): Promise<void> {
    if (!this.isBrowser) return;

    const updatedAt = new Date().toISOString();

    await db.notes.update(id, {
      ...changes,
      updatedAt,
      syncStatus: 'pending',
    });

    const note = await db.notes.get(id);

    if (note) {
      await this.addToSyncQueue(id, 'update', note);
    }
  }

  async deleteNote(id: string): Promise<void> {
    if (!this.isBrowser) return;

    const note = await db.notes.get(id);

    await db.notes.delete(id);
    await db.checklistItems.where('noteId').equals(id).delete();
    await db.voiceAttachments.where('noteId').equals(id).delete();

    if (note) {
      await this.addToSyncQueue(id, 'delete', note);
    }
  }

  private async addToSyncQueue(
    entityId: string,
    action: 'create' | 'update' | 'delete',
    payload: unknown,
  ): Promise<void> {
    if (!this.isBrowser) return;

    await db.syncQueue.add({
      id: crypto.randomUUID(),
      entity: 'note',
      entityId,
      action,
      payload,
      createdAt: new Date().toISOString(),
    });
  }

  private assertBrowserDb(): void {
    if (!this.isBrowser) {
      throw new Error('IndexedDB is only available in the browser.');
    }
  }
}
