
import { useState } from "react";
import { ArrowLeft, MapPin, Building, Calendar, DollarSign, Star, Phone, Mail, Download, Share2, MessageCircle, GraduationCap, Briefcase, Target, Award, TrendingUp, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CandidateProfileProps {
  candidateId: string;
  onBack: () => void;
}

export const CandidateProfile = ({ candidateId, onBack }: CandidateProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock candidate data - in real app this would come from API
  const candidate = {
    id: candidateId,
    name: "Rahul Sharma",
    designation: "Senior Product Manager",
    company: "Google",
    location: "Bangalore, India",
    experience: "6 years",
    currentCtc: "₹28 LPA",
    expectedCtc: "₹35-40 LPA",
    noticePeriod: "2 months",
    lastActive: "2 hours ago",
    matchScore: 92,
    tier: "FAANG",
    status: "Active",
    phone: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    education: "MBA from ISB Hyderabad",
    skills: ["Product Strategy", "SQL", "A/B Testing", "Market Research", "Leadership", "Data Analytics", "User Research", "Agile", "Growth Hacking"],
    careerTimeline: [
      {
        period: "2022-Present",
        role: "Senior Product Manager",
        company: "Google",
        type: "work" as const,
        description: "Leading product initiatives for Google Pay, managing a team of 8 PMs and driving user acquisition strategies"
      },
      {
        period: "2020-2022",
        role: "Product Manager",
        company: "Flipkart",
        type: "work" as const,
        description: "Launched 3 major features that increased user engagement by 40%, managed cross-functional teams of 15+ members"
      },
      {
        period: "2018-2020",
        role: "MBA",
        company: "ISB Hyderabad",
        type: "education" as const,
        description: "Specialized in Strategy and Entrepreneurship, CGPA: 3.8/4.0"
      },
      {
        period: "2016-2018",
        role: "Associate Product Manager",
        company: "Zomato", 
        type: "work" as const,
        description: "Worked on restaurant discovery features, A/B tested 20+ product experiments"
      }
    ],
    achievements: [
      "Led product launch that acquired 2M+ users in first quarter",
      "Winner of Google's Innovation Award 2023",
      "Featured speaker at ProductCon India 2023",
      "Published 5 articles on product management best practices"
    ],
    whyRelevant: "Strong background in B2C product management with proven track record of scaling products from 0-1. Experience at both startup and big tech environments makes him perfect for growth-stage companies."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-slate-600 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Candidates
              </Button>
              <div className="text-2xl font-bold gradient-text">TopTier</div>
              <span className="text-slate-400">•</span>
              <h1 className="text-xl font-bold text-slate-800">Candidate Profile</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Candidate
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Header Card */}
        <Card className="glass-card premium-shadow border-slate-200">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-slate-800">{candidate.name}</h1>
                      <Badge variant={candidate.tier === 'FAANG' ? 'default' : 'secondary'} className="text-sm">
                        {candidate.tier}
                      </Badge>
                      <Badge variant={candidate.status === 'Active' ? 'default' : 'secondary'} className="text-sm">
                        {candidate.status}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">{candidate.designation}</h2>
                    <div className="flex items-center gap-6 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{candidate.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{candidate.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-3xl font-bold text-primary">{candidate.matchScore}%</div>
                      <Badge variant="outline" className="border-primary text-primary">
                        Match Score
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-500">Last active: {candidate.lastActive}</div>
                  </div>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-4 gap-6 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Current CTC</div>
                    <div className="font-semibold text-slate-800">{candidate.currentCtc}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Expected CTC</div>
                    <div className="font-semibold text-slate-800">{candidate.expectedCtc}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Notice Period</div>
                    <div className="font-semibold text-slate-800">{candidate.noticePeriod}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Education</div>
                    <div className="font-semibold text-slate-800">{candidate.education}</div>
                  </div>
                </div>

                {/* Why Relevant */}
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Why This Candidate is Relevant
                  </h3>
                  <p className="text-slate-700">{candidate.whyRelevant}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Card className="glass-card premium-shadow border-slate-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-50 p-1 rounded-lg m-6 mb-0">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Skills & Achievements
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Contact & Actions
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Career Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {candidate.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{achievement}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Quick Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Experience</span>
                        <span className="font-semibold">{candidate.experience}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Companies Worked</span>
                        <span className="font-semibold">4</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Role Changes</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Avg Tenure</span>
                        <span className="font-semibold">2 years</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800">Career Timeline</h3>
                  <div className="space-y-4">
                    {candidate.careerTimeline.map((item, index) => (
                      <Card key={index} className="border-slate-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'work' ? 'bg-primary/10' : 'bg-green-100'}`}>
                              {item.type === 'work' ? 
                                <Briefcase className="h-5 w-5 text-primary" /> : 
                                <GraduationCap className="h-5 w-5 text-green-600" />
                              }
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold text-slate-800">{item.role}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {item.period}
                                </Badge>
                              </div>
                              <p className="text-slate-600 font-medium mb-2">{item.company}</p>
                              <p className="text-slate-700 text-sm">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-50 border-slate-300 text-slate-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Achievements</h3>
                  <div className="space-y-2">
                    {candidate.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span>{candidate.phone}</span>
                        <Button variant="outline" size="sm">
                          Call
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span>{candidate.email}</span>
                        <Button variant="outline" size="sm">
                          Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Star className="h-4 w-4 mr-2" />
                        Add to Shortlist
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Resume
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
