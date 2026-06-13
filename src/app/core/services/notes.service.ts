import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from '../db/recall-db';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes$ = liveQuery(() =>
    db.notes
      .where('isArchived')
      .equals(0)
      .reverse()
      .sortBy('updatedAt')
  );

  async createNote(): Promise<string> {
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
    await this.addToSyncQueue(note.id!, 'create', note);

    return note.id!;
  }

  async getNote(id: string): Promise<Note | undefined> {
    return db.notes.get(id);
  }

  async updateNote(id: string, changes: Partial<Note>): Promise<void> {
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
    const note = await db.notes.get(id);

    await db.notes.delete(id);
    await db.checklistItems.where('noteId').equals(id).delete();
    await db.voiceAttachments.where('noteId').equals(id).delete();

    if (note) {
      await this.addToSyncQueue(id, 'delete', note);
    }
  }

  async searchNotes(query: string): Promise<Note[]> {
    const q = query.toLowerCase().trim();

    if (!q) {
      return db.notes
        .where('isArchived')
        .equals(0)
        .reverse()
        .sortBy('updatedAt');
    }

    const notes = await db.notes
      .where('isArchived')
      .equals(0)
      .toArray();

    return notes.filter(
      note =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }

  async togglePin(note: Note): Promise<void> {
    await this.updateNote(note.id!, {
      isPinned: !note.isPinned,
    });
  }

  private async addToSyncQueue(
    entityId: string,
    action: 'create' | 'update' | 'delete',
    payload: unknown
  ): Promise<void> {
    await db.syncQueue.add({
      id: crypto.randomUUID(),
      entity: 'note',
      entityId,
      action,
      payload,
      createdAt: new Date().toISOString(),
    });
  }
}
