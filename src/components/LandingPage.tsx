
import { useState } from "react";
import { Search, Upload, Sparkles, Users, Target, TrendingUp, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LandingPageProps {
  onSearch: (query: string, type: 'jd' | 'skill') => void;
}

export const LandingPage = ({ onSearch }: LandingPageProps) => {
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
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
              NaukriX
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Discover Top-Tier Talent in Seconds
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              An AI-powered talent intelligence platform built exclusively for hiring premium candidates.
            </p>
          </div>

          {/* Search Tabs */}
          <Tabs defaultValue="jd" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="jd" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Search by Job Description
              </TabsTrigger>
              <TabsTrigger value="skill" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Search by Skills/Role
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jd" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Paste Your Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste the full JD here - we’ll instantly map ideal candidate traits and surface top premium talent."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleJDSearch}
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                      disabled={!jdText.trim()}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze JD & Find Talent
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload JD
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skill" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-green-600" />
                    Search by Skills & Designation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="e.g., Senior Product Manager with SQL, Python, Data Analytics"
                      value={skillQuery}
                      onChange={(e) => setSkillQuery(e.target.value)}
                      className="pl-10"
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
                            className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
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
                            className="cursor-pointer hover:bg-green-50 hover:border-green-300"
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
                    className="bg-green-600 hover:bg-green-700 px-8"
                    disabled={!skillQuery.trim()}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Matching Talent
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Why Choose NaukriX?
          </h2>
          <p className="text-lg text-slate-600">
            Get deeper context into top-tier hiring decisions with insight-rich market intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg border-0">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Premium Talent Pool</h3>
              <p className="text-slate-600">
                Access to 10lakh+ premium candidates from top companies with verified profiles and real-time availability.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Market Intelligence</h3>
              <p className="text-slate-600">
                Deep insights into salary trends, skill demands, and talent flow patterns across industries.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
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
