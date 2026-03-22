import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <section className="mx-auto max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
    <p className="text-sm uppercase tracking-[0.4em] text-champagne/80">404</p>
    <h1 className="mt-4 font-display text-4xl text-white">This screening isn’t on the board.</h1>
    <p className="mt-4 text-lg leading-8 text-mist">
      The page you tried to open doesn’t exist, but the rest of the booking experience is
      ready to go.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-ink"
    >
      Return home
    </Link>
  </section>
);
