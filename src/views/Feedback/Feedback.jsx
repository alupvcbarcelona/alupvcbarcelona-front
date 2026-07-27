import React, { useState } from "react";
const Loader = React.lazy(() => import("../../components/Loader/Loader"));
import { makeFetch } from "../../services/fetch";

import "./Feedback.css";
import { useNavigate } from "react-router-dom";

export const Feedback = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState({
    username: "",
    title: "",
    description: "",
    stars: 5,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReview((prev) => ({
      ...prev,
      [name]: name === "stars" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URI_BACKEND}/api/reviews/create-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar la reseña");
      }

      setMessage("✅ ¡Gracias por tu reseña!");

      setReview({
        username: "",
        title: "",
        description: "",
        stars: 5,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="feedback">
      <h2>Déjanos tu reseña</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="username"
            value={review.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={review.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            rows="5"
            value={review.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Valoración</label>
          <select name="stars" value={review.stars} onChange={handleChange}>
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Enviar reseña"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};
