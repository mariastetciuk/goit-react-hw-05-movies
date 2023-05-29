import { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { fetchMovies } from 'API/themoviedbApi';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const url = 'https://image.tmdb.org/t/p/w500';
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const params = `movie/${movieId}`;
    async function featch() {
      try {
        const { data } = await fetchMovies(params);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }
    featch();
  }, [movieId]);

  const getYearMovie = date => {
    const dateMovie = new Date(date);
    const year = dateMovie.getFullYear();
    return year;
  };

  return (
    <div>
      <Link to={backLinkLocationRef.current}>go back</Link>
      <article>
        <img
          src={movie.poster_path ? url + movie.poster_path : ''}
          alt={movie.title}
          width="300"
        />
        <h2>
          {movie.title}({getYearMovie(movie.release_date)})
        </h2>
        <p>Vote average: {movie.vote_average}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>

        <h3>Genres</h3>

        <p>
          {movie.genres ? movie.genres.map(genre => genre.name).join(' ') : ''}
        </p>
      </article>
      <section>
        <h2>Additional information</h2>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
};

export default MovieDetails;