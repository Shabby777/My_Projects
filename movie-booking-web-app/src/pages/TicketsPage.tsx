import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { getMovieById, getShowtimeById, getTheaterById } from '../data/catalog';
import { formatCurrency } from '../lib/format';

export const TicketsPage = () => {
  const { tickets } = useBooking();

  if (tickets.length === 0) {
    return (
      <section className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-champagne/80">Saved Tickets</p>
        <h1 className="mt-4 font-display text-4xl text-white">No bookings saved yet.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-mist">
          Once you complete a booking, your ticket will stay here locally so you can revisit
          it after a refresh.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:scale-[1.01]"
        >
          Start booking
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-champagne/80">Saved Tickets</p>
        <h1 className="mt-4 font-display text-4xl text-white">Your confirmed nights out</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {tickets.map((ticket) => {
          const movie = getMovieById(ticket.movieId);
          const showtime = getShowtimeById(ticket.showtimeId);
          const theater = getTheaterById(ticket.theaterId);

          if (!movie || !showtime || !theater) {
            return null;
          }

          return (
            <article
              key={ticket.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-velvet/80"
            >
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="h-48 w-full object-cover"
              />
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl text-white">{movie.title}</h2>
                    <p className="mt-2 text-sm text-mist">
                      {showtime.dateLabel}, {showtime.startTime}
                    </p>
                  </div>
                  <span className="rounded-full bg-ember/10 px-3 py-1 text-xs text-champagne">
                    {formatCurrency(ticket.amount)}
                  </span>
                </div>
                <div className="grid gap-3 text-sm text-mist sm:grid-cols-2">
                  <p>
                    Venue: <span className="text-white">{theater.name}</span>
                  </p>
                  <p>
                    Hall: <span className="text-white">{theater.hall}</span>
                  </p>
                  <p>
                    Seats: <span className="text-white">{ticket.seats.join(', ')}</span>
                  </p>
                  <p>
                    Guest: <span className="text-white">{ticket.customerName}</span>
                  </p>
                </div>
                <Link
                  to={`/confirmation/${ticket.id}`}
                  className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Open confirmation
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
