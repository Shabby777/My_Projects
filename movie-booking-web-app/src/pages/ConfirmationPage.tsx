import { Link, Navigate, useParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { getMovieById, getShowtimeById, getTheaterById } from '../data/catalog';
import { formatCurrency } from '../lib/format';

export const ConfirmationPage = () => {
  const { ticketId } = useParams();
  const { getTicketById, latestTicket } = useBooking();

  const ticket = ticketId ? getTicketById(ticketId) ?? latestTicket : latestTicket;

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  const movie = getMovieById(ticket.movieId);
  const showtime = getShowtimeById(ticket.showtimeId);
  const theater = getTheaterById(ticket.theaterId);

  if (!movie || !showtime || !theater) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-glow sm:p-12">
      <p className="text-sm uppercase tracking-[0.45em] text-champagne/80">
        Booking Confirmed
      </p>
      <h1 className="mt-4 font-display text-5xl text-white">You’re on the guest list.</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-mist">
        Your seats are locked in for {movie.title}. We’ve saved the ticket locally so you
        can come back to it anytime from the saved tickets screen.
      </p>

      <div className="mt-10 rounded-[28px] border border-ember/20 bg-black/20 p-8 text-left">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mist">Movie</p>
            <p className="mt-2 font-display text-2xl text-white">{movie.title}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mist">Booking ID</p>
            <p className="mt-2 text-white">{ticket.id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mist">Venue</p>
            <p className="mt-2 text-white">
              {theater.name}, {theater.city}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mist">Showtime</p>
            <p className="mt-2 text-white">
              {showtime.dateLabel}, {showtime.startTime}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mist">Seats</p>
            <p className="mt-2 text-white">{ticket.seats.join(', ')}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mist">Amount</p>
            <p className="mt-2 text-white">{formatCurrency(ticket.amount)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/tickets"
          className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:scale-[1.01]"
        >
          View saved tickets
        </Link>
        <Link
          to="/"
          className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          Book another movie
        </Link>
      </div>
    </section>
  );
};
