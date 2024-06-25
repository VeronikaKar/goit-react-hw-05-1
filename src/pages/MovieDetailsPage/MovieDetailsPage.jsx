import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { fetchMoviesById } from "../../services/fetchApi";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const photo = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();
  const locationRef = useRef(location.state || "/");

  useEffect(() => {
    const getFilms = async () => {
      try {
        setFilms([]);
        setError(false);
        setLoading(true);

        const data = await fetchMoviesById(movieId);
        setFilms(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getFilms();
  }, [movieId]);

  const buildLinkClass = ({ isActive }) => {
    return isActive
      ? "text-blue-600 font-bold hover:text-blue-700"
      : "text-gray-600 hover:text-gray-800";
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {error && <NotFoundPage />}
      {loading ? (
        <div className="flex items-center justify-center">
          <Hearts height={80} width={80} color="#4fa94d" />
        </div>
      ) : (
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 bg-white rounded-lg shadow-md overflow-hidden">
            {/* Left Section */}
            <div className="relative">
              <button
                type="button"
                onClick={() => navigate(locationRef.current)}
                className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Go back
              </button>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={
                    films.poster_path
                      ? `${photo}${films.poster_path}`
                      : "https://okdiario.com/img/2020/02/26/series-netflix-top-10-1-1.jpg"
                  }
                  alt="Movie poster"
                  className="w-full h-auto"
                  style={{ aspectRatio: "2/3" }}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="p-4 lg:p-0 lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">
                {films.original_title}
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                User score: {Math.round(films.vote_average * 10)}%
              </p>
              <p className="text-lg text-gray-700 mb-4">{films.overview}</p>
              <ul className="text-lg text-gray-700">
                {films.length !== 0 &&
                  films.genres.map((item) => (
                    <li key={item.id} className="mb-1">
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <h3 className="text-xl font-bold mb-4">Additional Information</h3>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to={`/movies/${movieId}/cast`}
              state={location}
              className={buildLinkClass}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/movies/${movieId}/reviews`}
              state={location}
              className={buildLinkClass}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Nested Routes */}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
