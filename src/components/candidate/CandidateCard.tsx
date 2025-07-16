import { useState } from "react";
import { Eye, Bookmark, Star, MapPin, Building, Clock, DollarSign, Unlock, GraduationCap, Calendar, Users, Briefcase, Award } from "lucide-react";

// Mock UI components to simulate the shadcn/ui components
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Button = ({ children, className = "", variant = "default", size = "default", disabled = false, onClick, title }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm"
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-300 bg-white text-gray-700",
    secondary: "bg-gray-100 text-gray-900"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Avatar = ({ children, className = "" }) => (
  <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = "" }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full ${className}`}>
    {children}
  </div>
);

// The actual CandidateCard component
const CandidateCard = ({ 
  candidate, 
  onViewProfile, 
  onSave, 
  onShortlist, 
  unlocksLeft,
  isBookmarked = false,
  compact = false,
  isExpanded = false
}) => {
  const [isSaved, setIsSaved] = useState(isBookmarked);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(candidate.id);
  };

  const getInitials = (name) => {
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
                  {compact ? 'Unlock' : 'Unlock Profile'}
                </>
              )}
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
            Shortlist Candidate
          </Button>
          <Button 
            onClick={() => onViewProfile(candidate.id)}
            variant="outline"
            className="px-4"
            disabled={!candidate.isUnlocked && unlocksLeft <= 0}
          >
            {candidate.isUnlocked ? 'View Profile' : 'Unlock Profile'}
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

// Demo component to show both views
const App = () => {
  const [viewType, setViewType] = useState('compact');

  const dummyCandidates = [
    {
      id: '1',
      name: 'Aarav Mehta',
      designation: 'Senior Product Manager',
      company: 'Razorpay',
      experience: '7.5 years',
      fullTimeYears: '7+ years',
      ctc: '₹48 LPA',
      currentSalary: '₹48 LPA',
      expectedSalary: '₹60 LPA',
      location: 'Bangalore',
      isUnlocked: true,
      whyRelevant: 'Led major product revamps in fintech, built RazorpayX dashboard from scratch, and drove 25% improvement in merchant onboarding.',
      insights: ['Fintech PM', 'Scalable Platforms', 'Team Leadership'],
      tier: 'Funded Startup',
      status: 'Active',
      remoteOk: true,
      lookingToSwitch: true,
      lastSeen: 'Today',
      availabilityStatus: 'Can join in 30 days',
      currentCompanies: ['Razorpay', 'Instamojo'],
      education: {
        institute: 'IIT Bombay',
        degree: 'B.Tech - Mechanical'
      },
      skills: ['Product Strategy', 'APIs', 'JIRA', 'Agile', 'SQL', 'Amplitude'],
      additionalSkillsCount: 3,
      canRelocate: true,
      preferredLocations: ['Hyderabad', 'Pune', 'Delhi'],
      isVerified: true
    },
    {
      id: '2',
      name: 'Riya Sharma',
      designation: 'Backend Engineer',
      company: 'Swiggy',
      experience: '5 years',
      fullTimeYears: '5 years',
      ctc: '₹34 LPA',
      currentSalary: '₹34 LPA',
      expectedSalary: '₹42 LPA',
      location: 'Bangalore',
      isUnlocked: true,
      whyRelevant: 'Built real-time delivery allocation microservices, reduced latency by 30%, and managed backend for 3 city launches.',
      insights: ['High Availability Systems', 'GoLang', 'Scalability'],
      tier: 'Tier 1+ college',
      status: 'Active',
      remoteOk: false,
      lookingToSwitch: false,
      lastSeen: '2 days ago',
      availabilityStatus: '60 days notice',
      currentCompanies: ['Swiggy'],
      education: {
        institute: 'NIT Trichy',
        degree: 'B.Tech Computer Science'
      },
      skills: ['GoLang', 'Redis', 'Kafka', 'Kubernetes', 'MongoDB'],
      additionalSkillsCount: 4,
      canRelocate: false,
      isVerified: false
    },
    {
      id: '3',
      name: 'Yashdeep Singh',
      designation: 'Growth Marketing Lead',
      company: 'CRED',
      experience: '6 years',
      fullTimeYears: '6+ years',
      ctc: '₹52 LPA',
      currentSalary: '₹52 LPA',
      expectedSalary: '₹65 LPA',
      location: 'Remote',
      isUnlocked: true,
      whyRelevant: 'Scaled CRED’s referral engine to 10M+ users, and led GTM for CRED Travel. Ex-Media.net.',
      insights: ['Performance Marketing', 'GTM Expert', 'Referral Growth'],
      tier: 'Funded Startup',
      status: 'Passive',
      remoteOk: true,
      lookingToSwitch: true,
      lastSeen: '4 days ago',
      availabilityStatus: 'Can join immediately',
      currentCompanies: ['CRED', 'Media.net'],
      education: {
        institute: 'BITS Pilani',
        degree: 'M.Sc Economics + B.E. CS'
      },
      skills: ['Google Ads', 'Mixpanel', 'MoEngage', 'CRM', 'SQL', 'Budgeting'],
      additionalSkillsCount: 6,
      canRelocate: true,
      preferredLocations: ['Remote only'],
      isVerified: true
    },
    {
      id: '4',
      name: 'Sneha Kulkarni',
      designation: 'Data Scientist',
      company: 'Rivigo',
      experience: '4.2 years',
      fullTimeYears: '4+ years',
      ctc: '₹28 LPA',
      currentSalary: '₹28 LPA',
      expectedSalary: '₹35 LPA',
      location: 'Noida',
      isUnlocked: false,
      whyRelevant: 'Worked on optimization models to reduce logistics cost by 18%. Solid experience in ML, XGBoost, and demand forecasting.',
      insights: ['ML Ops', 'XGBoost Expert', 'Logistics Forecasting'],
      tier: 'Tier 1+ college',
      status: 'Active',
      remoteOk: false,
      lookingToSwitch: true,
      lastSeen: 'Jul 11, 2025',
      availabilityStatus: 'Can join in 15 days',
      currentCompanies: ['Rivigo'],
      education: {
        institute: 'IIT Dhanbad',
        degree: 'B.Tech - Mining Engineering'
      },
      skills: ['Python', 'XGBoost', 'NumPy', 'Scikit-learn', 'Pandas'],
      additionalSkillsCount: 2,
      canRelocate: true,
      preferredLocations: ['Gurgaon', 'Bangalore', 'Hyderabad'],
      isVerified: false
    }
  ];

  const handleViewProfile = (id) => alert(`View profile clicked for candidate ${id}`);
  const handleSave = (id) => alert(`Save clicked for candidate ${id}`);
  const handleShortlist = (id) => alert(`Shortlist clicked for candidate ${id}`);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CandidateCard Component</h1>
        <p className="text-gray-600 mb-6">Recruitment UI — Enhanced with enriched dummy data & insights</p>

        {/* View Toggle */}
        <div className="mb-6 flex gap-3">
          <Button 
            onClick={() => setViewType('compact')}
            variant={viewType === 'compact' ? 'default' : 'outline'}
            size="sm"
          >
            Compact View
          </Button>
          <Button 
            onClick={() => setViewType('expanded')}
            variant={viewType === 'expanded' ? 'default' : 'outline'}
            size="sm"
          >
            Expanded View
          </Button>
        </div>

        {/* Render Candidate Cards */}
        <div className="space-y-6">
          {dummyCandidates.map(candidate => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onViewProfile={handleViewProfile}
              onSave={handleSave}
              onShortlist={handleShortlist}
              unlocksLeft={3}
              isExpanded={viewType === 'expanded'}
              compact={viewType === 'compact'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
