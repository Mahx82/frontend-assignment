import { useMoviesToDisplay } from '@/hooks/useMoviesToDisplay';
import { MovieList } from '@/components/MovieList';
import { usePaginatedMovies } from '@/hooks/usePaginatedMovies';

const MOVIES_PER_PAGE = 20;

export const Movies = () => {
  const { movies = [], isLoading, isError, error } = useMoviesToDisplay();
  const { page, totalPages, paginatedMovies, nextPage, prevPage } =
    usePaginatedMovies(movies, MOVIES_PER_PAGE);

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>{error?.message}</p>}
      <MovieList movies={paginatedMovies} />
      <div className="flex items-center justify-center gap-2 pb-8">
        <button
          className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-gray-700 transition duration-500 hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          onClick={prevPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-gray-700 transition duration-500 hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          onClick={nextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};
