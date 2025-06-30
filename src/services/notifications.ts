import { supabase } from './supabase';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/pill-icon.svg',
      badge: '/pill-icon.svg',
      ...options,
    });
  }
};

export const scheduleReminder = async (medicineId: string, scheduledTime: string) => {
  const { error } = await supabase
    .from('medicine_logs')
    .insert({
      medicine_id: medicineId,
      scheduled_time: scheduledTime,
      status: 'pending'
    });

  if (error) {
    console.error('Error scheduling reminder:', error);
    return false;
  }

  return true;
};

export const simulateCaregiverAlert = async (message: string) => {
  // Demo function - in production, integrate with Twilio or WhatsApp API
  console.log('🚨 CAREGIVER ALERT:', message);
  
  // Show browser notification as demo
  showNotification('Caregiver Alert Sent', {
    body: message,
    tag: 'caregiver-alert',
    requireInteraction: true
  });

  return true;
};