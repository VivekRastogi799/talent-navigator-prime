
import { useState } from "react";
import { Search, Users, Sparkles, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedTypingField } from "@/components/AnimatedTypingField";
import { LiveTalentStats } from "@/components/LiveTalentStats";

interface LandingPageProps {
  onSearch: (query: string, type: 'jd' | 'skill') => void;
  onViewCandidateHub: () => void;
}

export const LandingPage = ({ onSearch, onViewCandidateHub }: LandingPageProps) => {
  const [jdText, setJdText] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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

  const popularDesignations = [
    "Senior Product Manager", "Product Manager", "Associate Product Manager",
    "VP Product", "Head of Product", "Principal Product Manager"
  ];

  const handleJDSearch = async () => {
    if (jdText.trim()) {
      setIsSearching(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      onSearch(jdText, 'jd');
      setIsSearching(false);
    }
  };

  const handleSkillSearch = async () => {
    if (skillQuery.trim()) {
      setIsSearching(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      onSearch(skillQuery, 'skill');
      setIsSearching(false);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Read file content and set it to jdText
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJdText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-naukri-blue-50 to-naukri-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-naukri-primary/5 to-naukri-primary/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="text-center mb-12">
            <div className="text-5xl font-bold gradient-text mb-4">
              TopTier
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
              AI-Powered Talent Intelligence Platform
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover top-tier talent with advanced AI matching and comprehensive market insights
            </p>
          </div>

          {/* Live Talent Stats */}
          <LiveTalentStats />

          {/* Search Section */}
          <div className="max-w-5xl mx-auto mb-8">
            <Tabs defaultValue="jd" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-xl border border-naukri-blue-200">
                <TabsTrigger 
                  value="jd" 
                  className="flex items-center gap-2 data-[state=active]:bg-naukri-primary data-[state=active]:text-white rounded-lg font-medium transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  JD-based NLP Search
                </TabsTrigger>
                <TabsTrigger 
                  value="skill" 
                  className="flex items-center gap-2 data-[state=active]:bg-naukri-primary data-[state=active]:text-white rounded-lg font-medium transition-all duration-300"
                >
                  <Search className="h-4 w-4" />
                  Search by Designation/Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jd" className="space-y-6">
                <Card className="glass-card premium-shadow border-naukri-blue-200">
                  <CardContent className="p-8">
                    <AnimatedTypingField
                      value={jdText}
                      onChange={setJdText}
                      onSearch={handleJDSearch}
                      onFileUpload={handleFileUpload}
                      uploadedFile={uploadedFile}
                      disabled={isSearching}
                    />
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Try these examples:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {samplePrompts.map((prompt, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className="cursor-pointer hover:bg-naukri-blue-50 hover:border-naukri-primary text-left justify-start p-3 h-auto whitespace-normal border-naukri-blue-200 transition-all duration-300"
                              onClick={() => setJdText(prompt)}
                            >
                              {prompt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skill" className="space-y-6">
                <Card className="glass-card premium-shadow border-naukri-blue-200">
                  <CardContent className="p-8">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="e.g., Senior Product Manager with SQL, Python, Data Analytics"
                        value={skillQuery}
                        onChange={(e) => setSkillQuery(e.target.value)}
                        className="pl-12 h-14 text-base border-naukri-blue-200 focus:border-naukri-primary focus:ring-naukri-primary rounded-xl"
                        onKeyPress={(e) => e.key === 'Enter' && handleSkillSearch()}
                      />
                      {skillQuery.trim() && (
                        <Button
                          onClick={handleSkillSearch}
                          size="sm"
                          className="absolute right-2 top-2 bg-naukri-primary hover:bg-naukri-primary-dark h-10 px-6"
                          disabled={isSearching}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Popular Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {popularSkills.map((skill) => (
                            <Badge 
                              key={skill}
                              variant="outline" 
                              className="cursor-pointer hover:bg-naukri-blue-50 hover:border-naukri-primary border-naukri-blue-200 transition-all duration-300"
                              onClick={() => setSkillQuery(prev => prev ? `${prev}, ${skill}` : skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Popular Designations</h4>
                        <div className="flex flex-wrap gap-2">
                          {popularDesignations.map((designation) => (
                            <Badge 
                              key={designation}
                              variant="outline" 
                              className="cursor-pointer hover:bg-naukri-blue-50 hover:border-naukri-primary border-naukri-blue-200 transition-all duration-300"
                              onClick={() => setSkillQuery(designation)}
                            >
                              {designation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Saved Candidates */}
          <div className="text-center mb-12">
            <Button
              onClick={onViewCandidateHub}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-2 border-naukri-primary text-naukri-primary hover:bg-naukri-primary hover:text-white transition-all duration-300 px-8 py-3 text-lg font-medium rounded-xl premium-shadow"
            >
              <Users className="h-5 w-5 mr-2" />
              Saved Candidates & Past Searches
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Why Choose TopTier?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Advanced AI-powered insights and premium talent intelligence for modern recruiting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card premium-shadow border-naukri-blue-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-naukri-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-naukri-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Premium Talent Pool</h3>
                <p className="text-slate-600 leading-relaxed">
                  Access to 2.8M+ premium candidates from top companies with verified profiles and real-time availability.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card premium-shadow border-naukri-blue-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-naukri-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-naukri-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Market Intelligence</h3>
                <p className="text-slate-600 leading-relaxed">
                  Deep insights into salary trends, skill demands, and talent flow patterns across industries.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card premium-shadow border-naukri-blue-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-naukri-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-naukri-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">AI-Powered Matching</h3>
                <p className="text-slate-600 leading-relaxed">
                  Smart algorithms analyze job requirements and match with the most relevant candidates instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
