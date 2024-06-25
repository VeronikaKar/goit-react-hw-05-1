import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import { Suspense } from "react";
import { Hearts } from "react-loader-spinner";
import { easyLazy } from "./services/easyLazy";

const HomePage = easyLazy("HomePage");
const MoviesPage = easyLazy("MoviesPage");
const MovieDetailsPage = easyLazy("MovieDetailsPage");
const NotFoundPage = easyLazy("NotFoundPage");

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Hearts
              height={80}
              width={80}
              color="#4fa94d"
              ariaLabel="hearts-loading"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId/*" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
