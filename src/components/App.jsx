import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import Layout from './SharedLayout/Layout';
import MovieDetails from 'pages/MovieDetails';
import Cats from './Cast/Cast';
import Reviews from './Reviews/Reviews';

export const App = () => {
  return (
    <div
    // style={{
    //   height: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   fontSize: 40,
    //   color: '#010101',
    // }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          <Route path="movies/:movieId/cast" element={<Cats />} />
          <Route path="movies/:movieId/review" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
};
