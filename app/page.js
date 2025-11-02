"use client";
import styles from "./page.module.css";
import Movie from "./components/movie.js";
import AddMovie from "./components/addMovie.js"
import { useState, useEffect } from "react";

export default function Home() {
  const [movie, setMovie] = useState([]);
  const [sortAlphaAsc, setSortAlphaAsc] = useState(true);
  const [sortRatingAsc, setSortRatingAsc] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("movies");
      if (stored) setMovie(JSON.parse(stored));
    } catch (e) {
      console.error("Could not read movies from localStorage:", e)
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("movies", JSON.stringify(movie));
    } catch (e) {
      console.error("Could not save movies to localStorage:", e);
    }
  }, [movie]);

  const addMovie = (newMovie) => {
    setMovie((prev) => [...prev, newMovie]);
  };

  const deleteMovie = (title) => {
    setMovie((prev) => prev.filter((m) => m.title !== title));
  };

  const sortAlpha = () => {
    setMovie((prev) => {
      const sorted = [...prev].sort((a, b) => 
        sortAlphaAsc
        ? String(a.title).localeCompare(String(b.title))
        : String(b.title).localeCompare(String(a.title))
      );
      return sorted;
    });
    setSortAlphaAsc(!sortAlphaAsc);
  };

  const sortByRating = () => {
    setMovie((prev) => {
      const sorted = [...prev].sort((a, b) =>
        sortRatingAsc
        ? Number(a.rating) - Number(b.rating)
        : Number(b.rating) - Number(a.rating)
      );
      return sorted;
    });
    setSortRatingAsc(!sortRatingAsc);
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <h1>Min filmlista</h1>

      <AddMovie onAddMovie={addMovie} />

      <Movie movies={movie} onDeleteMovie={deleteMovie} />

      <div className={styles.buttonGroup}>
        <button className={styles.sortButton} onClick={sortAlpha}>
          Alfabetisk ordning
        </button>
        <button className={styles.sortButton} onClick={sortByRating}>
          Betygsordning
        </button>
      </div>
    </div>
  );
}
