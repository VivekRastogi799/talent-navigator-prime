
import { useState } from "react";
import { Search, Star, Clock, Users, TrendingUp, ArrowLeft, Eye, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RecentSearches } from "./candidate/RecentSearches";
import { ShortlistManager } from "./candidate/ShortlistManager";
import { CandidateComparison } from "./candidate/CandidateComparison";

interface CandidateHubProps {
  onStartNewSearch: () => void;
  onViewProfile: (candidateId: string) => void;
}

interface SavedSearchSummary {
  totalSearches: number;
  profilesUnlocked: number;
  shortlists: number;
  successRate: number;
}

export const CandidateHub = ({ onStartNewSearch, onViewProfile }: CandidateHubProps) => {
  const [activeTab, setActiveTab] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [selectedSearch, setSelectedSearch] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'candidates' | 'insights'>('candidates');

  // Mock summary data
  const searchSummary: SavedSearchSummary = {
    totalSearches: 24,
    profilesUnlocked: 156,
    shortlists: 8,
    successRate: 68
  };

  const handleSearchSelect = (search: any) => {
    setSelectedSearch(search);
  };

  const handleBackToSearches = () => {
    setSelectedSearch(null);
  };

  const handleCompareSelected = (candidateIds: string[]) => {
    setSelectedForComparison(candidateIds);
    setComparisonOpen(true);
  };

  const handleViewInsights = (query: string) => {
    // Navigate to insights view - this would typically trigger the main search flow
    onStartNewSearch();
  };

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
          {/* Summary Widgets */}
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
                  <p className="text-2xl font-bold text-slate-800">{searchSummary.shortlists}</p>
                  <p className="text-sm text-slate-600">Shortlists</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card premium-shadow border-slate-200">
              <div className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-purple-100">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{searchSummary.successRate}%</p>
                  <p className="text-sm text-slate-600">Success Rate</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'candidates' ? (
            <ShortlistManager 
              onViewProfile={onViewProfile}
              onCompareSelected={handleCompareSelected}
              onViewInsights={handleViewInsights}
            />
          ) : (
            <div className="text-center py-12 text-slate-500">
              <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg">Insights View</p>
              <p>Detailed analytics and insights for this search</p>
            </div>
          )}
        </div>

        {/* Comparison Modal */}
        <CandidateComparison
          isOpen={comparisonOpen}
          onClose={() => setComparisonOpen(false)}
          candidates={mockComparisonCandidates.filter(c => selectedForComparison.includes(c.id))}
          onViewProfile={onViewProfile}
          onShortlist={(id) => console.log('Shortlist', id)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold gradient-text">TopTier</div>
            <span className="text-slate-400">•</span>
            <h1 className="text-xl font-bold text-slate-800">Saved Candidates & Past Searches</h1>
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

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Candidate Discovery Hub</h2>
          <p className="text-slate-600">Manage searches, build shortlists, and evaluate premium talent</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by keyword or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-200 focus:border-primary"
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200">
            <TabsTrigger 
              value="recent" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4" />
              Recent Searches
            </TabsTrigger>
            <TabsTrigger 
              value="shortlist" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Star className="h-4 w-4" />
              Shortlists
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarks" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Search className="h-4 w-4" />
              Bookmarked Searches
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-6">
            <RecentSearches 
              onSearchSelect={handleSearchSelect}
              onViewBookmarks={() => setActiveTab("bookmarks")}
              searchTerm={searchTerm}
            />
          </TabsContent>

          <TabsContent value="shortlist" className="mt-6">
            <ShortlistManager 
              onViewProfile={onViewProfile}
              onCompareSelected={handleCompareSelected}
              onViewInsights={handleViewInsights}
            />
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-6">
            <RecentSearches 
              onSearchSelect={handleSearchSelect}
              onViewBookmarks={() => {}}
              searchTerm={searchTerm}
              showBookmarkedOnly={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
