"use client";
import styles from "../page.module.css";

export default function Movies({ movies, onDeleteMovie }) {
  return (
    <section>
      <h2>Inlagda filmer</h2>
      <ul className={styles.movieList}>
        {movies.map((movie, index) => (
          <li key={index} className={styles.movieItem}>
            <span>{movie.title}</span>
            <span className={styles.stars}>
              {"★".repeat(movie.rating)}
            </span>
            <button 
                className={styles.deleteButton}
                onClick={() => onDeleteMovie(movie.title)}
                aria-label="Ta bort filmen">✖
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
