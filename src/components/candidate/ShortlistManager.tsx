
import React, { useState } from 'react';
import { Filter, Users, TrendingUp, MoreVertical, Eye, Star, MapPin, DollarSign, Calendar, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Candidate {
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
  matchScore: number;
  noticePeriod: string;
  education: string;
  lastActive: string;
}

interface ShortlistManagerProps {
  candidates?: Candidate[];
  onFilterChange?: (filters: any) => void;
  onViewProfile?: (candidateId: string) => void;
  onCompareSelected?: (candidateIds: string[]) => void;
  onViewInsights?: (query: string) => void;
}

export const ShortlistManager = ({ 
  candidates = [], 
  onFilterChange,
  onViewProfile,
  onCompareSelected,
  onViewInsights
}: ShortlistManagerProps) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Mock candidates data
  const mockCandidates: Candidate[] = [
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
      status: "Active",
      matchScore: 92,
      noticePeriod: "2 months",
      education: "MBA from ISB Hyderabad",
      lastActive: "2 hours ago"
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
      status: "Passive",
      matchScore: 87,
      noticePeriod: "1 month",
      education: "B.Tech from IIT Delhi",
      lastActive: "5 hours ago"
    },
    {
      id: "3",
      name: "Arjun Singh",
      designation: "Associate Product Manager",
      company: "Flipkart",
      experience: "3 years",
      ctc: "₹18 LPA",
      location: "Bangalore",
      skills: ["Product Analytics", "User Experience", "Market Research", "Strategy", "SQL"],
      whyRelevant: "Strong analytical background • Fast learner",
      tier: "Unicorn",
      status: "Active",
      matchScore: 84,
      noticePeriod: "3 months",
      education: "B.Tech from IIT Bombay",
      lastActive: "1 day ago"
    }
  ];

  const candidatesToShow = candidates.length > 0 ? candidates : mockCandidates;

  const stats = [
    { label: 'Total Shortlisted', value: candidatesToShow.length, icon: Users },
    { label: 'This Week', value: Math.floor(candidatesToShow.length * 0.3), icon: TrendingUp },
    { label: 'Response Rate', value: '68%', icon: Filter },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'experience', label: 'Experience' },
    { value: 'salary', label: 'Salary' },
    { value: 'relevance', label: 'Relevance Score' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Candidates' },
    { value: 'active', label: 'Active Looking' },
    { value: 'passive', label: 'Open to Offers' },
    { value: 'contacted', label: 'Already Contacted' }
  ];

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleViewInsights = () => {
    if (onViewInsights) {
      onViewInsights("Product Manager shortlist insights");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
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

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewInsights}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Insights
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export List</DropdownMenuItem>
              <DropdownMenuItem>Share Shortlist</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-4">
        {candidatesToShow.map((candidate) => (
          <Card key={candidate.id} className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleCandidateSelect(candidate.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{candidate.name}</h3>
                        <p className="text-slate-600">{candidate.designation}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{candidate.matchScore}%</div>
                        <div className="text-sm text-slate-500">Match Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{candidate.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{candidate.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{candidate.ctc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{candidate.location}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-slate-600 mb-2">{candidate.whyRelevant}</p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={candidate.status === 'Active' ? 'default' : 'secondary'}>
                          {candidate.status}
                        </Badge>
                        <span className="text-sm text-slate-500">Last active: {candidate.lastActive}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewProfile?.(candidate.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCandidates.length > 1 && (
        <div className="fixed bottom-6 right-6">
          <Button 
            onClick={() => onCompareSelected?.(selectedCandidates)}
            className="bg-primary hover:bg-primary/90 shadow-lg"
          >
            Compare Selected ({selectedCandidates.length})
          </Button>
        </div>
      )}
    </div>
  );
};
