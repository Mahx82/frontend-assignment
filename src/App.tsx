import { Routes, Route } from 'react-router';
import { Layout } from '@/components/Layout';
import { Movies } from '@/pages/Movies';
import { MovieDetails } from '@/pages/MovieDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Movies />} />
            <Route path="/:id" element={<MovieDetails />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
