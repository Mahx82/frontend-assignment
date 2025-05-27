import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import type { IMovie } from '../types';
import { FAVORITE_MOVIES_KEY } from '@/constants';

interface MovieListProps {
  movies: Omit<IMovie, 'genres' | 'summary'>[];
}

export const MovieList = ({ movies }: MovieListProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const stored = localStorage.getItem(FAVORITE_MOVIES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const handleToggleFavorites = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  };
  return (
    <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] gap-4 pb-10">
      {movies.map(({ id, name, image }) => {
        const isFavorite = favoriteIds.includes(id);

        return (
          <li className="group flex flex-col" key={id}>
            <MovieCard
              id={id}
              name={name}
              image={image.medium}
              onToggleFavorites={handleToggleFavorites}
              isFavorite={isFavorite}
            />
          </li>
        );
      })}
    </ul>
  );
};
