import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../../core/models/note.model';
import { NotesService } from '../../../../core/services/notes.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss',
})
export class NoteEditorComponent {
  note: Note | null = null;
  saveTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private notesService: NotesService) {}

  async loadNote(noteId: string): Promise<void> {
    const note = await this.notesService.getNote(noteId);
    this.note = note ?? null;
  }

  scheduleSave(): void {
    if (!this.note?.id) return;

    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }

    this.saveTimer = setTimeout(() => {
      this.saveNote();
    }, 500);
  }

  async saveNote(): Promise<void> {
    if (!this.note?.id) return;

    await this.notesService.updateNote(this.note.id, {
      title: this.note.title,
      content: this.note.content,
    });
  }
}
