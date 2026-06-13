import { Routes } from '@angular/router';
import { NotesPageComponent } from './features/notes/pages/notes-page/notes-page.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesPageComponent,
    title: 'Recall',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
