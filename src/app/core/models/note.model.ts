export type NoteType = 'text' | 'checklist' | 'voice';
export type SyncStatus = 'synced' | 'pending' | 'failed';

export interface Note {
  id?: string;
  title: string;
  content: string;
  type: NoteType;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  syncStatus: SyncStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id?: string;
  noteId: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface VoiceAttachment {
  id?: string;
  noteId: string;
  blob: Blob;
  duration: number;
  createdAt: string;
}

export interface SyncQueueItem {
  id?: string;
  entity: 'note' | 'checklistItem' | 'voiceAttachment';
  entityId: string;
  action: 'create' | 'update' | 'delete';
  payload: unknown;
  createdAt: string;
}

export interface UserSettings {
  id?: string;
  darkMode: boolean;
}
