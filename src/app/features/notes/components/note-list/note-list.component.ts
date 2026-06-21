import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { Note } from '../../../../core/models/note.model';
import { NotesService } from '../../../../core/services/notes.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe, DatePipe],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  @Output() noteSelected = new EventEmitter<string>();
  @Output() noteDeleted = new EventEmitter<string>();

  private searchQuery$ = new BehaviorSubject<string>('');

  notes$: Observable<Note[]>;
  selectedNoteId: string | null = null;

  constructor(private notesService: NotesService) {
    this.notes$ = combineLatest([
      this.notesService.notes$,
      this.searchQuery$,
    ]).pipe(
      map(([notes, query]) => {
        const q = query.toLowerCase().trim();

        if (!q) return notes;

        return notes.filter(
          note =>
            note.title.toLowerCase().includes(q) ||
            note.content.toLowerCase().includes(q)
        );
      })
    );
  }

  search(query: string): void {
    this.searchQuery$.next(query);
  }

  selectNote(note: Note): void {
    if (!note.id) return;

    this.selectedNoteId = note.id;
    this.noteSelected.emit(note.id);
  }

  async createNote(): Promise<string> {
    const id = await this.notesService.createNote();

    this.selectedNoteId = id;
    this.noteSelected.emit(id);

    return id;
  }

  async deleteNote(event: MouseEvent, note: Note): Promise<void> {
    event.stopPropagation();

    if (!note.id) return;

    await this.notesService.deleteNote(note.id);

    if (this.selectedNoteId === note.id) {
      this.selectedNoteId = null;
      this.noteDeleted.emit(note.id);
    }
  }

  trackByNoteId(index: number, note: Note): string {
    return note.id ?? index.toString();
  }
}
