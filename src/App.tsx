import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopTierNavigation } from "@/components/TopTierNavigation";
import Index from "./pages/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopTierNavigation onEnterTopTier={() => window.location.href = '/TopTier'} />} />
            <Route path="/TopTier" element={<Index />} />
            <Route path="/TopTier/*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
