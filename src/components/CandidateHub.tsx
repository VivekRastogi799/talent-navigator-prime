import { useState } from "react";
import { Search, Star, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RecentSearches } from "./candidate/RecentSearches";
import { ShortlistManager } from "./candidate/ShortlistManager";
import { CandidateComparison } from "./candidate/CandidateComparison";

interface CandidateHubProps {
  onStartNewSearch: () => void;
  onViewProfile: (candidateId: string) => void;
}

const quickStats = [
  { label: "Total Searches", value: "24", icon: Search, color: "blue" },
  { label: "Shortlisted", value: "8", icon: Star, color: "yellow" },
  { label: "Profiles Viewed", value: "45", icon: Users, color: "green" },
  { label: "Success Rate", value: "68%", icon: TrendingUp, color: "purple" }
];

export const CandidateHub = ({ onStartNewSearch, onViewProfile }: CandidateHubProps) => {
  const [activeTab, setActiveTab] = useState("recent");
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  const handleSearchSelect = (search: any) => {
    // Navigate to search results with the selected search parameters
    console.log('Selected search:', search);
    onStartNewSearch();
  };

  const handleViewBookmarks = () => {
    setActiveTab("bookmarks");
  };

  const handleCompareSelected = (candidateIds: string[]) => {
    setSelectedForComparison(candidateIds);
    setComparisonOpen(true);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Candidate Hub</h1>
          <p className="text-slate-600">Manage your searches, shortlists, and evaluations</p>
        </div>
        <Button onClick={onStartNewSearch} className="bg-blue-600 hover:bg-blue-700">
          <Search className="h-4 w-4 mr-2" />
          Start New Search
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Searches
          </TabsTrigger>
          <TabsTrigger value="shortlist" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Shortlisted
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Bookmarked Searches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6">
          <RecentSearches 
            onSearchSelect={handleSearchSelect}
            onViewBookmarks={handleViewBookmarks}
          />
        </TabsContent>

        <TabsContent value="shortlist" className="mt-6">
          <ShortlistManager 
            onViewProfile={onViewProfile}
            onCompareSelected={handleCompareSelected}
          />
        </TabsContent>

        <TabsContent value="bookmarks" className="mt-6">
          <RecentSearches 
            onSearchSelect={handleSearchSelect}
            onViewBookmarks={() => {}}
          />
        </TabsContent>
      </Tabs>

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
};