
import { useState } from "react";
import { X, Filter, SortAsc, BarChart3, Expand, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DrilldownModal } from "./DrilldownModal";
import { CandidateCard } from "./candidate/CandidateCard";
import { CandidateDeepDive } from "./candidate/CandidateDeepDive";
import { ExpandedCandidateView } from "./candidate/ExpandedCandidateView";

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
  isUnlocked: boolean;
  whyRelevant: string;
  detailedWhyRelevant: string;
  insights: string[];
  tier: string;
  remoteOk: boolean;
  lookingToSwitch: boolean;
  email: string;
  phone: string;
  careerTimeline: Array<{
    period: string;
    role: string;
    company: string;
    type: 'education' | 'work';
  }>;
  lastActive: string;
  profileUpdated: string;
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
    skills: ["Product Strategy", "SQL", "A/B Testing", "Market Research", "Leadership"],
    lastUpdated: "2 days ago",
    status: "Active",
    isUnlocked: false,
    whyRelevant: "Ex-Flipkart • ISB • 0-1 Scaling experience",
    detailedWhyRelevant: "Strong product management background with proven 0-1 scaling experience at Flipkart. MBA from ISB with deep understanding of Indian market dynamics. Led 3 successful product launches with 10M+ users.",
    insights: ["Leadership", "Tier 1", "High Salary", "Startup Friendly", "Product Innovation"],
    tier: "FAANG",
    remoteOk: true,
    lookingToSwitch: true,
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    careerTimeline: [
      { period: "2018-2020", role: "MBA", company: "ISB Hyderabad", type: 'education' },
      { period: "2020-2022", role: "Product Manager", company: "Flipkart", type: 'work' },
      { period: "2022-Present", role: "Senior Product Manager", company: "Google", type: 'work' }
    ],
    lastActive: "2 hours ago",
    profileUpdated: "1 week ago"
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
    skills: ["Data Analytics", "User Research", "Agile", "Product Design", "Growth"],
    lastUpdated: "1 week ago",
    status: "Passive",
    isUnlocked: true,
    whyRelevant: "Data-driven PM • Growth specialist • Remote work advocate",
    detailedWhyRelevant: "Exceptional data analytics skills with proven growth hacking experience. Led user acquisition initiatives that resulted in 200% user growth. Strong advocate for remote work culture.",
    insights: ["Data Expert", "Growth Hacker", "Remote First", "Analytics Pro"],
    tier: "FAANG",
    remoteOk: true,
    lookingToSwitch: false,
    email: "priya.patel@email.com",
    phone: "+91 87654 32109",
    careerTimeline: [
      { period: "2017-2021", role: "B.Tech", company: "IIT Delhi", type: 'education' },
      { period: "2021-2023", role: "Associate Product Manager", company: "Zomato", type: 'work' },
      { period: "2023-Present", role: "Product Manager", company: "Microsoft", type: 'work' }
    ],
    lastActive: "5 hours ago",
    profileUpdated: "3 days ago"
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
    skills: ["Python", "Product Analytics", "Figma", "User Testing", "Agile"],
    lastUpdated: "3 days ago",
    status: "Active",
    isUnlocked: false,
    whyRelevant: "Technical PM • Immediate joiner • Mumbai based",
    detailedWhyRelevant: "Unique combination of technical and product skills. Strong in Python and analytics, making him ideal for technical product roles. Available for immediate joining.",
    insights: ["Technical Expert", "Immediate Joiner", "Cost Effective", "High Potential"],
    tier: "FAANG",
    remoteOk: false,
    lookingToSwitch: true,
    email: "amit.kumar@email.com",
    phone: "+91 76543 21098",
    careerTimeline: [
      { period: "2018-2022", role: "B.Tech", company: "NIT Trichy", type: 'education' },
      { period: "2022-2023", role: "Product Analyst", company: "Paytm", type: 'work' },
      { period: "2023-Present", role: "Associate Product Manager", company: "Amazon", type: 'work' }
    ],
    lastActive: "1 day ago",
    profileUpdated: "2 days ago"
  }
];

export const DrilldownPanel = ({ isOpen, onClose, title, data, type }: DrilldownPanelProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showCandidates, setShowCandidates] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [expandedViewOpen, setExpandedViewOpen] = useState(false);
  const [unlocksLeft, setUnlocksLeft] = useState(5);

  const handleDrilldownClick = () => {
    setModalOpen(true);
  };

  const handleViewCandidates = () => {
    setShowCandidates(true);
    setModalOpen(false);
  };

  const handleViewProfile = (candidateId: string) => {
    const candidate = mockCandidates.find(c => c.id === candidateId);
    if (candidate) {
      if (!candidate.isUnlocked && unlocksLeft > 0) {
        // Unlock the candidate
        candidate.isUnlocked = true;
        setUnlocksLeft(prev => prev - 1);
      }
      if (candidate.isUnlocked) {
        setSelectedCandidate(candidate);
        setDeepDiveOpen(true);
      }
    }
  };

  const handleSave = (candidateId: string) => {
    console.log('Saving candidate:', candidateId);
  };

  const handleShortlist = (candidateId: string) => {
    console.log('Shortlisting candidate:', candidateId);
  };

  const handleExpandView = () => {
    setExpandedViewOpen(true);
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
          
          {/* Primary Action Buttons */}
          <div className="flex gap-2 mb-3">
            <Button 
              onClick={() => setShowCandidates(true)}
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Users className="h-4 w-4 mr-1" />
              View ({mockCandidates.length})
            </Button>
            <Button 
              onClick={handleExpandView}
              variant="outline" 
              size="sm" 
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <Expand className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleDrilldownClick}
              variant="outline" 
              size="sm" 
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search and Sort - only show when viewing candidates */}
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
                    <SelectItem value="relevance">Match %</SelectItem>
                    <SelectItem value="recent">Newest</SelectItem>
                    <SelectItem value="ctc">Highest CTC</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
              
              {/* Unlock Status */}
              <div className="text-xs text-slate-600 bg-blue-50 p-2 rounded">
                💳 {unlocksLeft} profile unlocks remaining
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {showCandidates ? (
            // Enhanced candidate cards
            mockCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onViewProfile={handleViewProfile}
                onSave={handleSave}
                onShortlist={handleShortlist}
                unlocksLeft={unlocksLeft}
              />
            ))
          ) : (
            // Show drilldown options if explicitly requested
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">Analytical Deep Dive</h3>
              <p className="text-slate-600 mb-6">Explore detailed insights and patterns</p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleDrilldownClick}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Launch Deep Analysis
                </Button>
                <Button 
                  onClick={() => setShowCandidates(true)}
                  variant="outline" 
                  className="w-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  Back to Candidate List
                </Button>
              </div>
            </div>
          )}
        </div>
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

      {/* Expanded Candidate View */}
      <ExpandedCandidateView
        isOpen={expandedViewOpen}
        onClose={() => setExpandedViewOpen(false)}
        candidates={mockCandidates}
        title={title}
        searchQuery={searchTerm}
      />

      {/* Deep Dive Modal */}
      {selectedCandidate && (
        <CandidateDeepDive
          isOpen={deepDiveOpen}
          onClose={() => setDeepDiveOpen(false)}
          candidate={selectedCandidate}
          onSave={() => console.log('Save candidate')}
          onShare={() => console.log('Share candidate')}
          onTag={() => console.log('Tag candidate')}
          onExportResume={() => console.log('Export resume')}
        />
      )}
    </>
  );
};
