import { Injectable } from '@angular/core';
import { db } from '../db/recall-db';
import { Note } from '../../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  async getNotes(): Promise<Note[]> {
    if (typeof indexedDB === 'undefined') {
      return [];
    }

    return db.notes.orderBy('updatedAt').reverse().toArray();
  }

  async addNote(note: Note): Promise<string> {
    if (typeof indexedDB === 'undefined') {
      return note.id;
    }

    await db.notes.add(note);
    return note.id;
  }

  async updateNote(note: Note): Promise<string> {
    if (typeof indexedDB === 'undefined') {
      return note.id;
    }

    await db.notes.put(note);
    return note.id;
  }

  async deleteNote(id: string): Promise<void> {
    if (typeof indexedDB === 'undefined') {
      return;
    }

    await db.notes.delete(id);
  }
}
