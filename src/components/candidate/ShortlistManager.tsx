
import React, { useState } from 'react';
import { Filter, Users, TrendingUp, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ShortlistManagerProps {
  candidates?: any[];
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

  const stats = [
    { label: 'Total Shortlisted', value: candidates.length, icon: Users },
    { label: 'This Week', value: Math.floor(candidates.length * 0.3), icon: TrendingUp },
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

  console.log('ShortlistManager - sortOptions:', sortOptions);
  console.log('ShortlistManager - filterOptions:', filterOptions);

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

      {/* Candidate List Placeholder */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Shortlisted Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            {candidates.length === 0 ? (
              <p>No candidates shortlisted yet. Start your search to find talent.</p>
            ) : (
              <p>Candidate list will be displayed here.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
