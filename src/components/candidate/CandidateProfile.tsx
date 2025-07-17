
import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Building, Calendar, Award, Star, Download, MessageSquare, Share, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CandidateProfileProps {
  candidateId: string;
  onBack: () => void;
}

export const CandidateProfile = ({ candidateId, onBack }: CandidateProfileProps) => {
  // Mock candidate data based on the reference
  const candidate = {
    id: candidateId,
    name: "Rajesh Kumar",
    designation: "Chief Technology Officer",
    company: "TechCorp Global",
    location: "Bangalore / San Francisco",
    experience: "18 years",
    teamSize: "200+ engineers",
    budget: "$50M+ annually",
    ctc: "₹1.2Cr + Equity",
    expectedSalary: "₹2.5Cr + Equity",
    noticePeriod: "3 months",
    lastActive: "1 day ago",
    profileQuality: 98,
    matchPercentage: 96,
    verified: {
      phone: true,
      email: true,
      background: true,
      aiEnhanced: true
    },
    skills: {
      core: [
        { name: "Leadership", score: 95 },
        { name: "Executive Leadership", score: 92 },
        { name: "Strategic Planning", score: 88 },
        { name: "Business", score: 85 },
        { name: "Digital Transformation", score: 90 },
        { name: "Product Strategy", score: 87 },
        { name: "P&L Management", score: 83 }
      ],
      technical: [
        { name: "AI/ML Strategy", score: 90 },
        { name: "Cloud Architecture", score: 88 }
      ]
    },
    summary: "Transformational technology executive with 18+ years leading Fortune 100 engineering organizations. Proven track record of scaling teams from 50 to 500+ engineers, delivering $100M+ revenue impact through platform innovations. Patent holder and recognized thought leader in AI/ML and distributed systems architecture.",
    experience_details: [
      {
        role: "Chief Technology Officer",
        company: "TechCorp Global",
        period: "2022 - Present",
        description: "Leading global technology strategy for $2B revenue SaaS platform serving 10M+ users. Managing 200+ engineers across 4 countries with $50M annual budget."
      }
    ],
    achievements: [
      "Scaled engineering from 120 to 200+ across 4 global offices",
      "Led AI transformation resulting in 40% revenue growth",
      "Reduced infrastructure costs by $15M through cloud optimization"
    ],
    businessImpact: [
      "Company Value: $5B",
      "$400M annual recurring revenue"
    ],
    contactDetails: {
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      linkedin: "linkedin.com/in/rajeshkumar"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-slate-600 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            <div className="text-2xl font-bold gradient-text">TopTier</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Recommend
            </Button>
            <Button variant="default" className="bg-primary">
              <MessageSquare className="h-4 w-4 mr-2" />
              Schedule Executive Interview
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-slate-900">{candidate.name}</h1>
                      <Badge variant="default" className="bg-blue-100 text-blue-700">
                        Verified
                      </Badge>
                    </div>
                    <p className="text-lg font-semibold text-slate-700 mb-2">{candidate.designation}</p>
                    <p className="text-slate-600 mb-4">{candidate.company} • {candidate.location}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span>{candidate.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-slate-500" />
                        <span>{candidate.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-slate-500" />
                        <span>{candidate.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-slate-500" />
                        <span>Active {candidate.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      {candidate.verified.phone && <Badge variant="outline" className="text-green-600 border-green-600">Phone Verified</Badge>}
                      {candidate.verified.email && <Badge variant="outline" className="text-green-600 border-green-600">Email Verified</Badge>}
                      {candidate.verified.background && <Badge variant="outline" className="text-green-600 border-green-600">Background Verified</Badge>}
                      <Badge variant="outline" className="text-blue-600 border-blue-600">{candidate.matchPercentage}% Match</Badge>
                      {candidate.verified.aiEnhanced && <Badge variant="outline" className="text-purple-600 border-purple-600">AI Enhanced</Badge>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Executive Skills Portfolio */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Executive Skills Portfolio
                  <Badge variant="outline" className="text-blue-600 border-blue-600">Enriched with AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Core Competencies</h4>
                    <div className="space-y-3">
                      {candidate.skills.core.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                            <span className="text-sm text-slate-500">{skill.score}%</span>
                          </div>
                          <Progress value={skill.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Technical</h4>
                    <div className="space-y-3">
                      {candidate.skills.technical.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                            <span className="text-sm text-slate-500">{skill.score}%</span>
                          </div>
                          <Progress value={skill.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{candidate.summary}</p>
              </CardContent>
            </Card>

            {/* Executive Experience */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Executive Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {candidate.experience_details.map((exp, index) => (
                  <div key={index} className="border-l-4 border-primary pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg text-slate-900">{exp.role}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-slate-600 mb-3">{exp.period}</p>
                      <p className="text-slate-700">{exp.description}</p>
                      
                      <div className="mt-4">
                        <h5 className="font-semibold text-slate-900 mb-2">Key Achievements</h5>
                        <ul className="space-y-1">
                          {candidate.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-semibold text-slate-900 mb-2">Business Impact</h5>
                        <div className="flex gap-4">
                          {candidate.businessImpact.map((impact, i) => (
                            <div key={i} className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-700">
                              {impact}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Executive Profile Quality */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-600">Executive Profile Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{candidate.profileQuality}%</div>
                  <p className="text-sm text-slate-600 mb-4">Premium Executive</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Executive documentation complete</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Background verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>AI-enriched with 3 sources</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>8 patents filed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Executive Metrics */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-600">Executive Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">200+</div>
                    <div className="text-xs text-blue-600">Team Size</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">$50M+</div>
                    <div className="text-xs text-green-600">Budget</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">8</div>
                    <div className="text-xs text-yellow-600">Patents</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">2</div>
                    <div className="text-xs text-purple-600">Board Roles</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-600">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700">{candidate.contactDetails.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700">{candidate.contactDetails.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700">{candidate.contactDetails.linkedin}</span>
                </div>
              </CardContent>
            </Card>

            {/* Compensation */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-600">Compensation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Current</p>
                  <p className="font-semibold text-slate-900">{candidate.ctc}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Expected</p>
                  <p className="font-semibold text-slate-900">{candidate.expectedSalary}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Notice Period</p>
                  <p className="font-semibold text-slate-900">{candidate.noticePeriod}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
