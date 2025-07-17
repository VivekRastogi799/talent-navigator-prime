import { useState } from "react";
import { Eye, Bookmark, Star, MapPin, Building, Clock, DollarSign, Unlock, GraduationCap, Calendar, Users, Briefcase, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CandidateCardProps {
  candidate: {
    id: string;
    designation: string;
    company: string;
    experience: string;
    ctc: string;
    location: string;
    isUnlocked: boolean;
    whyRelevant: string;
    insights: string[];
    tier: string;
    status: 'Active' | 'Passive';
    remoteOk: boolean;
    lookingToSwitch: boolean;
    
    // New optional fields based on reference (backwards compatible)
    name?: string; // Available when unlocked
    lastSeen?: string;
    fullTimeYears?: string;
    availabilityStatus?: string; // "Can join in 30 days", "Can join immediately", etc.
    currentSalary?: string;
    expectedSalary?: string;
    currentCompanies?: string[];
    education?: {
      institute: string;
      degree?: string;
    };
    skills?: string[];
    additionalSkillsCount?: number;
    previousCompanies?: string[];
    canRelocate?: boolean;
    preferredLocations?: string[];
    profileStrength?: 'Strong' | 'Good' | 'Average';
    isVerified?: boolean;
  };
  onViewProfile: (candidateId: string) => void;
  onSave: (candidateId: string) => void;
  onShortlist: (candidateId: string) => void;
  unlocksLeft: number;
  isBookmarked?: boolean;
  compact?: boolean;
  isExpanded?: boolean; // New prop to indicate if this is in expanded view
}

export const CandidateCard = ({ 
  candidate, 
  onViewProfile, 
  onSave, 
  onShortlist, 
  unlocksLeft,
  isBookmarked = false,
  compact = false,
  isExpanded = false
}: CandidateCardProps) => {
  const [isSaved, setIsSaved] = useState(isBookmarked);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(candidate.id);
  };

  const getInitials = (name?: string) => {
    if (!name) return candidate.designation.charAt(0).toUpperCase();
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  // If this is not expanded view or compact is true, show compact version
  if (!isExpanded || compact) {
    return (
      <Card className="hover:shadow-md transition-shadow border border-slate-200">
        <CardContent className="p-4">
          {/* Header - Masked */}
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-800 text-sm">
                {candidate.designation}
              </h3>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {candidate.tier === 'Unicorn' ? '🦄' : candidate.tier === 'FAANG' ? '🏢' : '⭐'} {candidate.tier}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Unlock className="h-3 w-3" />
              Profile details locked - unlock to view
            </p>
          </div>

          {/* CTC & Experience */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm">
              <DollarSign className="h-3 w-3 text-green-600" />
              <span className="font-medium text-slate-800">{candidate.ctc}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3 text-blue-600" />
              <span className="text-slate-600">{candidate.experience}</span>
            </div>
          </div>

          {/* Why Relevant */}
          <div className="mb-3">
            <p className="text-xs text-slate-600 leading-relaxed">{candidate.whyRelevant}</p>
          </div>

          {/* Insight Chips */}
          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              {candidate.tier}
            </Badge>
            <Badge 
              variant={candidate.status === 'Active' ? 'default' : 'secondary'} 
              className="text-xs px-2 py-0.5"
            >
              {candidate.status}
            </Badge>
            {candidate.remoteOk && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 text-blue-600">
                Remote-OK
              </Badge>
            )}
            {candidate.lookingToSwitch && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 text-orange-600">
                Looking to switch
              </Badge>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mb-4">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span className="text-xs text-slate-600">{candidate.location}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                // Navigate to external product for deep dive
                window.open(`https://candidate-portal.naukrix.com/profile/${candidate.id}`, '_blank');
              }}
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              View Full Profile
            </Button>
            <Button 
              onClick={() => onShortlist(candidate.id)}
              variant="outline" 
              size="sm"
              className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
            >
              <Star className="h-3 w-3" />
            </Button>
            <Button 
              onClick={handleSave}
              variant="outline" 
              size="sm"
              className={`${isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
              title={isSaved ? 'Remove bookmark' : 'Bookmark candidate'}
            >
              <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-current text-blue-600' : ''}`} />
            </Button>
          </div>

          {/* Unlock Status */}
          {!candidate.isUnlocked && (
            <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
              <Unlock className="h-3 w-3" />
              {unlocksLeft > 0 ? (
                <span>🔒 Profile Locked — {unlocksLeft} Unlocks Left</span>
              ) : (
                <span>🔒 No unlocks remaining</span>
              )}
            </div>
          )}

          {candidate.isUnlocked && (
            <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
              <span>✅ Unlocked on {new Date().toLocaleDateString()}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Expanded view with detailed information
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-slate-200 bg-white">
      <CardContent className="p-6">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-slate-200">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
              {getInitials(candidate.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {candidate.isUnlocked ? candidate.name : 'Name unlocked'}
                  </h3>
                  {candidate.isVerified && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building className="h-4 w-4" />
                  <span>{candidate.designation}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Last seen {candidate.lastSeen || 'recently'}</div>
                <Button 
                  onClick={handleSave}
                  variant="ghost" 
                  size="sm"
                  className={`${isSaved ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs px-2 py-1">
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                {candidate.tier}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1">
                <Users className="h-3 w-3 mr-1 text-blue-500" />
                {candidate.tier === 'Unicorn' ? 'Funded startups' : 'Tier 1+ college'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Relevance Section */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Relevance to your search</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{candidate.whyRelevant}</p>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Experience & Availability */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="font-medium">{candidate.fullTimeYears || candidate.experience} fulltime</span>
              <span className="text-slate-600">({candidate.availabilityStatus || 'Available'})</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600">{candidate.location}</span>
              {candidate.canRelocate && candidate.preferredLocations && (
                <span className="text-xs text-blue-600">
                  (Can move to {candidate.preferredLocations.slice(0, 3).join(', ')})
                </span>
              )}
            </div>
          </div>

          {/* Salary Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium text-slate-800">{candidate.currentSalary || candidate.ctc} current</span>
              {candidate.expectedSalary && (
                <span className="text-slate-600">({candidate.expectedSalary} minimum expected)</span>
              )}
            </div>
          </div>
        </div>

        {/* Current Companies */}
        {candidate.currentCompanies && candidate.currentCompanies.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Current Companies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.currentCompanies.map((company, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {company}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {candidate.education && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Education</span>
            </div>
            <div className="text-sm text-slate-600">
              {candidate.education.degree && `${candidate.education.degree} from `}
              {candidate.education.institute}
            </div>
          </div>
        )}

        {/* Skills */}
        {candidate.skills && candidate.skills.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.slice(0, 6).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                  {skill}
                </Badge>
              ))}
              {candidate.additionalSkillsCount && candidate.additionalSkillsCount > 0 && (
                <Badge variant="outline" className="text-xs px-2 py-1 text-blue-600">
                  {candidate.additionalSkillsCount} More
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={() => onShortlist(candidate.id)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Star className="h-4 w-4 mr-2" />
            Shortlist Candidate
          </Button>
          <Button 
            onClick={() => {
              // Navigate to external product for deep dive
              window.open(`https://candidate-portal.naukrix.com/profile/${candidate.id}`, '_blank');
            }}
            variant="outline"
            className="px-4"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Full Profile
          </Button>
        </div>

        {/* Unlock Status for Expanded View */}
        {!candidate.isUnlocked && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <Unlock className="h-4 w-4" />
              <span className="font-medium">Profile not yet unlocked</span>
              <span className="text-amber-600">
                {unlocksLeft > 0 ? `${unlocksLeft} unlocks remaining` : 'No unlocks remaining'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
