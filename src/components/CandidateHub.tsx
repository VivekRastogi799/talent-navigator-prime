import { useState } from "react";
import { Search, Star, Clock, Users, TrendingUp, ArrowLeft, Eye, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RecentSearches } from "./candidate/RecentSearches";
import { ShortlistManager } from "./candidate/ShortlistManager";
import { CandidateComparison } from "./candidate/CandidateComparison";
import { CandidateProfile } from "./candidate/CandidateProfile";

interface CandidateHubProps {
  onStartNewSearch: () => void;
  onViewProfile: (candidateId: string) => void;
}

interface SavedSearchSummary {
  totalSearches: number;
  profilesUnlocked: number;
  shortlists: number;
  avgMatchScore: number;
}

export const CandidateHub = ({ onStartNewSearch, onViewProfile }: CandidateHubProps) => {
  const [activeTab, setActiveTab] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [selectedSearch, setSelectedSearch] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'candidates' | 'insights'>('candidates');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");

  // Mock summary data - updated shortlists to 22%
  const searchSummary: SavedSearchSummary = {
    totalSearches: 24,
    profilesUnlocked: 156,
    shortlists: 22, // Changed from 8 to represent 22%
    avgMatchScore: 86
  };

  const handleSearchSelect = (search: any) => {
    setSelectedSearch(search);
  };

  const handleBackToSearches = () => {
    setSelectedSearch(null);
    setShowProfile(false);
  };

  const handleCompareSelected = (candidateIds: string[]) => {
    setSelectedForComparison(candidateIds);
    setComparisonOpen(true);
  };

  const handleViewInsights = (query: string) => {
    // Instead of redirecting to search, show insights for the specific query
    const mockSearch = {
      id: "insight-" + Date.now(),
      query: query,
      title: query,
      date: new Date().toISOString().split('T')[0],
      candidatesFound: 142,
      shortlisted: 12,
      type: "insight-view"
    };
    setSelectedSearch(mockSearch);
    setViewMode('insights');
  };

  const handleViewProfile = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setShowProfile(true);
  };

  // Show candidate profile if selected
  if (showProfile) {
    return (
      <CandidateProfile
        candidateId={selectedCandidateId}
        onBack={handleBackToSearches}
      />
    );
  }

  const mockComparisonCandidates = [
    {
      id: "1",
      name: "Rahul Sharma",
      designation: "Senior Product Manager",
      company: "Google",
      experience: "6 years",
      ctc: "₹28 LPA",
      location: "Bangalore",
      skills: ["Product Strategy", "SQL", "A/B Testing", "Market Research", "Leadership"],
      whyRelevant: "Ex-Flipkart • ISB • 0-1 Scaling experience",
      tier: "FAANG",
      status: "Active" as const,
      matchScore: 92,
      noticePeriod: "2 months",
      education: "MBA from ISB Hyderabad",
      lastActive: "2 hours ago",
      careerTimeline: [
        { period: "2018-2020", role: "MBA", company: "ISB Hyderabad", type: 'education' as const },
        { period: "2020-2022", role: "Product Manager", company: "Flipkart", type: 'work' as const },
        { period: "2022-Present", role: "Senior Product Manager", company: "Google", type: 'work' as const }
      ]
    },
    {
      id: "2",
      name: "Priya Patel",
      designation: "Product Manager",
      company: "Microsoft",
      experience: "4 years",
      ctc: "₹22 LPA",
      location: "Hyderabad",
      skills: ["Data Analytics", "User Research", "Agile", "Product Design", "Growth"],
      whyRelevant: "Data-driven PM • Growth specialist",
      tier: "FAANG",
      status: "Passive" as const,
      matchScore: 87,
      noticePeriod: "1 month",
      education: "B.Tech from IIT Delhi",
      lastActive: "5 hours ago",
      careerTimeline: [
        { period: "2017-2021", role: "B.Tech", company: "IIT Delhi", type: 'education' as const },
        { period: "2021-2023", role: "Associate Product Manager", company: "Zomato", type: 'work' as const },
        { period: "2023-Present", role: "Product Manager", company: "Microsoft", type: 'work' as const }
      ]
    }
  ];

  // If a search is selected, show the detailed view
  if (selectedSearch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={handleBackToSearches}
                className="text-slate-600 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Searches
              </Button>
              <div className="text-2xl font-bold gradient-text">TopTier</div>
              <span className="text-slate-400">•</span>
              <h1 className="text-xl font-bold text-slate-800">{selectedSearch.query}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'candidates' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('candidates')}
                className={viewMode === 'candidates' ? 'bg-primary' : ''}
              >
                <Eye className="h-4 w-4 mr-2" />
                Candidate View
              </Button>
              <Button
                variant={viewMode === 'insights' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('insights')}
                className={viewMode === 'insights' ? 'bg-primary' : ''}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Insights View
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Summary Widgets - Updated shortlists label */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="glass-card premium-shadow border-slate-200">
              <div className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{searchSummary.totalSearches}</p>
                  <p className="text-sm text-slate-600">Total Searches</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card premium-shadow border-slate-200">
              <div className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-green-100">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{searchSummary.profilesUnlocked}</p>
                  <p className="text-sm text-slate-600">Profiles Unlocked</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card premium-shadow border-slate-200">
              <div className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{searchSummary.shortlists}%</p>
                  <p className="text-sm text-slate-600">Shortlists</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card premium-shadow border-slate-200">
              <div className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{searchSummary.avgMatchScore}%</p>
                  <p className="text-sm text-slate-600">Avg Match Score</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'candidates' ? (
            <ShortlistManager 
              onViewProfile={handleViewProfile}
              onCompareSelected={handleCompareSelected}
            />
          ) : (
            <div className="text-center py-12 text-slate-500">
              <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg">Insights View for: {selectedSearch.query}</p>
              <p>Detailed analytics and insights for this search</p>
            </div>
          )}
        </div>

        {/* Comparison Modal */}
        <CandidateComparison
          isOpen={comparisonOpen}
          onClose={() => setComparisonOpen(false)}
          candidates={mockComparisonCandidates.filter(c => selectedForComparison.includes(c.id))}
          onViewProfile={handleViewProfile}
          onShortlist={(id) => console.log('Shortlist', id)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold gradient-text">TopTier</div>
            <span className="text-slate-400">•</span>
            <h1 className="text-xl font-bold text-slate-800">Candidate Discovery Hub</h1>
          </div>
          <Button 
            onClick={onStartNewSearch} 
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Search className="h-4 w-4 mr-2" />
            New Search
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Content Container with better spacing */}
        <div className="space-y-8">
          {/* Welcome Section with better positioning */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-800">Manage Your Talent Pipeline</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Access your saved searches, build shortlists, and track premium candidates all in one place
            </p>
          </div>

          {/* Search Bar - Centered and prominent */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search by keyword, role, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-base border-slate-200 focus:border-primary rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* Main Content with improved layout */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-slate-200">
                <TabsList className="grid w-full grid-cols-3 bg-transparent p-1 h-auto">
                  <TabsTrigger 
                    value="recent" 
                    className="flex items-center gap-2 py-4 px-6 text-base data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg"
                  >
                    <Clock className="h-5 w-5" />
                    Recent Searches
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shortlist" 
                    className="flex items-center gap-2 py-4 px-6 text-base data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg"
                  >
                    <Star className="h-5 w-5" />
                    Shortlisted Candidates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookmarks" 
                    className="flex items-center gap-2 py-4 px-6 text-base data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg"
                  >
                    <Search className="h-5 w-5" />
                    Bookmarked Searches
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="recent" className="mt-0">
                  <RecentSearches 
                    onViewInsights={handleViewInsights}
                    searchTerm={searchTerm}
                  />
                </TabsContent>

                <TabsContent value="shortlist" className="mt-0">
                  <ShortlistManager 
                    onViewProfile={handleViewProfile}
                    onCompareSelected={handleCompareSelected}
                  />
                </TabsContent>

                <TabsContent value="bookmarks" className="mt-0">
                  <RecentSearches 
                    onViewInsights={handleViewInsights}
                    searchTerm={searchTerm}
                    showBookmarkedOnly={true}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
