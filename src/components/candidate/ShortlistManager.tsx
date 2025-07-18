
import React, { useState } from 'react';
import { Filter, Users, TrendingUp, MoreVertical, Eye, Star, MapPin, DollarSign, Calendar, Building, Target, Award, GraduationCap, Briefcase } from 'lucide-react';
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
}

export const ShortlistManager = ({ 
  candidates = [], 
  onFilterChange,
  onViewProfile,
  onCompareSelected
}: ShortlistManagerProps) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Mock candidates data with enhanced information
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
    },
    {
      id: "4",
      name: "Sneha Reddy",
      designation: "Senior Product Manager",
      company: "Zomato",
      experience: "5 years",
      ctc: "₹25 LPA",
      location: "Gurgaon",
      skills: ["Growth Hacking", "User Acquisition", "Data Science", "Product Marketing", "Strategy"],
      whyRelevant: "Growth expert • Scaled 0-1 products",
      tier: "Unicorn",
      status: "Passive",
      matchScore: 89,
      noticePeriod: "2 months",
      education: "MBA from IIM Bangalore",
      lastActive: "3 hours ago"
    }
  ];

  const candidatesToShow = candidates.length > 0 ? candidates : mockCandidates;

  // Calculate average match score
  const avgMatchScore = Math.round(candidatesToShow.reduce((sum, candidate) => sum + candidate.matchScore, 0) / candidatesToShow.length);

  const stats = [
    { label: 'Total Shortlisted', value: candidatesToShow.length, icon: Users },
    { label: 'This Week', value: Math.floor(candidatesToShow.length * 0.3), icon: TrendingUp },
    { label: 'Avg Match Score', value: `${avgMatchScore}%`, icon: Target },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'experience', label: 'Experience' },
    { value: 'salary', label: 'Salary' },
    { value: 'relevance', label: 'Match Score' }
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

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
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

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px] border-slate-200">
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
          <Button variant="outline" size="sm" className="border-slate-200">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-slate-200">
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

      {/* Enhanced Candidate List - Redesigned based on reference */}
      <div className="space-y-4">
        {candidatesToShow.map((candidate) => (
          <Card key={candidate.id} className="border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedCandidates.includes(candidate.id)}
                  onChange={() => handleCandidateSelect(candidate.id)}
                  className="mt-3 h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                />
                
                <div className="flex-1">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                        <Badge variant={candidate.tier === 'FAANG' ? 'default' : 'secondary'} className="text-xs font-medium">
                          {candidate.tier}
                        </Badge>
                        <Badge variant={candidate.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                          {candidate.status}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold text-slate-700 mb-2">{candidate.designation}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-2xl font-bold text-primary">{candidate.matchScore}%</div>
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          Match
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Key Details Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700 font-medium">{candidate.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700">{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700 font-medium">{candidate.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700 font-semibold">{candidate.ctc}</span>
                    </div>
                  </div>

                  {/* Education and Additional Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{candidate.education}</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium bg-slate-50 px-3 py-2 rounded-lg border">
                      {candidate.whyRelevant}
                    </p>
                  </div>

                  {/* Skills Section */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-slate-300 bg-slate-50">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs border-slate-300 bg-slate-50 text-slate-500">
                          +{candidate.skills.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Footer with Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Notice: {candidate.noticePeriod}</span>
                      </div>
                      <div>Last active: {candidate.lastActive}</div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-slate-200 text-primary hover:bg-primary hover:text-white">
                        <Star className="h-4 w-4 mr-1" />
                        Shortlist
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onViewProfile?.(candidate.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
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
