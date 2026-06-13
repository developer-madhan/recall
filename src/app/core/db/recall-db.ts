import Dexie, { Table } from 'dexie';
import {
  ChecklistItem,
  Note,
  SyncQueueItem,
  UserSettings,
  VoiceAttachment,
} from '../models/note.model';

export class RecallDb extends Dexie {
  notes!: Table<Note, string>;
  checklistItems!: Table<ChecklistItem, string>;
  voiceAttachments!: Table<VoiceAttachment, string>;
  syncQueue!: Table<SyncQueueItem, string>;
  userSettings!: Table<UserSettings, string>;

  constructor() {
    super('RecallDb');

    this.version(1).stores({
      notes: 'id, title, type, isPinned, isArchived, syncStatus, createdAt, updatedAt',
      checklistItems: 'id, noteId, completed, createdAt',
      voiceAttachments: 'id, noteId, createdAt',
      syncQueue: 'id, entity, entityId, action, createdAt',
      userSettings: 'id',
    });
  }
}

export const db = new RecallDb();
