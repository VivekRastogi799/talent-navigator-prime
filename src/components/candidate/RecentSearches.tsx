import { useState } from "react";
import { Search, Calendar, BarChart3, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RecentSearchesProps {
  onViewInsights?: (query: string) => void;
  searchTerm?: string;
  showBookmarkedOnly?: boolean;
}

export const RecentSearches = ({ 
  onViewInsights,
  searchTerm: externalSearchTerm,
  showBookmarkedOnly = false
}: RecentSearchesProps) => {
  const [searchQuery, setSearchQuery] = useState(externalSearchTerm || "");
  const [sortBy, setSortBy] = useState("recent");

  const recentSearches = [
    {
      id: "1",
      title: "Senior Product Manager - B2C",
      date: "2024-01-15",
      candidatesFound: 142,
      shortlisted: 0,
      type: "jd-search",
      status: "active",
      query: "Senior Product Manager - B2C"
    },
    {
      id: "2", 
      title: "Data Scientist • ML Engineer",
      date: "2024-01-14",
      candidatesFound: 89,
      shortlisted: 0,
      type: "skill-search",
      status: "completed",
      query: "Data Scientist • ML Engineer"
    },
    {
      id: "3",
      title: "Frontend Developer • React • 3-5 years",
      date: "2024-01-12",
      candidatesFound: 234,
      shortlisted: 0,
      type: "skill-search", 
      status: "active",
      query: "Frontend Developer • React • 3-5 years"
    }
  ];

  const bookmarkedSearches = [
    {
      id: "4",
      title: "VP Engineering - SaaS Startup",
      date: "2024-01-10",
      candidatesFound: 67,
      shortlisted: 0,
      type: "jd-search",
      status: "bookmarked",
      query: "VP Engineering - SaaS Startup"
    }
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "candidates", label: "Most Candidates" },
    { value: "alphabetical", label: "Alphabetical" }
  ];

  const filterSearches = (searches: any[]) => {
    return searches.filter(search => 
      search.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderSearchCard = (search: any) => (
    <Card key={search.id} className="border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors">
                {search.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(search.date).toLocaleDateString()}</span>
              </div>
              {search.candidatesFound > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{search.candidatesFound}</span>
                  <span>candidates found</span>
                </div>
              )}
            </div>

            <div className="text-sm text-slate-500">
              Search query: "{search.query}"
            </div>
          </div>

          <div className="ml-4">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onViewInsights?.(search.query)}
              className="bg-primary hover:bg-primary/90 text-white shadow-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Insights
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // If showBookmarkedOnly is true, only show bookmarked searches
  const searchesToShow = showBookmarkedOnly ? bookmarkedSearches : recentSearches;

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search your saved searches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200"
            />
          </div>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] border-slate-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content based on showBookmarkedOnly flag */}
      {showBookmarkedOnly ? (
        <div className="space-y-4">
          {filterSearches(searchesToShow).map(renderSearchCard)}
          {filterSearches(searchesToShow).length === 0 && (
            <Card className="border-slate-200">
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No bookmarked searches yet.</p>
                <p className="text-slate-400 text-sm mt-2">Your bookmarked searches will appear here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filterSearches(recentSearches).map(renderSearchCard)}
          {filterSearches(recentSearches).length === 0 && (
            <Card className="border-slate-200">
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No recent searches found.</p>
                <p className="text-slate-400 text-sm mt-2">Your search history will appear here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
