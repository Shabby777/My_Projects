import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Ticket } from '../types';
import { loadTickets, saveTickets } from '../lib/storage';

interface BookingContextValue {
  tickets: Ticket[];
  latestTicket: Ticket | null;
  completeBooking: (ticket: Ticket) => void;
  getTicketById: (ticketId: string) => Ticket | undefined;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export const BookingProvider = ({ children }: PropsWithChildren) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => loadTickets());
  const [latestTicket, setLatestTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  const value = useMemo<BookingContextValue>(
    () => ({
      tickets,
      latestTicket,
      completeBooking: (ticket) => {
        setTickets((current) => [ticket, ...current]);
        setLatestTicket(ticket);
      },
      getTicketById: (ticketId) => tickets.find((ticket) => ticket.id === ticketId),
    }),
    [latestTicket, tickets],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider');
  }

  return context;
};
