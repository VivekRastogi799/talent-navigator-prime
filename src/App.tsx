
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TopTierNavigation } from "./components/TopTierNavigation";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showTopTier, setShowTopTier] = useState(false);

  const handleTopTierClick = () => {
    setShowTopTier(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!showTopTier && <TopTierNavigation onTopTierClick={handleTopTierClick} />}
          <Routes>
            <Route path="/" element={<Navigate to={showTopTier ? "/TopTier" : "/"} replace />} />
            <Route path="/TopTier" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
