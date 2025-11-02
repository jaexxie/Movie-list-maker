"use client";
import { useState } from "react";
import styles from "../page.module.css";

export default function addMovies({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || rating === "") {
      alert("Både titel och betyg måste fyllas innan du kan spara filmen!");
      return;
    }

    const newMovie = {
      title,
      rating: Number(rating),
    };

    onAddMovie(newMovie);
    setTitle("");
    setRating("");
  };

  return (
    <section className={styles.formSection}>
      <h2>Lägg till en film</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title">Titel:</label>
        <input
          id="title"
          type="text"
          placeholder="Titel här..."
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="rating">Betyg:</label>
        <select
          id="rating"
          className={styles.selectField}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Välj betyg här...</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.saveButton}>
          Spara film
        </button>
      </form>
    </section>
  );
}