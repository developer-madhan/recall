import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import { NoteListComponent } from '../../components/note-list/note-list.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
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

  @ViewChild(NoteListComponent)
  noteList!: NoteListComponent;

  sidebarOpen = true;
  mobileListOpen = true;
  mobileSearchQuery = '';

  async createNote(): Promise<void> {
    const noteId = await this.noteList.createNote();
    await this.noteEditor.loadNote(noteId);
    this.mobileListOpen = false;
  }

  onSearchChanged(query: string): void {
    this.noteList.search(query);
  }

  async onNoteSelected(noteId: string): Promise<void> {
    await this.noteEditor.loadNote(noteId);
    this.mobileListOpen = false;
  }

  onNoteDeleted(): void {
    this.noteEditor.clearNote();
    this.mobileListOpen = true;
  }

  toggleMobileList(): void {
    this.mobileListOpen = !this.mobileListOpen;
  }
}
