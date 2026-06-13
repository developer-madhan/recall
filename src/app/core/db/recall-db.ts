import Dexie, { Table } from 'dexie';
import { Note } from '../../models/note.model';

export class RecallDB extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('RecallDB');

    this.version(1).stores({
      notes: 'id, title, updatedAt'
    });
  }
}

export const db = new RecallDB();
