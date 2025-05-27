import { Link } from 'react-router';
import { HeartIcon } from './HeartIcon';

type MovieCardProps = {
  id: number;
  name: string;
  image: string;
  isFavorite: boolean;
  onToggleFavorites: (id: number) => void;
};

export const MovieCard = ({
  id,
  name,
  image,
  isFavorite,
  onToggleFavorites,
}: MovieCardProps) => {
  return (
    <Link to={`/${id}`} className="flex flex-grow flex-col">
      <img src={image} alt={name} className="w-full rounded-t-lg" />
      <div className="flex flex-grow flex-col">
        <div className="relative flex flex-grow gap-2 rounded-b-lg bg-[#eee] p-3 transition-all duration-500 group-hover:bg-[#ddd] group-hover:shadow-sm">
          <h2 className="text-sm">{name}</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorites(id);
            }}
            className="icon group/heart mt-1 ml-auto cursor-pointer self-start"
            aria-label="Add to favorites"
          >
            <HeartIcon
              className={`w-4 ${isFavorite ? 'text-[#f05537]' : 'text-[#888888]'} transition duration-500 group-hover/heart:animate-bounce`}
            />
          </button>
        </div>
      </div>
    </Link>
  );
};
