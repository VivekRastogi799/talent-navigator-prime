
import { useState, useEffect } from "react";
import { Clock, Search, Bookmark, Users, X, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchItem {
  id: string;
  query: string;
  filters: {
    location?: string[];
    experience?: string;
    skills?: string[];
    company?: string[];
  };
  resultCount: number;
  timestamp: Date;
  bookmarked: boolean;
  status: 'completed' | 'in-progress' | 'failed';
  shortlistedCount: number;
}

interface RecentSearchesProps {
  onSearchSelect: (search: SearchItem) => void;
  onViewBookmarks: () => void;
  searchTerm?: string;
  showBookmarkedOnly?: boolean;
}

const mockRecentSearches: SearchItem[] = [
  {
    id: "1",
    query: "Senior Product Manager",
    filters: {
      location: ["Bangalore", "Mumbai"],
      experience: "5-8 years",
      skills: ["Product Strategy", "Analytics"],
      company: ["FAANG", "Unicorn"]
    },
    resultCount: 156,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    bookmarked: true,
    status: 'completed',
    shortlistedCount: 8
  },
  {
    id: "2", 
    query: "Frontend Developer React",
    filters: {
      location: ["Hyderabad", "Pune"],
      experience: "3-6 years",
      skills: ["React", "TypeScript", "Next.js"]
    },
    resultCount: 243,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    bookmarked: false,
    status: 'completed',
    shortlistedCount: 12
  },
  {
    id: "3",
    query: "Data Scientist ML",
    filters: {
      location: ["Bangalore"],
      experience: "4-7 years", 
      skills: ["Python", "Machine Learning", "Deep Learning"],
      company: ["Startup", "Unicorn"]
    },
    resultCount: 89,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    bookmarked: true,
    status: 'completed',
    shortlistedCount: 5
  },
  {
    id: "4",
    query: "DevOps Engineer",
    filters: {
      location: ["Remote", "Bangalore"],
      experience: "4-8 years",
      skills: ["AWS", "Kubernetes", "Docker"]
    },
    resultCount: 67,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    bookmarked: false,
    status: 'in-progress',
    shortlistedCount: 0
  }
];

export const RecentSearches = ({ onSearchSelect, onViewBookmarks, searchTerm = "", showBookmarkedOnly = false }: RecentSearchesProps) => {
  const [searches, setSearches] = useState<SearchItem[]>(mockRecentSearches);

  const toggleBookmark = (searchId: string) => {
    setSearches(prev => prev.map(search => 
      search.id === searchId 
        ? { ...search, bookmarked: !search.bookmarked }
        : search
    ));
  };

  const removeSearch = (searchId: string) => {
    setSearches(prev => prev.filter(search => search.id !== searchId));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  // Filter searches based on search term and bookmark status
  const filteredSearches = searches
    .filter(search => {
      if (showBookmarkedOnly && !search.bookmarked) return false;
      if (searchTerm) {
        return search.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
               search.filters.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
               search.filters.location?.some(loc => loc.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return true;
    });

  const bookmarkedCount = searches.filter(s => s.bookmarked).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-slate-600" />
          <h3 className="font-semibold text-slate-800">
            {showBookmarkedOnly ? 'Bookmarked Searches' : 'Recent Searches'}
          </h3>
          <Badge variant="outline">{filteredSearches.length}</Badge>
        </div>
        {!showBookmarkedOnly && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewBookmarks}
            className="text-primary border-primary/20 hover:bg-primary/10"
          >
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmarked ({bookmarkedCount})
          </Button>
        )}
      </div>

      {/* Search List */}
      <div className="space-y-3">
        {filteredSearches.map((search) => (
          <Card key={search.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer border-slate-200 hover:border-primary/30">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0" onClick={() => onSearchSelect(search)}>
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-800 truncate">{search.query}</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <Users className="h-3 w-3 mr-1" />
                    {search.resultCount}
                  </Badge>
                  <Badge className={getStatusColor(search.status)}>
                    {search.status}
                  </Badge>
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {search.filters.location && (
                    <Badge variant="secondary" className="text-xs">
                      📍 {search.filters.location.join(", ")}
                    </Badge>
                  )}
                  {search.filters.experience && (
                    <Badge variant="secondary" className="text-xs">
                      ⏱️ {search.filters.experience}
                    </Badge>
                  )}
                  {search.filters.skills && search.filters.skills.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      🔧 {search.filters.skills.slice(0, 2).join(", ")}
                      {search.filters.skills.length > 2 && ` +${search.filters.skills.length - 2}`}
                    </Badge>
                  )}
                  {search.filters.company && (
                    <Badge variant="secondary" className="text-xs">
                      🏢 {search.filters.company.join(", ")}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatTimeAgo(search.timestamp)}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {search.shortlistedCount} shortlisted
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(search.id);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Bookmark className={`h-4 w-4 ${search.bookmarked ? 'fill-primary text-primary' : 'text-slate-400'}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(search.id);
                  }}
                  className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSearches.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Search className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <p>No searches found</p>
          {searchTerm && <p className="text-sm">Try adjusting your search terms</p>}
        </div>
      )}
    </div>
  );
};
