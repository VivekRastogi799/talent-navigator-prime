
import { useState } from "react";
import { Upload, Sparkles, Users, Target, TrendingUp, FileText, Zap, Search } from "lucide-react";
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const samplePrompts = [
    "Hiring a Backend Engineer with 5+ YOE in Node.js & AWS",
    "Need a Head of Marketing for D2C brand",
    "Looking for a Product Designer from a Tier-1 company",
    "Seeking Senior Data Scientist with ML expertise"
  ];

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Read file content and set it to jdText
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJdText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="text-4xl font-bold text-naukri-primary mb-3">
              TopTier
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Discover Top-Tier Talent in Seconds
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              An AI-powered talent intelligence platform built exclusively for hiring premium candidates.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <Tabs defaultValue="jd" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-50 p-1">
                <TabsTrigger value="jd" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-naukri-primary">
                  <Search className="h-4 w-4" />
                  Search by Job Description
                </TabsTrigger>
                <TabsTrigger value="skill" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-naukri-primary">
                  <Target className="h-4 w-4" />
                  Search by Skills/Designation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jd" className="space-y-6">
                <Card className="shadow-sm border border-slate-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <Textarea
                          placeholder="Describe the role you're hiring for..."
                          value={jdText}
                          onChange={(e) => setJdText(e.target.value)}
                          className="min-h-24 resize-none border-slate-200 focus:border-naukri-primary focus:ring-naukri-primary"
                        />
                        <div className="absolute top-2 right-2">
                          <input
                            type="file"
                            id="jd-upload"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('jd-upload')?.click()}
                            className="border-slate-300 hover:border-naukri-primary"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Upload JD
                          </Button>
                        </div>
                      </div>

                      {uploadedFile && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FileText className="h-4 w-4" />
                          <span>Uploaded: {uploadedFile.name}</span>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <p className="text-sm text-slate-500">
                          💡 You can write a line or upload the JD directly — our engine will take care of the rest.
                        </p>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Try these examples:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {samplePrompts.map((prompt, index) => (
                              <Badge 
                                key={index}
                                variant="outline" 
                                className="cursor-pointer hover:bg-naukri-accent hover:border-naukri-primary text-left justify-start p-2 h-auto whitespace-normal"
                                onClick={() => setJdText(prompt)}
                              >
                                {prompt}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleJDSearch}
                        className="bg-naukri-primary hover:bg-naukri-primary-dark px-8 w-full md:w-auto"
                        disabled={!jdText.trim()}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Find Matching Talent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skill" className="space-y-6">
                <Card className="shadow-sm border border-slate-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="e.g., Senior Product Manager with SQL, Python, Data Analytics"
                        value={skillQuery}
                        onChange={(e) => setSkillQuery(e.target.value)}
                        className="border-slate-200 focus:border-naukri-primary focus:ring-naukri-primary"
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
                              className="cursor-pointer hover:bg-naukri-accent hover:border-naukri-primary"
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
                              className="cursor-pointer hover:bg-naukri-accent hover:border-naukri-primary"
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
                      className="bg-naukri-primary hover:bg-naukri-primary-dark px-8 w-full md:w-auto"
                      disabled={!skillQuery.trim()}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Find Matching Talent
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Shortlists & Past Searches */}
          <div className="text-center">
            <Button
              onClick={onViewCandidateHub}
              variant="outline"
              className="bg-white border-2 border-naukri-primary text-naukri-primary hover:bg-naukri-accent hover:border-naukri-primary-dark"
            >
              <Users className="h-4 w-4 mr-2" />
              Shortlists & Past Searches
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Why Choose TopTier?
          </h2>
          <p className="text-lg text-slate-600">
            Get deeper context into top-tier hiring decisions with insight-rich market intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-naukri-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-naukri-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Premium Talent Pool</h3>
              <p className="text-slate-600">
                Access to 10lakh+ premium candidates from top companies with verified profiles and real-time availability.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-naukri-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-naukri-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Market Intelligence</h3>
              <p className="text-slate-600">
                Deep insights into salary trends, skill demands, and talent flow patterns across industries.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-naukri-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-naukri-primary" />
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
