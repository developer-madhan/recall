import { Injectable, effect, signal } from '@angular/core';
import { OnlineStatusService } from './online-status.service';
import { db } from '../db/recall-db';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  readonly syncing = signal(false);
  readonly lastSyncedAt = signal<Date | null>(null);

  constructor(private onlineStatus: OnlineStatusService) {
    effect(() => {
      if (this.onlineStatus.online()) {
        this.processQueue();
      }
    });
  }

  async processQueue(): Promise<void> {
    if (!this.onlineStatus.online() || this.syncing()) return;

    this.syncing.set(true);

    try {
      const queue = await db.syncQueue.orderBy('createdAt').toArray();

      for (const item of queue) {
        console.log('Syncing item:', item);

        // Real backend sync comes later.
        // For now Phase 3 removes queued local actions safely.
        await db.syncQueue.delete(item.id!);
      }

      this.lastSyncedAt.set(new Date());
    } finally {
      this.syncing.set(false);
    }
  }

  async pendingCount(): Promise<number> {
    return db.syncQueue.count();
  }
}