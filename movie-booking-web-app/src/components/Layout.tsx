import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Discover' },
  { to: '/tickets', label: 'Saved Tickets' },
];

export const Layout = () => {
  return (
    <div className="min-h-screen bg-ink bg-spotlight text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="animate-rise rounded-full border border-white/10 bg-white/5 px-5 py-4 shadow-glow backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-ember to-champagne font-display text-lg font-bold text-ink">
                SS
              </div>
              <div>
                <p className="font-display text-xl font-semibold tracking-wide">
                  Silver Screen
                </p>
                <p className="text-sm text-mist">Book the night like a premiere.</p>
              </div>
            </Link>
            <nav className="flex flex-wrap gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm transition ${
                      isActive
                        ? 'bg-white text-ink'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
