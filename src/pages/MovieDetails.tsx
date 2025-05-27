import { useParams } from 'react-router';
import { useMovieDetails } from '@/hooks/queries';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useMovieDetails(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>No movie found</div>;
  }

  return (
    <div className="mx-auto flex gap-8">
      <img src={data.image?.medium} alt={data.name} />
      <div className="">
        <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold">
          {data.name}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: data.summary }} />
      </div>
      <div>
        {data.genres.map((genre: string, index: number) => (
          <span
            key={index}
            className="mr-2 mb-2 inline-block rounded-full bg-[#eee] px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};
