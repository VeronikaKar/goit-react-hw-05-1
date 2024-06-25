import { useEffect, useState } from "react";
import { fetchCreditsById } from "../../services/fetchApi.js";
import { useParams } from "react-router-dom";

import { Hearts } from "react-loader-spinner";
import css from "./MovieCast.module.css";
const MovieCast = () => {
  const { movieId } = useParams();

  const photo = "https://image.tmdb.org/t/p/w500/";
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchCreditsById(movieId);
        setCost(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {!error && loading && (
        <Hearts
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}

      {cost.length === 0 ? (
        <>
          <p>No casts yet</p>
        </>
      ) : (
        <>
          <ul className="flex flex-wrap gap-15 w-[1000px]">
            {cost.map((item) => (
              <li key={item.id}>
                <h3 className="text-base max-w-[70px] h-[50px] font-medium p-2.5">
                  {item.name}
                </h3>
                <p className={css.text}>{item.character}</p>
                <img
                  src={
                    item.profile_path === null
                      ? "https://okdiario.com/img/2020/02/26/series-netflix-top-10-1-1.jpg"
                      : `${photo}${item.profile_path}`
                  }
                  alt=""
                  width={100}
                  height={130}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MovieCast;
