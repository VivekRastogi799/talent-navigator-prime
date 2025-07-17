import { useState } from "react";
import { X, Star, MapPin, Calendar, DollarSign, Building, Briefcase, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ComparisonCandidate {
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
  careerTimeline: Array<{
    period: string;
    role: string;
    company: string;
    type: 'education' | 'work';
  }>;
}

interface CandidateComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: ComparisonCandidate[];
  onViewProfile: (candidateId: string) => void;
  onShortlist: (candidateId: string) => void;
}

export const CandidateComparison = ({ 
  isOpen, 
  onClose, 
  candidates, 
  onViewProfile, 
  onShortlist 
}: CandidateComparisonProps) => {
  if (!isOpen) return null;

  const maxCandidates = Math.min(candidates.length, 3); // Compare max 3 candidates

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Candidate Comparison</h2>
                  <Badge variant="outline">{candidates.length} candidates</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="p-6">
              <div className={`grid grid-cols-${maxCandidates} gap-6`}>
                {candidates.slice(0, maxCandidates).map((candidate, index) => (
                  <div key={candidate.id} className="space-y-4">
                    {/* Candidate Header */}
                    <Card className="p-4 bg-slate-50 border-slate-200">
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold text-slate-800">{candidate.name}</h3>
                        <p className="text-sm text-slate-600">{candidate.designation}</p>
                        <div className="flex items-center justify-center gap-2">
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {candidate.matchScore}% match
                          </Badge>
                          <Badge variant={candidate.status === "Active" ? "default" : "secondary"}>
                            {candidate.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>

                    {/* Comparison Details */}
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-slate-700 text-sm">Basic Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-slate-500" />
                            <span>{candidate.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-slate-500" />
                            <span>{candidate.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-slate-500" />
                            <span>{candidate.ctc}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span>{candidate.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span>{candidate.noticePeriod}</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Why Relevant */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-700 text-sm">Why Relevant</h4>
                        <p className="text-sm text-slate-600">{candidate.whyRelevant}</p>
                      </div>

                      <Separator />

                      {/* Skills */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-700 text-sm">Key Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 4).map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Career Timeline */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-700 text-sm">Career Timeline</h4>
                        <div className="space-y-1">
                          {candidate.careerTimeline.slice(0, 3).map((item, i) => (
                            <div key={i} className="text-xs text-slate-600">
                              <span className="font-medium">{item.period}</span> - {item.role} at {item.company}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          onClick={() => onViewProfile(candidate.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          View Full Profile
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onShortlist(candidate.id)}
                          className="w-full border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Shortlist
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {candidates.length > 3 && (
                <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center">
                  <p className="text-sm text-slate-600">
                    Showing comparison for first 3 candidates. 
                    <span className="font-medium"> {candidates.length - 3} more candidates</span> in your selection.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};