import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bell, Activity, Pill, AlertTriangle } from 'lucide-react';

export interface AppNotification {
  id: string;
  type: 'alert' | 'reminder' | 'update';
  title: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
  iconName: string;
  color: string;
  bg: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, 'id' | 'time' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  scheduleMedicationReminder: (patientName: string, medication: string, delayMinutes: number) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Risk Interaction',
    message: 'Warfarin and Amiodarone prescribed for Patient IP-8921.',
    time: '10 min ago',
    timestamp: Date.now() - 10 * 60000,
    read: false,
    iconName: 'AlertTriangle',
    color: 'text-[var(--danger)]',
    bg: 'bg-[var(--danger-container)]'
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Follow-up Due',
    message: 'Check Gentamicin trough levels for Patient IP-7732.',
    time: '1 hour ago',
    timestamp: Date.now() - 60 * 60000,
    read: false,
    iconName: 'Activity',
    color: 'text-[var(--primary)]',
    bg: 'bg-[var(--primary-container)]'
  },
  {
    id: '3',
    type: 'update',
    title: 'Formulary Update',
    message: 'New guidelines for empirical antibiotic therapy have been published.',
    time: 'Yesterday',
    timestamp: Date.now() - 24 * 60 * 60000,
    read: true,
    iconName: 'Pill',
    color: 'text-[var(--text-muted)]',
    bg: 'bg-[var(--surface-dim)]'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(DEFAULT_NOTIFICATIONS);

  // Request browser notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'time' | 'read' | 'timestamp'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Math.random().toString(36).substring(7),
      time: 'Just now',
      timestamp: Date.now(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Show browser push notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notif.title, {
        body: notif.message,
        icon: '/vite.svg', // generic icon
      });
    }
  };

  const scheduleMedicationReminder = (patientName: string, medication: string, delayMinutes: number) => {
    // We add a notification right away to confirm scheduling, or just schedule it
    // For demo purposes, we will use setTimeout to trigger it after delayMinutes
    setTimeout(() => {
      addNotification({
        type: 'reminder',
        title: 'Medication Administration Due',
        message: `Time to administer ${medication} to ${patientName}.`,
        iconName: 'Pill',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
      });
    }, delayMinutes * 60 * 1000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      scheduleMedicationReminder
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
