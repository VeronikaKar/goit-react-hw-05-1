import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {movies.length === 0 ? (
          <></>
        ) : (
          movies.map((item) => (
            <li key={item.id}>
              <Link
                to={`/movies/${item.id}`}
                state={location}
                className={css.link}
              >
                {item.original_title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MovieList;
