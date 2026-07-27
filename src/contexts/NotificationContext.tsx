import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Bell, Activity, Pill, AlertTriangle, Megaphone } from 'lucide-react';
import { BUNDLED_DRUGS } from '../data/drugIndexData';
import { useNavigate } from 'react-router-dom';

export interface AppNotification {
  id: string;
  type: 'alert' | 'reminder' | 'update' | 'info';
  title: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
  iconName: string;
  color: string;
  bg: string;
  link?: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, 'id' | 'time' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  scheduleMedicationReminder: (patientName: string, medication: string, delayMinutes: number) => void;
  requestNotificationPermission: () => Promise<NotificationPermission>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'welcome-1',
    type: 'info',
    title: 'Welcome to Clinova',
    message: 'Explore drug monographs, clinical cases, nursing care plans, and AI-powered clinical support.',
    time: 'Welcome',
    timestamp: Date.now(),
    read: false,
    iconName: 'Megaphone',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'welcome-2',
    type: 'info',
    title: 'NANDA Nursing Care Plans Now Available',
    message: '47 evidence-based care plans across 19 specialties — from Critical Care/ICU to Community Health.',
    time: 'New',
    timestamp: Date.now() - 3600000,
    read: false,
    iconName: 'Megaphone',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    link: '/care-plan',
  },
  {
    id: 'welcome-3',
    type: 'info',
    title: 'AI Clinova Support',
    message: 'Get instant answers to clinical questions powered by AI, backed by Kenyan STG guidelines.',
    time: 'Feature',
    timestamp: Date.now() - 7200000,
    read: false,
    iconName: 'Activity',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    link: '/assistant',
  },
];

// Feature announcements that should trigger a notification
const FEATURE_ANNOUNCEMENTS = [
  {
    id: 'feat-care-plans',
    title: 'NANDA Nursing Care Plans',
    message: '47 evidence-based care plans across 19 specialties — from Critical Care/ICU to Community Health.',
    iconName: 'Megaphone',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    link: '/care-plan',
  },
  {
    id: 'feat-drug-of-the-day',
    title: 'Drug of the Day',
    message: 'A new drug is spotlighted every day. Check back daily to expand your pharmacology knowledge.',
    iconName: 'Pill',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    link: '/drugs',
  },
  {
    id: 'feat-clinova-support',
    title: 'AI Clinova Support',
    message: 'Get instant answers to clinical questions powered by AI, backed by Kenyan STG guidelines.',
    iconName: 'Activity',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('clinova_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return DEFAULT_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('clinova_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Check for unseen feature announcements
  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem('clinova_seen_announcements') || '[]') as string[];
    const unseen = FEATURE_ANNOUNCEMENTS.filter(f => !seen.includes(f.id));
    if (unseen.length > 0) {
      const newNotifs: AppNotification[] = unseen.map(f => ({
        id: `ann-${f.id}`,
        type: 'info' as const,
        title: f.title,
        message: f.message,
        time: 'New',
        timestamp: Date.now(),
        read: false,
        iconName: f.iconName,
        color: f.color,
        bg: f.bg,
        link: f.link,
      }));
      setNotifications(prev => [...newNotifs, ...prev]);
      localStorage.setItem('clinova_seen_announcements', JSON.stringify([...seen, ...unseen.map(u => u.id)]));
    }
  }, []);

  // Request browser notification permission
  const requestNotificationPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) return 'denied';
    if (Notification.permission === 'granted') return 'granted';
    const result = await Notification.requestPermission();
    localStorage.setItem('clinova_push_permission', result);
    return result;
  }, []);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Auto-request on first visit
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
      try {
        new Notification(notif.title, {
          body: notif.message,
          icon: '/vite.svg',
        });
      } catch (e) {
        // Browser notifications may fail in some contexts
      }
    }
  };

  const scheduleMedicationReminder = (patientName: string, medication: string, delayMinutes: number) => {
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

  // Drug of the Day — fires when the drug changes (daily)
  const getDrugOfTheDay = useCallback(() => {
    const now = new Date()
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
    const idx = dayOfYear % BUNDLED_DRUGS.length
    return BUNDLED_DRUGS[idx]
  }, [])

  useEffect(() => {
    const checkAndNotify = () => {
      // East Africa Time (UTC+3)
      const now = new Date()
      const eatNow = new Date(now.getTime() + (now.getTimezoneOffset() + 180) * 60000)
      if (eatNow.getHours() !== 8 || eatNow.getMinutes() !== 0) return

      const lastNotified = localStorage.getItem('clinova_dotd_notified')
      if (lastNotified === now.toDateString()) return

      const drug = getDrugOfTheDay()
      localStorage.setItem('clinova_dotd_notified', now.toDateString())

      addNotification({
        type: 'reminder',
        title: `Drug of the Day: ${drug.name}`,
        message: `${drug.drug_class} — ${drug.indications[0]}. Tap to view full monograph.`,
        iconName: 'Pill',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/15',
        link: `/drugs?q=${encodeURIComponent(drug.name)}`,
      })
    }

    checkAndNotify()
    const interval = setInterval(checkAndNotify, 60000)
    return () => clearInterval(interval)
  }, [addNotification, getDrugOfTheDay])

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('clinova_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('clinova_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      scheduleMedicationReminder,
      requestNotificationPermission,
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
