import React, { useEffect, useState } from "react";
import "./ViewFeedback.css";

const ViewFeedback = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URI_BACKEND}/reviews`,
        {
          method: "GET",
        },
      );

      const data = await response.json();

      setReviews(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="view-feedback">
      <h2>Lo que opinan nuestros clientes</h2>

      <div className="reviews-slider">
        {reviews.map((review) => (
          <div className="review-card" key={review._id}>
            <div>
              <div className="review-stars">{"⭐".repeat(review.stars)}</div>

              <h3>{review.title}</h3>

              <p>{review.description}</p>
            </div>

            <span className="review-user">— {review.username}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewFeedback;
