
import { useState } from "react";
import { Eye, Bookmark, Star, MapPin, Building, Clock, DollarSign, Unlock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  };
  onViewProfile: (candidateId: string) => void;
  onSave: (candidateId: string) => void;
  onShortlist: (candidateId: string) => void;
  unlocksLeft: number;
}

export const CandidateCard = ({ 
  candidate, 
  onViewProfile, 
  onSave, 
  onShortlist, 
  unlocksLeft 
}: CandidateCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(candidate.id);
  };

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
    onShortlist(candidate.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow border border-slate-200">
      <CardContent className="p-4">
        {/* Header - Masked */}
        <div className="mb-3">
          <h3 className="font-medium text-slate-800 text-sm">
            {candidate.designation} at {candidate.tier === 'Unicorn' ? 'Unicorn' : candidate.tier === 'FAANG' ? 'FAANG' : 'Top Tier'} Company
          </h3>
          <p className="text-xs text-slate-500 mt-1">Name hidden until unlocked</p>
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
            onClick={() => onViewProfile(candidate.id)}
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
            disabled={!candidate.isUnlocked && unlocksLeft <= 0}
          >
            {candidate.isUnlocked ? (
              <>
                <Eye className="h-3 w-3 mr-1" />
                View Profile
              </>
            ) : (
              <>
                <Unlock className="h-3 w-3 mr-1" />
                Unlock Profile
              </>
            )}
          </Button>
          <Button 
            onClick={handleSave}
            variant="outline" 
            size="sm"
            className={`${isSaved ? 'bg-blue-50 border-blue-200' : ''}`}
          >
            <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-current text-blue-600' : ''}`} />
          </Button>
          <Button 
            onClick={handleShortlist}
            variant="outline" 
            size="sm"
            className={`${isShortlisted ? 'bg-yellow-50 border-yellow-200' : ''}`}
          >
            <Star className={`h-3 w-3 ${isShortlisted ? 'fill-current text-yellow-600' : ''}`} />
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
};
