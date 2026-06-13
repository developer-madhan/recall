import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from './models/note.model';
import { NotesService } from './core/services/notes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  searchText = '';

  constructor(
    private notesService: NotesService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadNotes();
    }
  }

  async loadNotes() {
    this.notes = await this.notesService.getNotes();

    if (this.notes.length === 0) {
      await this.createNote();
      return;
    }

    this.selectedNote = this.notes[0];
  }

  async createNote() {
    const note: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      syncStatus: 'pending',
    };

    await this.notesService.addNote(note);
    await this.loadNotes();
    this.selectedNote = note;
  }

  async saveNote() {
    if (!this.selectedNote) return;

    this.selectedNote.updatedAt = new Date();
    this.selectedNote.syncStatus = 'pending';

    await this.notesService.updateNote(this.selectedNote);
    await this.loadNotes();
  }

  selectNote(note: Note) {
    this.selectedNote = note;
  }

  filteredNotes() {
    const q = this.searchText.toLowerCase();

    return this.notes.filter(
      note =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }
}
