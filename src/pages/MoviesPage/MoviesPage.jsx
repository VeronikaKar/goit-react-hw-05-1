import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/fetchApi";
import { Hearts } from "react-loader-spinner";
import css from "./MoviesPage.module.css";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const MoviesPage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const film = searchParams.get("query");

  useEffect(() => {
    async function fetchMovies() {
      if (!film) return;
      try {
        setFilms([]);
        setIsError(false);
        setIsLoading(true);

        const films = await fetchMoviesByQuery(film);
        setFilms(films);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [film]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.film.value.trim();
    if (query) {
      setSearchParams({ query });
      setRequest(true);
    }
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-5">
        <input
          type="text"
          name="film"
          placeholder="Search film"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {isLoading && (
        <div className="flex justify-center items-center h-24">
          <Hearts height={50} width={50} color="#4fa94d" />
        </div>
      )}
      {request && films.length === 0 && <h1>Nothing found</h1>}
      {films.length > 0 && <MovieList movies={films} />}
      {isError && <NotFoundPage />}
    </>
  );
};

export default MoviesPage;
