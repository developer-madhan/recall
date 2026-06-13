import { Component, ViewChild } from '@angular/core';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import { NoteListComponent } from '../../components/note-list/note-list.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [
    SidebarComponent,
    NoteListComponent,
    NoteEditorComponent,
  ],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent {
  @ViewChild(NoteEditorComponent)
  noteEditor!: NoteEditorComponent;

  onNoteSelected(noteId: string): void {
    this.noteEditor.loadNote(noteId);
  }
}
