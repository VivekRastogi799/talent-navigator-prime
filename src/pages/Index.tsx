
import { useState } from "react";
import { Search, Download, BookmarkPlus, Settings, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterSidebar } from "@/components/FilterSidebar";
import { DashboardWidgets } from "@/components/DashboardWidgets";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              NaukriX Premium
            </div>
          </div>
          
          {/* Center search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by role, location, CTC, company..."
                className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 hover:border-blue-500">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Saved Reports
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <FilterSidebar isOpen={sidebarOpen} />
        
        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Premium Talent Insights</h1>
            <p className="text-slate-600">Product Manager • Bangalore • 8-15 LPA</p>
          </div>
          
          <DashboardWidgets />
        </main>
      </div>
    </div>
  );
};

export default Index;
