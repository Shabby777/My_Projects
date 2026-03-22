import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  getMovieById,
  getShowtimesForMovie,
  getTheaterById,
} from '../data/catalog';
import { formatCurrency } from '../lib/format';

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  if (!movieId) {
    return <Navigate to="/" replace />;
  }

  const movie = getMovieById(movieId);

  if (!movie) {
    return <Navigate to="/" replace />;
  }

  const showtimes = getShowtimesForMovie(movie.id);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>(
    showtimes[0]?.id ?? '',
  );

  const selectedShowtime = showtimes.find((showtime) => showtime.id === selectedShowtimeId);
  const selectedTheater = selectedShowtime
    ? getTheaterById(selectedShowtime.theaterId)
    : undefined;

  const handleContinue = () => {
    if (!selectedShowtimeId) {
      return;
    }

    navigate(`/booking/${movie.id}?showtime=${selectedShowtimeId}`);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
        <div className="relative min-h-[300px]">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/40" />
          <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[220px_1fr] lg:p-12">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-80 w-full rounded-[28px] object-cover shadow-glow lg:h-full"
            />
            <div className="self-end">
              <Link
                to="/"
                className="text-sm uppercase tracking-[0.25em] text-champagne/80"
              >
                Back to discovery
              </Link>
              <h1 className="mt-4 font-display text-5xl font-semibold text-white">
                {movie.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-mist">
                {movie.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/10 px-4 py-2">{movie.duration}</span>
                <span className="rounded-full bg-white/10 px-4 py-2">{movie.rating}</span>
                <span className="rounded-full bg-white/10 px-4 py-2">{movie.releaseLabel}</span>
              </div>
              <p className="mt-6 text-sm text-mist">
                Cast: <span className="text-white">{movie.cast.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-champagne/80">
            Select Showtime
          </p>
          <div className="mt-6 grid gap-4">
            {showtimes.map((showtime) => {
              const theater = getTheaterById(showtime.theaterId);
              const isSelected = selectedShowtimeId === showtime.id;

              return (
                <button
                  key={showtime.id}
                  type="button"
                  onClick={() => setSelectedShowtimeId(showtime.id)}
                  className={`rounded-[24px] border p-5 text-left transition ${
                    isSelected
                      ? 'border-ember bg-ember/10 shadow-glow'
                      : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-2xl text-white">{showtime.startTime}</p>
                      <p className="mt-2 text-sm text-mist">
                        {showtime.dateLabel} at {theater?.name}, {theater?.city}
                      </p>
                    </div>
                    <div className="text-sm text-white/80">
                      <p>{showtime.format}</p>
                      <p>{showtime.language}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                    {theater?.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-white/10 px-3 py-1"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-champagne">
                    Starting from {formatCurrency(showtime.price)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[28px] border border-white/10 bg-velvet/80 p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-champagne/80">
            Booking Snapshot
          </p>
          <h2 className="mt-4 font-display text-3xl text-white">Your evening, lined up.</h2>
          <div className="mt-6 space-y-4 text-sm text-mist">
            <p>{movie.tagline}</p>
            <p>Genres: {movie.genre.join(' • ')}</p>
            {selectedShowtime && selectedTheater ? (
              <>
                <p>
                  Selected show: {selectedShowtime.dateLabel}, {selectedShowtime.startTime}
                </p>
                <p>
                  Venue: {selectedTheater.name}, {selectedTheater.city} ·{' '}
                  {selectedTheater.hall}
                </p>
                <p>
                  Format: {selectedShowtime.format} · {selectedShowtime.language}
                </p>
              </>
            ) : (
              <p>Select a showtime to unlock seats and checkout.</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedShowtimeId}
            className="mt-8 w-full rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-white/40"
          >
            Continue to seats
          </button>
        </aside>
      </section>
    </div>
  );
};
