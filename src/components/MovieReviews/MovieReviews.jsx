import { useEffect, useState } from "react";
import { fetchReviewsById } from "../../services/fetchApi.js";
import { useParams } from "react-router-dom";
import { Hearts } from "react-loader-spinner";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchReviewsById(movieId);
        setInfo(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return (
      <Hearts
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <>
      {info.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <ul>
          {info.map((item) => (
            <li key={item.id}>
              <h3>Author: {item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
