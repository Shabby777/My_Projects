import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { getMovieById, getShowtimeById, getTheaterById } from '../data/catalog';
import { formatCurrency, seatLabels, seatRows } from '../lib/format';
import type { CheckoutForm } from '../types';

const initialForm: CheckoutForm = {
  customerName: '',
  email: '',
  cardName: '',
  cardNumber: '',
};

export const BookingPage = () => {
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeBooking } = useBooking();

  const showtimeId = searchParams.get('showtime');

  if (!movieId || !showtimeId) {
    return <Navigate to="/" replace />;
  }

  const movie = getMovieById(movieId);
  const showtime = getShowtimeById(showtimeId);

  if (!movie || !showtime || showtime.movieId !== movie.id) {
    return <Navigate to="/" replace />;
  }

  const theater = getTheaterById(showtime.theaterId);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const occupiedSeats = useMemo(() => new Set(showtime.bookedSeats), [showtime.bookedSeats]);
  const subtotal = selectedSeats.length * showtime.price;
  const convenienceFee = selectedSeats.length > 0 ? 99 : 0;
  const total = subtotal + convenienceFee;

  const isFormValid =
    selectedSeats.length > 0 &&
    form.customerName.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.cardName.trim().length > 1 &&
    form.cardNumber.replace(/\s+/g, '').length >= 8;

  const toggleSeat = (seatLabel: string) => {
    if (occupiedSeats.has(seatLabel)) {
      return;
    }

    setSelectedSeats((current) =>
      current.includes(seatLabel)
        ? current.filter((seat) => seat !== seatLabel)
        : [...current, seatLabel],
    );
  };

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleConfirmBooking = () => {
    setAttemptedSubmit(true);

    if (!isFormValid || !theater) {
      return;
    }

    const ticket = {
      id: `ticket-${Date.now()}`,
      movieId: movie.id,
      showtimeId: showtime.id,
      theaterId: theater.id,
      seats: [...selectedSeats].sort(),
      amount: total,
      bookedAt: new Date().toISOString(),
      customerName: form.customerName.trim(),
      email: form.email.trim(),
    };

    completeBooking(ticket);
    navigate(`/confirmation/${ticket.id}`);
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-8">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne/80">
            Seat Selection
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl text-white">{movie.title}</h1>
              <p className="mt-2 text-sm text-mist">
                {showtime.dateLabel} • {showtime.startTime} • {showtime.format} •{' '}
                {showtime.language}
              </p>
              <p className="mt-1 text-sm text-mist">
                {theater?.name}, {theater?.city} · {theater?.hall}
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">
              {selectedSeats.length} seat{selectedSeats.length === 1 ? '' : 's'} selected
            </div>
          </div>

          <div className="mt-8 rounded-[28px] bg-gradient-to-b from-white/10 to-transparent p-4 sm:p-6">
            <div className="mx-auto mb-8 h-3 max-w-xl rounded-full bg-gradient-to-r from-white/10 via-champagne to-white/10" />
            <p className="mb-8 text-center text-xs uppercase tracking-[0.45em] text-mist">
              Screen this way
            </p>
            <div className="space-y-3">
              {seatRows.map((row) => (
                <div key={row} className="grid grid-cols-[24px_repeat(10,minmax(0,1fr))] gap-2">
                  <span className="self-center text-xs text-mist">{row}</span>
                  {seatLabels
                    .filter((seat) => seat.startsWith(row))
                    .map((seat) => {
                      const isBooked = occupiedSeats.has(seat);
                      const isSelected = selectedSeats.includes(seat);

                      return (
                        <button
                          key={seat}
                          type="button"
                          disabled={isBooked}
                          onClick={() => toggleSeat(seat)}
                          className={`aspect-square rounded-lg text-[11px] font-semibold transition sm:text-xs ${
                            isBooked
                              ? 'cursor-not-allowed bg-white/10 text-white/20'
                              : isSelected
                                ? 'bg-ember text-white shadow-glow'
                                : 'bg-white/5 text-white hover:bg-white/15'
                          }`}
                        >
                          {seat.slice(1)}
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-mist">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/5" />
                Available
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-ember" />
                Selected
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                Occupied
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-velvet/70 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne/80">
            Mock Checkout
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-mist">
              Full name
              <input
                value={form.customerName}
                onChange={(event) => handleInputChange('customerName', event.target.value)}
                placeholder="Aarav Mehta"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-ember"
              />
            </label>
            <label className="space-y-2 text-sm text-mist">
              Email
              <input
                value={form.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-ember"
              />
            </label>
            <label className="space-y-2 text-sm text-mist">
              Name on card
              <input
                value={form.cardName}
                onChange={(event) => handleInputChange('cardName', event.target.value)}
                placeholder="A. Mehta"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-ember"
              />
            </label>
            <label className="space-y-2 text-sm text-mist">
              Card number
              <input
                value={form.cardNumber}
                onChange={(event) => handleInputChange('cardNumber', event.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-ember"
              />
            </label>
          </div>
          {attemptedSubmit && !isFormValid ? (
            <p className="mt-4 text-sm text-[#ff9a7a]">
              Select at least one seat and complete the checkout fields to confirm.
            </p>
          ) : null}
        </div>
      </section>

      <aside className="h-fit rounded-[28px] border border-white/10 bg-white/5 p-8 xl:sticky xl:top-8">
        <p className="text-sm uppercase tracking-[0.35em] text-champagne/80">
          Booking Summary
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <p className="font-display text-3xl text-white">{movie.title}</p>
            <p className="mt-2 text-sm text-mist">
              {theater?.name} · {showtime.startTime}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between text-sm text-mist">
              <span>Seats</span>
              <span className="text-white">
                {selectedSeats.length > 0 ? [...selectedSeats].sort().join(', ') : 'Select seats'}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-mist">
              <span>Tickets</span>
              <span className="text-white">
                {selectedSeats.length} x {formatCurrency(showtime.price)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-mist">
              <span>Convenience fee</span>
              <span className="text-white">{formatCurrency(convenienceFee)}</span>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleConfirmBooking}
            className="w-full rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:scale-[1.01]"
          >
            Confirm booking
          </button>
          <p className="text-xs leading-6 text-mist">
            Demo checkout only. No real payment is processed and all booking data stays in
            local browser storage.
          </p>
        </div>
      </aside>
    </div>
  );
};
