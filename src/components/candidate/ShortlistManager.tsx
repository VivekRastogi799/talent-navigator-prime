import { useState, useEffect } from "react";
import { Star, Users, Eye, GitCompare, Download, Share2, Tag, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ShortlistedCandidate {
  id: string;
  name: string;
  designation: string;
  company: string;
  experience: string;
  ctc: string;
  location: string;
  skills: string[];
  whyRelevant: string;
  tier: string;
  status: 'Active' | 'Passive';
  lastActive: string;
  dateShortlisted: Date;
  tags: string[];
  matchScore: number;
}

interface ShortlistManagerProps {
  onViewProfile: (candidateId: string) => void;
  onCompareSelected: (candidateIds: string[]) => void;
}

const mockShortlistedCandidates: ShortlistedCandidate[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    designation: "Senior Product Manager",
    company: "Google",
    experience: "6 years",
    ctc: "₹28 LPA",
    location: "Bangalore",
    skills: ["Product Strategy", "SQL", "A/B Testing"],
    whyRelevant: "Ex-Flipkart • ISB • 0-1 Scaling experience",
    tier: "FAANG",
    status: "Active",
    lastActive: "2 hours ago",
    dateShortlisted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ["High Priority", "Interview Ready"],
    matchScore: 92
  },
  {
    id: "2",
    name: "Priya Patel",
    designation: "Product Manager",
    company: "Microsoft",
    experience: "4 years",
    ctc: "₹22 LPA",
    location: "Hyderabad",
    skills: ["Data Analytics", "User Research", "Agile"],
    whyRelevant: "Data-driven PM • Growth specialist",
    tier: "FAANG",
    status: "Passive",
    lastActive: "5 hours ago",
    dateShortlisted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ["Growth Expert"],
    matchScore: 87
  },
  {
    id: "3",
    name: "Amit Kumar",
    designation: "Associate Product Manager",
    company: "Amazon",
    experience: "3 years",
    ctc: "₹18 LPA",
    location: "Mumbai",
    skills: ["Python", "Product Analytics", "Figma"],
    whyRelevant: "Technical PM • Immediate joiner",
    tier: "FAANG",
    status: "Active",
    lastActive: "1 day ago",
    dateShortlisted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ["Immediate Joiner", "Technical"],
    matchScore: 84
  }
];

export const ShortlistManager = ({ onViewProfile, onCompareSelected }: ShortlistManagerProps) => {
  const [candidates, setCandidates] = useState<ShortlistedCandidate[]>(mockShortlistedCandidates);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterTag, setFilterTag] = useState("");

  const allTags = Array.from(new Set(candidates.flatMap(c => c.tags)));

  const filteredCandidates = candidates
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(candidate => 
      !filterTag || candidate.tags.includes(filterTag)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore;
        case "ctc":
          return parseInt(b.ctc.replace(/[₹L]/g, "")) - parseInt(a.ctc.replace(/[₹L]/g, ""));
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "date":
        default:
          return b.dateShortlisted.getTime() - a.dateShortlisted.getTime();
      }
    });

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const selectAllVisible = () => {
    setSelectedCandidates(filteredCandidates.map(c => c.id));
  };

  const clearSelection = () => {
    setSelectedCandidates([]);
  };

  const formatDateShortlisted = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <h3 className="font-semibold text-slate-800">Shortlisted Candidates</h3>
          <Badge variant="outline">{candidates.length}</Badge>
        </div>
        
        {selectedCandidates.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-blue-600">
              {selectedCandidates.length} selected
            </Badge>
            <Button 
              size="sm" 
              onClick={() => onCompareSelected(selectedCandidates)}
              disabled={selectedCandidates.length < 2}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <GitCompare className="h-4 w-4 mr-1" />
              Compare
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search shortlisted candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Latest First</SelectItem>
            <SelectItem value="match">Match Score</SelectItem>
            <SelectItem value="ctc">Highest CTC</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterTag} onValueChange={setFilterTag}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
            onCheckedChange={(checked) => checked ? selectAllVisible() : clearSelection()}
          />
          <span className="text-sm text-slate-600">
            Select all visible ({filteredCandidates.length})
          </span>
        </div>
        
        {selectedCandidates.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Tag className="h-4 w-4 mr-1" />
              Tag
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        )}
      </div>

      {/* Candidate List */}
      <div className="space-y-3">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="p-4 hover:shadow-md transition-shadow border-slate-200">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedCandidates.includes(candidate.id)}
                onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-slate-800">{candidate.name}</h4>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {candidate.matchScore}% match
                    </Badge>
                    <Badge variant={candidate.status === "Active" ? "default" : "secondary"}>
                      {candidate.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500">
                    Shortlisted {formatDateShortlisted(candidate.dateShortlisted)}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 mb-2">
                  {candidate.designation} at {candidate.company} • {candidate.experience} • {candidate.ctc}
                </p>
                
                <p className="text-sm text-slate-600 mb-2">{candidate.whyRelevant}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {candidate.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    onClick={() => onViewProfile(candidate.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Star className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <p>No shortlisted candidates found</p>
        </div>
      )}
    </div>
  );
};