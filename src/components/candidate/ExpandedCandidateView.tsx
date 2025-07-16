import { useState, useEffect } from "react";
import { X, ArrowLeft, Search, SortAsc, Filter, Grid, List, Bookmark, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CandidateCard } from "./CandidateCard";
import { CandidateDeepDive } from "./CandidateDeepDive";

interface ExpandedCandidateViewProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: any[];
  title: string;
  searchQuery?: string;
}

export const ExpandedCandidateView = ({ 
  isOpen, 
  onClose, 
  candidates, 
  title,
  searchQuery = ""
}: ExpandedCandidateViewProps) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [unlocksLeft, setUnlocksLeft] = useState(5);
  const [bookmarkedCandidates, setBookmarkedCandidates] = useState<string[]>([]);

  // Store this search in recent searches
  useEffect(() => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const newSearch = {
      query: title,
      timestamp: new Date().toISOString(),
      resultCount: candidates.length
    };
    
    const updatedSearches = [newSearch, ...recentSearches.filter((s: any) => s.query !== title)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  }, [title, candidates.length]);

  const handleViewProfile = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      if (!candidate.isUnlocked && unlocksLeft > 0) {
        candidate.isUnlocked = true;
        setUnlocksLeft(prev => prev - 1);
      }
      if (candidate.isUnlocked) {
        setSelectedCandidate(candidate);
        setDeepDiveOpen(true);
      }
    }
  };

  const handleBookmark = (candidateId: string) => {
    setBookmarkedCandidates(prev => {
      const newBookmarks = prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId];
      
      // Store bookmarks with search context
      const bookmarkData = {
        candidateId,
        searchQuery: title,
        timestamp: new Date().toISOString()
      };
      
      const allBookmarks = JSON.parse(localStorage.getItem('candidateBookmarks') || '[]');
      const updatedBookmarks = prev.includes(candidateId)
        ? allBookmarks.filter((b: any) => b.candidateId !== candidateId)
        : [...allBookmarks, bookmarkData];
      
      localStorage.setItem('candidateBookmarks', JSON.stringify(updatedBookmarks));
      return newBookmarks;
    });
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.whyRelevant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'ctc':
        return parseInt(b.ctc.replace(/[^\d]/g, '')) - parseInt(a.ctc.replace(/[^\d]/g, ''));
      case 'experience':
        return parseInt(b.experience.replace(/[^\d]/g, '')) - parseInt(a.experience.replace(/[^\d]/g, ''));
      default:
        return 0; // relevance - keep original order
    }
  });

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
                  <p className="text-sm text-slate-600">{candidates.length} candidates found</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  💳 {unlocksLeft} unlocks left
                </Badge>
                <div className="flex border border-slate-200 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by designation, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Best Match</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                  <SelectItem value="ctc">Highest CTC</SelectItem>
                  <SelectItem value="experience">Most Experience</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {sortedCandidates.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">No candidates found</h3>
                <p className="text-slate-500">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
                : "space-y-3"
              }>
                {sortedCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onViewProfile={handleViewProfile}
                    onSave={handleBookmark}
                    onShortlist={handleBookmark}
                    unlocksLeft={unlocksLeft}
                    isBookmarked={bookmarkedCandidates.includes(candidate.id)}
                    compact={viewMode === 'list'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deep Dive Modal */}
      {selectedCandidate && (
        <CandidateDeepDive
          isOpen={deepDiveOpen}
          onClose={() => setDeepDiveOpen(false)}
          candidate={selectedCandidate}
          onSave={() => handleBookmark(selectedCandidate.id)}
          onShare={() => console.log('Share candidate')}
          onTag={() => console.log('Tag candidate')}
          onExportResume={() => console.log('Export resume')}
        />
      )}
    </>
  );
};