
import { useState } from "react";
import { Download, BookmarkPlus, Settings, User, Menu, X, Users } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <header className="bg-white border-b border-naukri-blue-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-naukri-primary hover:bg-naukri-blue-50"
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
              className="text-naukri-blue-600 border-naukri-blue-200 hover:border-naukri-primary hover:text-naukri-primary hover:bg-naukri-blue-50"
            >
              <Users className="h-4 w-4 mr-2" />
              Saved Candidates
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-naukri-blue-600 border-naukri-blue-200 hover:border-naukri-primary hover:text-naukri-primary hover:bg-naukri-blue-50"
            >
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Saved Reports
            </Button>
            <Button 
              size="sm" 
              className="bg-naukri-primary hover:bg-naukri-primary-dark shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-naukri-primary hover:bg-naukri-blue-50"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-naukri-primary hover:bg-naukri-blue-50"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <EnhancedFilterSidebar isOpen={sidebarOpen} />
        
        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} ${drilldownOpen ? 'mr-96' : 'mr-0'}`}>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Premium Talent Insights</h1>
            <p className="text-slate-600">Product Manager • Bangalore • 8-15 LPA</p>
          </div>
          
          <div className="space-y-6">
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
