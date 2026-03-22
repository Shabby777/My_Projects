export type MovieStatus = 'Now Showing' | 'Coming Soon';

export interface Theater {
  id: string;
  name: string;
  city: string;
  hall: string;
  amenities: string[];
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  dateLabel: string;
  format: string;
  language: string;
  price: number;
  bookedSeats: string[];
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  description: string;
  poster: string;
  backdrop: string;
  duration: string;
  genre: string[];
  rating: string;
  status: MovieStatus;
  releaseLabel: string;
  cast: string[];
}

export interface Ticket {
  id: string;
  movieId: string;
  showtimeId: string;
  theaterId: string;
  seats: string[];
  amount: number;
  bookedAt: string;
  customerName: string;
  email: string;
}

export interface CheckoutForm {
  customerName: string;
  email: string;
  cardName: string;
  cardNumber: string;
}
