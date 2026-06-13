import { Component } from '@angular/core';
import { NotesPageComponent } from './features/notes/pages/notes-page/notes-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotesPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
