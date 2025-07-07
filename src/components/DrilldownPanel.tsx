
import { useState } from "react";
import { X, Eye, Download, BookmarkPlus, Filter, SortAsc, User, Building, MapPin, Clock, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DrilldownModal } from "./DrilldownModal";

interface DrilldownPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[];
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
    skills: ["Data Analytics", "User Research", "Agile"],
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
  }
];

export const DrilldownPanel = ({ isOpen, onClose, title, data, type }: DrilldownPanelProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showCandidates, setShowCandidates] = useState(false);

  const handleDrilldownClick = () => {
    setModalOpen(true);
  };

  const handleViewCandidates = () => {
    setShowCandidates(true);
    setModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-slate-200 shadow-lg z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mb-3">
            <Button 
              onClick={handleDrilldownClick}
              variant="outline" 
              size="sm" 
              className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Drill Down
            </Button>
            <Button 
              onClick={() => setShowCandidates(true)}
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <User className="h-4 w-4 mr-1" />
              View All
            </Button>
          </div>
          
          {/* Search and Sort */}
          {showCandidates && (
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
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {showCandidates ? (
            // Show candidate list
            mockCandidates.map((candidate) => (
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
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Updated {candidate.lastUpdated}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BookmarkPlus className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Show initial drilldown options
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">Choose Action</h3>
              <p className="text-slate-600 mb-6">Select how you'd like to explore this data</p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleDrilldownClick}
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Detailed Analysis & Drill Down
                </Button>
                <Button 
                  onClick={() => setShowCandidates(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  View Candidate List
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {showCandidates && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save Report
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Drilldown Modal */}
      <DrilldownModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        data={data}
        type={type === 'locations' ? 'location' : type === 'companies' ? 'company' : 'skill'}
        onViewCandidates={handleViewCandidates}
      />
    </>
  );
};
