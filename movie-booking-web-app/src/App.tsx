import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TicketsPage } from './pages/TicketsPage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/booking/:movieId" element={<BookingPage />} />
        <Route path="/confirmation/:ticketId" element={<ConfirmationPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
