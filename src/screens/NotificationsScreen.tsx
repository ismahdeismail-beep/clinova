import React from 'react';
import { Bell, Activity, Pill, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationsScreen() {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Notifications</h1>
          <p className="text-[var(--text-muted)] text-sm">Alerts, reminders, and system updates.</p>
        </div>
        <button onClick={markAllAsRead} className="text-sm font-medium text-[var(--primary)] hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden divide-y divide-[var(--border)]">
        {notifications.map(n => {
          let Icon = Bell;
          if (n.iconName === 'AlertTriangle') Icon = AlertTriangle;
          if (n.iconName === 'Activity') Icon = Activity;
          if (n.iconName === 'Pill') Icon = Pill;

          return (
            <div key={n.id} className={`p-4 sm:p-6 flex gap-4 ${n.read ? 'opacity-70' : 'bg-[var(--surface)]'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-sm font-semibold ${!n.read ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
                    {n.title}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap ml-2">{n.time}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mt-1">{n.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
