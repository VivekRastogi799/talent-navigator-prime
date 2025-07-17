
import { useState } from "react";
import { Bookmark, Settings, User, Menu, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnhancedFilterSidebar } from "@/components/EnhancedFilterSidebar";
import { DashboardWidgets } from "@/components/DashboardWidgets";
import { DrilldownPanel } from "@/components/DrilldownPanel";
import { LandingPage } from "@/components/LandingPage";
import { SearchWithSuggestions } from "@/components/SearchWithSuggestions";
import { CustomReportFooter } from "@/components/CustomReportFooter";
import { CandidateHub } from "@/components/CandidateHub";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCandidateHub, setShowCandidateHub] = useState(false);
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [drilldownData, setDrilldownData] = useState({
    title: "",
    data: [],
    type: 'candidates' as 'companies' | 'skills' | 'locations' | 'candidates'
  });

  const handleSearch = (query: string) => {
    console.log('Search:', query);
    setShowDashboard(true);
  };

  const handleWidgetDrilldown = (title: string, data: any[], type: 'companies' | 'skills' | 'locations' | 'candidates') => {
    setDrilldownData({ title, data, type });
    setDrilldownOpen(true);
  };

  const handleBookmarkSearch = () => {
    // Logic to save current search
    console.log('Bookmarking search...');
  };

  if (showCandidateHub) {
    return (
      <CandidateHub 
        onStartNewSearch={() => {
          setShowCandidateHub(false);
          setShowDashboard(false);
        }}
        onViewProfile={(id) => console.log('View profile:', id)}
      />
    );
  }

  if (!showDashboard) {
    return (
      <LandingPage 
        onSearch={(query, type) => handleSearch(query)} 
        onViewCandidateHub={() => setShowCandidateHub(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Top Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-primary hover:bg-primary/10"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div 
              className="text-2xl font-bold gradient-text cursor-pointer"
              onClick={() => setShowDashboard(false)}
            >
              TopTier
            </div>
          </div>
          
          {/* Center search */}
          <SearchWithSuggestions onSearch={handleSearch} />
          
          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCandidateHub(true)}
              className="text-slate-600 border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/10"
            >
              <Users className="h-4 w-4 mr-2" />
              Saved Candidates & Past Searches
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBookmarkSearch}
              className="text-slate-600 border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/10"
              title="Save this search report for later"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Save Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-primary hover:bg-primary/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-primary hover:bg-primary/10"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <EnhancedFilterSidebar isOpen={sidebarOpen} />
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} ${drilldownOpen ? 'mr-96' : 'mr-0'}`}>
          {/* Page Header Section */}
          <div className="bg-white border-b border-slate-200">
            <div className="px-6 py-6">
              <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Premium Talent Insights</h1>
                <p className="text-slate-600">Product Manager • Bangalore • 8-15 LPA</p>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-6 space-y-6">
            <DashboardWidgets onDrilldown={handleWidgetDrilldown} />
            
            {/* Custom Report Footer */}
            <CustomReportFooter />
          </div>
        </main>

        {/* Drilldown Panel */}
        <DrilldownPanel
          isOpen={drilldownOpen}
          onClose={() => setDrilldownOpen(false)}
          title={drilldownData.title}
          data={drilldownData.data}
          type={drilldownData.type}
        />
      </div>
    </div>
  );
};

export default Index;
