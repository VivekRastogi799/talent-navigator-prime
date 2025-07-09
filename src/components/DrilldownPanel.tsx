import { useState, useMemo } from "react";
import { X, Eye, Download, BookmarkPlus, Filter, SortAsc, User, Building, MapPin, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DrilldownPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Candidate[];
  type: 'companies' | 'skills' | 'locations' | 'candidates';
}

interface Candidate {
  id: string;
  name: string;
  designation: string;
  company: string;
  experience: string;
  ctc: string;
  location: string;
  noticePeriod: string;
  skills: string[];
  lastUpdated: string;
  status: 'Active' | 'Passive';
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    designation: "Senior Product Manager",
    company: "Google",
    experience: "6 years",
    ctc: "₹28 LPA",
    location: "Bangalore",
    noticePeriod: "2 months",
    skills: ["Product Strategy", "SQL", "A/B Testing"],
    lastUpdated: "2 days ago",
    status: "Active"
  },
  {
    id: "2",
    name: "Priya Patel",
    designation: "Product Manager",
    company: "Microsoft",
    experience: "4 years",
    ctc: "₹22 LPA",
    location: "Hyderabad",
    noticePeriod: "1 month",
    skills: ["Data Analysis", "User Research", "Agile"],
    lastUpdated: "1 week ago",
    status: "Passive"
  },
  {
    id: "3",
    name: "Amit Kumar",
    designation: "Associate Product Manager",
    company: "Amazon",
    experience: "3 years",
    ctc: "₹18 LPA",
    location: "Mumbai",
    noticePeriod: "Immediate",
    skills: ["Python", "Product Analytics", "Figma"],
    lastUpdated: "3 days ago",
    status: "Active"
  },
  {
    id: "4",
    name: "Sneha Reddy",
    designation: "Senior Product Manager",
    company: "Flipkart",
    experience: "5 years",
    ctc: "₹25 LPA",
    location: "Bangalore",
    noticePeriod: "3 months",
    skills: ["Product Strategy", "Data Analytics", "Leadership"],
    lastUpdated: "1 day ago",
    status: "Active"
  },
  {
    id: "5",
    name: "Arjun Singh",
    designation: "Product Manager",
    company: "Zomato",
    experience: "4 years",
    ctc: "₹20 LPA",
    location: "Gurugram",
    noticePeriod: "2 months",
    skills: ["Product Management", "Analytics", "Mobile Apps"],
    lastUpdated: "5 days ago",
    status: "Passive"
  }
];

export const DrilldownPanel = ({ isOpen, onClose, title, data, type }: DrilldownPanelProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'passive'>('all');

  // Use provided data or fallback to mock data
  const candidates = data.length > 0 ? data : mockCandidates;

  // Filter and sort candidates
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(candidate => 
        candidate.status.toLowerCase() === filterStatus
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => {
          const timeMap = { 'day': 1, 'days': 1, 'week': 7, 'weeks': 7 };
          const aTime = parseInt(a.lastUpdated.split(' ')[0]) || 0;
          const bTime = parseInt(b.lastUpdated.split(' ')[0]) || 0;
          return aTime - bTime;
        });
      case 'ctc':
        return filtered.sort((a, b) => {
          const aAmount = parseInt(a.ctc.replace(/[^0-9]/g, '')) || 0;
          const bAmount = parseInt(b.ctc.replace(/[^0-9]/g, '')) || 0;
          return bAmount - aAmount;
        });
      case 'experience':
        return filtered.sort((a, b) => {
          const aExp = parseInt(a.experience.split(' ')[0]) || 0;
          const bExp = parseInt(b.experience.split(' ')[0]) || 0;
          return bExp - aExp;
        });
      default:
        return filtered;
    }
  }, [candidates, searchTerm, filterStatus, sortBy]);

  const handleCandidateAction = (candidateId: string, action: 'view' | 'save' | 'download') => {
    // Handle different actions
    console.log(`Action: ${action} for candidate: ${candidateId}`);
    // You can implement actual functionality here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-slate-200 shadow-lg z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search and Sort */}
        <div className="space-y-3">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="ctc">Highest CTC</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: 'all' | 'active' | 'passive') => setFilterStatus(value)}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="passive">Passive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results counter */}
        <div className="mt-2 text-sm text-slate-600">
          {filteredAndSortedCandidates.length} of {candidates.length} candidates
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredAndSortedCandidates.length > 0 ? (
          filteredAndSortedCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-slate-800">{candidate.name}</h3>
                    <p className="text-sm text-slate-600">{candidate.designation}</p>
                  </div>
                  <Badge 
                    variant={candidate.status === 'Active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {candidate.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    <span>{candidate.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{candidate.ctc} • {candidate.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{candidate.noticePeriod}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Updated {candidate.lastUpdated}</span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCandidateAction(candidate.id, 'view')}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCandidateAction(candidate.id, 'save')}
                      >
                        <BookmarkPlus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCandidateAction(candidate.id, 'download')}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <div className="mb-2">No candidates found</div>
            <div className="text-sm">Try adjusting your search or filters</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export List ({filteredAndSortedCandidates.length})
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Save Report
          </Button>
        </div>
      </div>
    </div>
  );
};
