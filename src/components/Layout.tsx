import { Header } from './Header';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div>
      <Header />
      <main className="relative mx-auto w-full">
        <div className="mx-auto mt-6 max-w-[1024px]">
          <div className="mx-4 my-10 md:mx-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
