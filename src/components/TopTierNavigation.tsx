
import { Search, Bell, MessageSquare, Briefcase, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopTierNavigationProps {
  onEnterTopTier: () => void;
}

export const TopTierNavigation = ({ onEnterTopTier }: TopTierNavigationProps) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Nav */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">naukri</div>
              <span className="text-xs text-slate-500">.com</span>
            </div>
            
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-slate-700 hover:text-blue-600 font-medium">Jobs</a>
              <a href="#" className="text-slate-700 hover:text-blue-600 font-medium">Companies</a>
              <a href="#" className="text-slate-700 hover:text-blue-600 font-medium">Services</a>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium">AirEx</a>
                <span className="text-slate-300">|</span>
                <Button
                  onClick={onEnterTopTier}
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 font-medium px-2 py-1 h-auto"
                >
                  TopTier
                </Button>
                <span className="text-slate-300">|</span>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium">TalentPulse</a>
              </div>
            </nav>
          </div>

          {/* Right Section - Search and Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search jobs, skills, companies..."
                className="pl-10 pr-4 py-2 w-80 border-slate-200 rounded-lg focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                <Briefcase className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                R
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TopTier Preview Banner - only show when hovering over TopTier */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">TopTier AI Recruiting</div>
                  <div className="text-xs text-slate-600">Premium talent intelligence platform</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>2.8M+ Premium Candidates</span>
                </div>
                <div>•</div>
                <div>AI-Powered Matching</div>
                <div>•</div>
                <div>Real-time Market Insights</div>
              </div>
            </div>
            
            <Button
              onClick={onEnterTopTier}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg shadow-sm"
            >
              Enter TopTier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
