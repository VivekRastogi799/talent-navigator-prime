
import { useState } from "react";
import { Upload, Sparkles, Users, Target, TrendingUp, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LandingPageProps {
  onSearch: (query: string, type: 'jd' | 'skill') => void;
  onViewCandidateHub: () => void;
}

export const LandingPage = ({ onSearch, onViewCandidateHub }: LandingPageProps) => {
  const [jdText, setJdText] = useState("");
  const [skillQuery, setSkillQuery] = useState("");

  const popularSkills = [
    "Product Management", "SQL", "Python", "Data Analytics", "A/B Testing",
    "User Research", "Agile", "Figma", "Product Strategy", "Machine Learning"
  ];

  const popularRoles = [
    "Senior Product Manager", "Product Manager", "Associate Product Manager",
    "VP Product", "Head of Product", "Principal Product Manager"
  ];

  const handleJDSearch = () => {
    if (jdText.trim()) {
      onSearch(jdText, 'jd');
    }
  };

  const handleSkillSearch = () => {
    if (skillQuery.trim()) {
      onSearch(skillQuery, 'skill');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-800 bg-clip-text text-transparent mb-3">
              Xtract
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Discover Top-Tier Talent in Seconds
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
              An AI-powered talent intelligence platform built exclusively for hiring premium candidates.
            </p>
            
            {/* Quick Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={onViewCandidateHub}
                variant="outline"
                className="bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
              >
                <Users className="h-4 w-4 mr-2" />
                Browse Candidates
              </Button>
            </div>
          </div>

          {/* Search Tabs */}
          <div id="search-section">
            <Tabs defaultValue="skill" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="skill" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Search by Skills/Role
              </TabsTrigger>
              <TabsTrigger value="jd" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Search by Job Description
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload JD
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skill" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-indigo-600" />
                    Search by Skills & Designation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="e.g., Senior Product Manager with SQL, Python, Data Analytics"
                      value={skillQuery}
                      onChange={(e) => setSkillQuery(e.target.value)}
                      className="pl-4 border-indigo-200 focus:border-indigo-400"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Popular Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {popularSkills.map((skill) => (
                          <Badge 
                            key={skill}
                            variant="outline" 
                            className="cursor-pointer hover:bg-indigo-50 hover:border-indigo-300"
                            onClick={() => setSkillQuery(prev => prev ? `${prev}, ${skill}` : skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Popular Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {popularRoles.map((role) => (
                          <Badge 
                            key={role}
                            variant="outline" 
                            className="cursor-pointer hover:bg-indigo-50 hover:border-indigo-300"
                            onClick={() => setSkillQuery(role)}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSkillSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 w-full md:w-auto"
                    disabled={!skillQuery.trim()}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Find Matching Talent
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jd" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    Paste Your Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste the full JD here - we'll instantly map ideal candidate traits and surface top premium talent."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    className="min-h-32 resize-none border-indigo-200 focus:border-indigo-400"
                  />
                  <Button 
                    onClick={handleJDSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 w-full md:w-auto"
                    disabled={!jdText.trim()}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze JD & Find Talent
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Upload className="h-5 w-5 text-indigo-600" />
                    Upload Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center bg-slate-50">
                    <Upload className="h-10 w-10 text-indigo-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">Upload your JD document in PDF, DOC, or DOCX format</p>
                    <input type="file" className="hidden" id="jd-upload" accept=".pdf,.doc,.docx" />
                    <Button 
                      onClick={() => document.getElementById('jd-upload')?.click()}
                      variant="outline" 
                      className="border-indigo-300 hover:border-indigo-500"
                    >
                      Select File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Why Choose Xtract?
          </h2>
          <p className="text-lg text-slate-600">
            Get deeper context into top-tier hiring decisions with insight-rich market intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Premium Talent Pool</h3>
              <p className="text-slate-600">
                Access to 10lakh+ premium candidates from top companies with verified profiles and real-time availability.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Market Intelligence</h3>
              <p className="text-slate-600">
                Deep insights into salary trends, skill demands, and talent flow patterns across industries.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">AI-Powered Matching</h3>
              <p className="text-slate-600">
                Smart algorithms analyze job requirements and match with the most relevant candidates instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
