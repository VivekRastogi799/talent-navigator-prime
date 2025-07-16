
import { X, Download, Share, Tag, Building, MapPin, Calendar, Mail, Phone, GraduationCap, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CandidateDeepDiveProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    id: string;
    name: string;
    designation: string;
    company: string;
    email: string;
    phone: string;
    experience: string;
    ctc: string;
    location: string;
    whyRelevant: string;
    detailedWhyRelevant: string;
    insights: string[];
    careerTimeline: Array<{
      period: string;
      role: string;
      company: string;
      type: 'education' | 'work';
    }>;
    lastActive: string;
    profileUpdated: string;
    skills: string[];
  };
  onSave: () => void;
  onShare: () => void;
  onTag: () => void;
  onExportResume: () => void;
}

export const CandidateDeepDive = ({ 
  isOpen, 
  onClose, 
  candidate,
  onSave,
  onShare,
  onTag,
  onExportResume
}: CandidateDeepDiveProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold">{candidate.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Unlocked Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-slate-600" />
                  <span className="text-sm">{candidate.designation} at {candidate.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-600" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Why Relevant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why This Candidate Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 leading-relaxed">{candidate.detailedWhyRelevant}</p>
            </CardContent>
          </Card>

          {/* Career Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Career Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.careerTimeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      {item.type === 'education' ? (
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Building className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">{item.role}</div>
                      <div className="text-sm text-slate-600">{item.company}</div>
                      <div className="text-xs text-slate-500">{item.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insight Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.insights.map((insight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {insight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-slate-600" />
                <span>Last active: {candidate.lastActive}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-slate-600" />
                <span>Profile updated: {candidate.profileUpdated}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onSave} className="flex-1">
              Save Candidate
            </Button>
            <Button onClick={onShare} variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={onTag} variant="outline">
              <Tag className="h-4 w-4 mr-2" />
              Tag
            </Button>
            <Button onClick={onExportResume} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
