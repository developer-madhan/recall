# Recall

> Offline-first note taking with sync, voice notes, checklists, and exports.

Recall is a Progressive Web App (PWA) built with Angular, Tailwind CSS, and IndexedDB. It allows users to create, edit, organize, search, and export notes while working completely offline.

---

## Features

### Phase 1 (Current)

✅ Responsive layout

✅ Sidebar navigation

✅ Notes list

✅ Note editor

✅ IndexedDB local storage

✅ Auto-save notes

✅ Full-text search

✅ Dark mode

---

## Planned Features

### Phase 2

- PWA configuration
- Installable app
- Service Worker
- Offline caching
- Manifest configuration

### Phase 3

- Sync queue
- Online/offline detection
- Background synchronization
- Sync status indicators

### Phase 4

- Checklist notes
- Voice recording
- Voice playback

### Phase 5

- PDF export
- Word export
- Conflict resolution
- Accessibility improvements
- Production deployment

---

## Tech Stack

- Angular 19
- TypeScript
- Tailwind CSS
- Dexie.js
- IndexedDB
- Angular Service Worker
- MediaRecorder API
- jsPDF
- docx

---

## Project Structure

```text
src/
│
├── app/
│   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── features/
│   │   └── notes/
│   │       ├── components/
│   │       └── pages/
│   │
│   └── shared/
│       └── components/
│
└── assets/
```

---

## Development

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

## Build

```bash
ng build
```

Production files will be generated in:

```text
dist/
```

---

## IndexedDB

Database:

```text
RecallDb
```

Stores:

```text
notes
checklistItems
voiceAttachments
syncQueue
userSettings
```

---

## Current UI

```text
┌─────────────┬──────────────┬───────────────────┐
│ Sidebar     │ Notes List   │ Note Editor       │
│             │              │                   │
│ New Note    │ Notes        │ Title             │
│ Search      │              │ Content           │
│ Dark Mode   │              │ Auto Save         │
│ Sync Status │              │                   │
└─────────────┴──────────────┴───────────────────┘
```

---

## Roadmap

- [x] Angular Setup
- [x] Tailwind Setup
- [x] IndexedDB
- [x] Note CRUD
- [x] Search
- [ ] PWA
- [ ] Offline Sync
- [ ] Voice Notes
- [ ] Checklists
- [ ] PDF Export
- [ ] Word Export
- [ ] Production Release

---

## App Information

Name: Recall

Description:

Offline-first note taking with sync, voice notes, checklists, and exports.

Display Mode:

```text
standalone
```

Theme Color:

```text
#111827
```

Background Color:

```text
#ffffff
```

---

Built with Angular + Tailwind CSS.
