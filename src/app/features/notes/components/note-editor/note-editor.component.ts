import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../../core/models/note.model';
import { NotesService } from '../../../../core/services/notes.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [NgIf, FormsModule, DatePipe],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss',
})
export class NoteEditorComponent {
  @Output() createNoteClicked = new EventEmitter<void>();

  note: Note | null = null;
  saveTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private notesService: NotesService) {}

  async loadNote(noteId: string): Promise<void> {
    this.flushPendingSave();
    this.note = (await this.notesService.getNote(noteId)) ?? null;
  }

  clearNote(): void {
    this.flushPendingSave();
    this.note = null;
  }

  scheduleSave(): void {
    if (!this.note?.id) return;

    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }

    this.saveTimer = setTimeout(() => {
      void this.saveNote();
    }, 500);
  }

  async saveNote(): Promise<void> {
    if (!this.note?.id) return;

    await this.notesService.updateNote(this.note.id, {
      title: this.note.title.trim() || 'Untitled note',
      content: this.note.content,
    });
  }

  requestCreateNote(): void {
    this.createNoteClicked.emit();
  }

  private flushPendingSave(): void {
    if (!this.saveTimer) return;

    clearTimeout(this.saveTimer);
    this.saveTimer = null;
    void this.saveNote();
  }
}
