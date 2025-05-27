import { Link } from 'react-router';
import { FavoritesButton } from './FavoritesButton';

export const Header = () => {
  return (
    <header className="border-b-1 border-b-[#333] bg-[#333] py-4 text-white">
      <div className="mx-auto max-w-[1024px]">
        <div className="mx-4 flex items-center justify-center gap-4 md:mx-12">
          <Link to="/" className="transition duration-500 hover:opacity-80">
            <h1 className="text-base font-bold md:text-2xl">
              Movies Explorer App
            </h1>
          </Link>
          <FavoritesButton />
        </div>
      </div>
    </header>
  );
};
