import { Link } from 'react-router-dom';
import { movies } from '../data/catalog';
import { SectionHeading } from '../components/SectionHeading';

export const HomePage = () => {
  const featured = movies[0];
  const nowShowing = movies.filter((movie) => movie.status === 'Now Showing');
  const comingSoon = movies.filter((movie) => movie.status === 'Coming Soon');

  return (
    <div className="space-y-12">
      <section className="animate-rise overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-glow">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm uppercase tracking-[0.45em] text-champagne/80">
              Featured Tonight
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-tight text-white sm:text-6xl">
              {featured.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-mist">
              {featured.tagline} Explore premium screens, reserve the perfect row, and
              step into a booking flow designed like opening night.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80">
              {featured.genre.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  {item}
                </span>
              ))}
              <span className="rounded-full border border-ember/40 bg-ember/10 px-4 py-2 text-champagne">
                {featured.duration}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={`/movies/${featured.id}`}
                className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:scale-[1.02]"
              >
                Book featured film
              </Link>
              <Link
                to="/tickets"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View saved tickets
              </Link>
            </div>
          </div>
          <div className="relative min-h-[340px]">
            <img
              src={featured.backdrop}
              alt={featured.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Now Showing"
          title="Pick the story that owns your evening"
          description="Poster-first discovery with premium formats, rich showtime metadata, and a clear path into booking."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {nowShowing.map((movie, index) => (
            <article
              key={movie.id}
              className="group animate-rise overflow-hidden rounded-[28px] border border-white/10 bg-velvet/80"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-white">{movie.title}</h3>
                    <p className="mt-2 text-sm text-mist">{movie.tagline}</p>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-champagne">
                    {movie.rating}
                  </span>
                </div>
                <p className="text-sm leading-7 text-mist">{movie.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-white/80">
                  {movie.genre.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-white/10 px-3 py-1"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/movies/${movie.id}`}
                  className="inline-flex rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff865d]"
                >
                  Choose showtime
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 sm:p-10">
        <SectionHeading
          eyebrow="Coming Soon"
          title="A curated look at what’s next"
          description="Keep upcoming premieres in view while the first version stays focused on active bookings."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {comingSoon.map((movie) => (
            <article
              key={movie.id}
              className="flex flex-col gap-5 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:flex-row"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-44 w-full rounded-[20px] object-cover sm:w-36"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-champagne/80">
                  {movie.releaseLabel}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">{movie.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{movie.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
