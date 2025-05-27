import { useNavigate } from 'react-router';
import { HeartIcon } from './HeartIcon';
import { SHOW_FAVORITES_QUERY_PARAM } from '@/constants';

export const FavoritesButton = () => {
  const navigate = useNavigate();

  return (
    <button
      aria-label="Go to favorites"
      className="ml-auto rounded bg-[#f05537] px-4 py-2 text-center text-sm font-semibold text-white duration-500 hover:bg-[#ff7059] md:text-base lg:text-lg"
      onClick={() => {
        navigate(`/?${SHOW_FAVORITES_QUERY_PARAM}=true`);
      }}
    >
      <HeartIcon className="inline-block w-4" />
    </button>
  );
};
