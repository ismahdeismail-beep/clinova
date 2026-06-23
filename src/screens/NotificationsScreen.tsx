import React from 'react';
import { Bell, Activity, Pill, AlertTriangle } from 'lucide-react';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'High Risk Interaction',
      message: 'Warfarin and Amiodarone prescribed for Patient IP-8921.',
      time: '10 min ago',
      read: false,
      icon: AlertTriangle,
      color: 'text-[var(--danger)]',
      bg: 'bg-[var(--danger-container)]'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Follow-up Due',
      message: 'Check Gentamicin trough levels for Patient IP-7732.',
      time: '1 hour ago',
      read: false,
      icon: Activity,
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary-container)]'
    },
    {
      id: 3,
      type: 'update',
      title: 'Formulary Update',
      message: 'New guidelines for empirical antibiotic therapy have been published.',
      time: 'Yesterday',
      read: true,
      icon: Pill,
      color: 'text-[var(--text-muted)]',
      bg: 'bg-[var(--surface-dim)]'
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Notifications</h1>
          <p className="text-[var(--text-muted)] text-sm">Alerts, reminders, and system updates.</p>
        </div>
        <button className="text-sm font-medium text-[var(--primary)] hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden divide-y divide-[var(--border)]">
        {notifications.map(n => {
          const Icon = n.icon;
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
