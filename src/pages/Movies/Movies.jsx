import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovies } from 'API/themoviedbApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query === '') return;
    const params = 'search/movie';
    const queryParams = `query=${query}`;
    async function featch() {
      try {
        const { data } = await fetchMovies(params, queryParams);
        setMovies(data.results);

        if (data.results.length === 0) {
          return Notify.failure('Sorry, but nothing found');
        }
      } catch (error) {
        console.log(error);
      }
    }
    featch();
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.input.value;

    setSearchParams({ query: searchQuery });
    event.target.reset();
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="input"
          placeholder="Search movies"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id} className={css.item}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Movies;
