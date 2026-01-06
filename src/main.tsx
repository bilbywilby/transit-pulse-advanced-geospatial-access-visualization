import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
const MapPage = lazy(() => import('@/pages/MapPage'));
const ReportsPage = lazy(() => import('@/pages/ReportsPage'));
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/map",
    element: (
      <Suspense fallback={<div className="h-screen w-screen bg-background flex items-center justify-center text-primary animate-pulse font-display text-xl uppercase tracking-widest">Initialising Visualizer...</div>}>
        <MapPage />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/reports",
    element: (
      <Suspense fallback={<div className="h-screen w-screen bg-background flex items-center justify-center">Loading Analytics...</div>}>
        <ReportsPage />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)