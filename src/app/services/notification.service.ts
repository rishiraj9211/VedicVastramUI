import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface AppNotification {
  id: number;
  message: string;
  type: NotificationType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  show(message: string, options?: { type?: NotificationType; duration?: number }) {
    const id = Date.now();
    const type = options?.type ?? 'info';
    const duration = options?.duration ?? 2000;
    const next = [...this.notificationsSubject.value, { id, message, type }];
    this.notificationsSubject.next(next);

    window.setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number) {
    this.notificationsSubject.next(
      this.notificationsSubject.value.filter((item) => item.id !== id)
    );
  }
}
