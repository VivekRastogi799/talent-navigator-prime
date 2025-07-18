
import { useState } from "react";
import { Search, Users, Sparkles, Clock, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedTypingField } from "@/components/AnimatedTypingField";
import { LiveTalentStats } from "@/components/LiveTalentStats";
import { EnhancedSearchInput } from "@/components/EnhancedSearchInput";

interface LandingPageProps {
  onSearch: (query: string, type: 'jd' | 'skill') => void;
  onViewCandidateHub: () => void;
}

export const LandingPage = ({ onSearch, onViewCandidateHub }: LandingPageProps) => {
  const [jdText, setJdText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const samplePrompts = [
    "Hiring a Growth Product Manager for a B2C App",
    "Looking for a CMO with startup experience",
    "Need an AI/ML lead from Tier 1 institute",
    "Seeking Senior Data Scientist with ML expertise"
  ];

  const handleJDSearch = async () => {
    if (jdText.trim()) {
      setIsSearching(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      onSearch(jdText, 'jd');
      setIsSearching(false);
    }
  };

  const handleSkillSearch = async (query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      onSearch(query, 'skill');
      setIsSearching(false);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJdText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold gradient-text mb-4">
              TopTier
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
              AI-Powered Talent Intelligence Platform
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover top-tier talent with advanced AI matching and comprehensive market insights
            </p>
          </div>

          {/* Quick Access Actions - Moved to prominent position */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                onClick={onViewCandidateHub}
                variant="outline"
                size="lg"
                className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl group"
              >
                <Users className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">Candidate Hub</div>
                  <div className="text-xs opacity-75">Saved Candidates & Past Searches</div>
                </div>
              </Button>
              
              {/* Quick Stats */}
              <div className="flex gap-4 text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">24 Recent Searches</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-green-600">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">156 Profiles</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-purple-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">22% Shortlists</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Talent Stats */}
          <div className="mb-8">
            <LiveTalentStats />
          </div>

          {/* Search Section */}
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="jd" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-xl border border-slate-200 shadow-sm">
                <TabsTrigger 
                  value="jd" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium transition-all duration-300 py-3"
                >
                  <Sparkles className="h-4 w-4" />
                  NLP Search
                </TabsTrigger>
                <TabsTrigger 
                  value="skill" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium transition-all duration-300 py-3"
                >
                  <Search className="h-4 w-4" />
                  Search by Designation/Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jd" className="space-y-6">
                <Card className="glass-card premium-shadow border-slate-200">
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
                            <button 
                              key={index}
                              className="cursor-pointer hover:bg-primary/10 hover:border-primary text-left p-3 h-auto whitespace-normal border border-slate-200 rounded-lg transition-all duration-300 bg-white/50"
                              onClick={() => setJdText(prompt)}
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skill" className="space-y-6">
                <Card className="glass-card premium-shadow border-slate-200">
                  <CardContent className="p-8">
                    <EnhancedSearchInput 
                      onSearch={handleSkillSearch}
                      placeholder="Enter designation, skills..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
            <Card className="glass-card premium-shadow border-slate-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Premium Talent Pool</h3>
                <p className="text-slate-600 leading-relaxed">
                  Access to 2.8M+ premium candidates from top companies with verified profiles and real-time availability.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card premium-shadow border-slate-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Market Intelligence</h3>
                <p className="text-slate-600 leading-relaxed">
                  Deep insights into salary trends, skill demands, and talent flow patterns across industries.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card premium-shadow border-slate-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
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
