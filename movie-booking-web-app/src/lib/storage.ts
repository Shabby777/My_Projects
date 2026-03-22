import type { Ticket } from '../types';

const TICKETS_KEY = 'silver-screen-bookings';

export const loadTickets = (): Ticket[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TICKETS_KEY);
    return raw ? (JSON.parse(raw) as Ticket[]) : [];
  } catch {
    return [];
  }
};

export const saveTickets = (tickets: Ticket[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};
