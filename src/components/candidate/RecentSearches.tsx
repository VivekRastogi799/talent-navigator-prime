
import { useState } from "react";
import { Search, Calendar, Users, BarChart3, Star, Filter, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RecentSearchesProps {
  onSelectSearch?: (searchId: string) => void;
  onViewCandidates?: (searchId: string) => void;
  onSearchSelect?: (search: any) => void;
  onViewBookmarks?: () => void;
  searchTerm?: string;
  showBookmarkedOnly?: boolean;
}

export const RecentSearches = ({ 
  onSelectSearch, 
  onViewCandidates,
  onSearchSelect,
  onViewBookmarks,
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
      shortlisted: 8,
      type: "jd-search",
      status: "active"
    },
    {
      id: "2", 
      title: "Data Scientist • ML Engineer",
      date: "2024-01-14",
      candidatesFound: 89,
      shortlisted: 12,
      type: "skill-search",
      status: "completed"
    },
    {
      id: "3",
      title: "Frontend Developer • React • 3-5 years",
      date: "2024-01-12",
      candidatesFound: 234,
      shortlisted: 15,
      type: "skill-search", 
      status: "active"
    }
  ];

  const bookmarkedSearches = [
    {
      id: "4",
      title: "VP Engineering - SaaS Startup",
      date: "2024-01-10",
      candidatesFound: 67,
      shortlisted: 5,
      type: "jd-search",
      status: "bookmarked"
    }
  ];

  const shortlists = [
    {
      id: "5",
      title: "Product Manager Shortlist",
      date: "2024-01-15",
      candidatesFound: 0,
      shortlisted: 8,
      type: "shortlist",
      status: "active"
    }
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "candidates", label: "Most Candidates" },
    { value: "shortlisted", label: "Most Shortlisted" },
    { value: "alphabetical", label: "Alphabetical" }
  ];

  const filterSearches = (searches: any[]) => {
    return searches.filter(search => 
      search.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearchSelect = (search: any) => {
    if (onSearchSelect) {
      onSearchSelect(search);
    } else if (onSelectSearch) {
      onSelectSearch(search.id);
    }
  };

  const handleViewCandidates = (searchId: string) => {
    if (onViewCandidates) {
      onViewCandidates(searchId);
    }
  };

  const renderSearchCard = (search: any) => (
    <Card key={search.id} className="border-slate-200 hover:border-primary/50 transition-colors cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                {search.title}
              </h3>
              {search.status === 'bookmarked' && (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(search.date).toLocaleDateString()}
              </div>
              {search.candidatesFound > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {search.candidatesFound} candidates
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {search.shortlisted} shortlisted
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSearchSelect(search)}
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                View Insights
              </Button>
              {search.shortlisted > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewCandidates(search.id)}
                  className="text-slate-600 hover:text-primary"
                >
                  <Users className="h-4 w-4 mr-1" />
                  View Candidates
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
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
              className="pl-10"
            />
          </div>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
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
        <div className="grid gap-4">
          {filterSearches(searchesToShow).map(renderSearchCard)}
          {filterSearches(searchesToShow).length === 0 && (
            <Card className="border-slate-200">
              <CardContent className="text-center py-8">
                <p className="text-slate-500">No bookmarked searches yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent Searches</TabsTrigger>
            <TabsTrigger value="shortlists">Shortlists</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {filterSearches(recentSearches).map(renderSearchCard)}
              {filterSearches(recentSearches).length === 0 && (
                <Card className="border-slate-200">
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">No recent searches found.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shortlists" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {filterSearches(shortlists).map(renderSearchCard)}
              {filterSearches(shortlists).length === 0 && (
                <Card className="border-slate-200">
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">No shortlists created yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {filterSearches(bookmarkedSearches).map(renderSearchCard)}
              {filterSearches(bookmarkedSearches).length === 0 && (
                <Card className="border-slate-200">
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">No bookmarked searches yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
