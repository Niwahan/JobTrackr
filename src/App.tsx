import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";

// Lazy load pages to reduce initial bundle size
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const AddJob = lazy(() => import("./pages/AddJob"));
const EditJob = lazy(() => import("./pages/EditJob"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/dashboard" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            } 
          />
          <Route 
            path="/applications" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Applications />
              </Suspense>
            } 
          />
          <Route 
            path="/add-job" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AddJob />
              </Suspense>
            } 
          />
          <Route 
            path="/edit-job/:id" 
            element={
              <Suspense fallback={<PageLoader />}>
                <EditJob />
              </Suspense>
            } 
          />
          <Route 
            path="/job/:id" 
            element={
              <Suspense fallback={<PageLoader />}>
                <JobDetails />
              </Suspense>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route 
            path="*" 
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
