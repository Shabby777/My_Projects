import type { Movie, Showtime, Theater } from '../types';

export const theaters: Theater[] = [
  {
    id: 'theater-aurora',
    name: 'Aurora Luxe',
    city: 'Mumbai',
    hall: 'Hall 1',
    amenities: ['Dolby Atmos', 'Recliners', 'Gourmet Lounge'],
  },
  {
    id: 'theater-starlight',
    name: 'Starlight Cinemas',
    city: 'Bengaluru',
    hall: 'Hall 5',
    amenities: ['Laser Projection', 'Premium Seats', 'Valet Parking'],
  },
  {
    id: 'theater-regal',
    name: 'Regal Circle',
    city: 'Delhi',
    hall: 'Hall 3',
    amenities: ['IMAX Enhanced', '4K Projection', 'Express Entry'],
  },
];

export const movies: Movie[] = [
  {
    id: 'midnight-signal',
    title: 'Midnight Signal',
    tagline: 'Every transmission leaves a shadow behind.',
    description:
      'A pulse from deep space pulls a former mission commander back into orbit, where a lost crew recording hints at a conspiracy buried inside the stars.',
    poster:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    backdrop:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1600&q=80',
    duration: '2h 14m',
    genre: ['Sci-Fi', 'Thriller'],
    rating: 'UA 13+',
    status: 'Now Showing',
    releaseLabel: 'In cinemas now',
    cast: ['Zara Khanna', 'Neil Dsouza', 'Ira Menon'],
  },
  {
    id: 'velvet-chase',
    title: 'Velvet Chase',
    tagline: 'A heist told in silk, smoke, and split seconds.',
    description:
      'An expert getaway artist reunites her old crew for one impossible night inside a museum gala where every guest has a secret agenda.',
    poster:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    backdrop:
      'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1600&q=80',
    duration: '1h 56m',
    genre: ['Crime', 'Action'],
    rating: 'UA 16+',
    status: 'Now Showing',
    releaseLabel: 'Audience favorite',
    cast: ['Reva Kapoor', 'Armaan Roy', 'Kian Thomas'],
  },
  {
    id: 'monsoon-raga',
    title: 'Monsoon Raga',
    tagline: 'Two voices. One city. A season that changes everything.',
    description:
      'A rising playback singer and a washed-up composer find their way back to music while a relentless monsoon turns the city into a stage.',
    poster:
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80',
    backdrop:
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1600&q=80',
    duration: '2h 08m',
    genre: ['Drama', 'Musical'],
    rating: 'U',
    status: 'Coming Soon',
    releaseLabel: 'Releases next Friday',
    cast: ['Anaya Sen', 'Ritwik Bose', 'Mihir Ahuja'],
  },
  {
    id: 'iron-tide',
    title: 'Iron Tide',
    tagline: 'When the city floods, legends surface.',
    description:
      'A marine engineer leads a desperate rescue mission through a drowned coastal megacity while rival factions battle for control of the final seawall.',
    poster:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80',
    backdrop:
      'https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1600&q=80',
    duration: '2h 22m',
    genre: ['Adventure', 'Action'],
    rating: 'UA 13+',
    status: 'Now Showing',
    releaseLabel: 'Storming the charts',
    cast: ['Kabir Malhotra', 'Sana Mir', 'Dev Patel'],
  },
];

export const showtimes: Showtime[] = [
  {
    id: 'show-1',
    movieId: 'midnight-signal',
    theaterId: 'theater-aurora',
    startTime: '7:30 PM',
    dateLabel: 'Today',
    format: 'IMAX',
    language: 'English',
    price: 420,
    bookedSeats: ['A3', 'A4', 'B6', 'C7', 'D5'],
  },
  {
    id: 'show-2',
    movieId: 'midnight-signal',
    theaterId: 'theater-regal',
    startTime: '9:45 PM',
    dateLabel: 'Today',
    format: '4DX',
    language: 'Hindi',
    price: 480,
    bookedSeats: ['A1', 'A2', 'C4', 'E8', 'F6'],
  },
  {
    id: 'show-3',
    movieId: 'velvet-chase',
    theaterId: 'theater-starlight',
    startTime: '6:15 PM',
    dateLabel: 'Today',
    format: '2D',
    language: 'Hindi',
    price: 350,
    bookedSeats: ['B3', 'B4', 'B5', 'D8', 'E1'],
  },
  {
    id: 'show-4',
    movieId: 'velvet-chase',
    theaterId: 'theater-aurora',
    startTime: '10:10 PM',
    dateLabel: 'Tomorrow',
    format: '2D',
    language: 'English',
    price: 390,
    bookedSeats: ['A8', 'B8', 'C8', 'D8', 'E8'],
  },
  {
    id: 'show-5',
    movieId: 'iron-tide',
    theaterId: 'theater-regal',
    startTime: '8:00 PM',
    dateLabel: 'Today',
    format: 'IMAX',
    language: 'English',
    price: 450,
    bookedSeats: ['A5', 'A6', 'C2', 'D3', 'F9'],
  },
  {
    id: 'show-6',
    movieId: 'iron-tide',
    theaterId: 'theater-starlight',
    startTime: '5:20 PM',
    dateLabel: 'Tomorrow',
    format: '3D',
    language: 'Tamil',
    price: 370,
    bookedSeats: ['A9', 'B9', 'C9', 'D1', 'E2'],
  },
];

export const getMovieById = (movieId: string) =>
  movies.find((movie) => movie.id === movieId);

export const getShowtimeById = (showtimeId: string) =>
  showtimes.find((showtime) => showtime.id === showtimeId);

export const getTheaterById = (theaterId: string) =>
  theaters.find((theater) => theater.id === theaterId);

export const getShowtimesForMovie = (movieId: string) =>
  showtimes.filter((showtime) => showtime.movieId === movieId);
