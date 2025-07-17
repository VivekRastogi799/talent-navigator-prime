
import { useState, useRef, useEffect } from "react";
import { Search, X, Sparkles, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface SearchSuggestion {
  text: string;
  category: 'designation' | 'skill' | 'company' | 'location';
  count: number;
}

interface EnhancedSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const EnhancedSearchInput = ({ onSearch, placeholder = "Enter designation, skills..." }: EnhancedSearchInputProps) => {
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [booleanOff, setBooleanOff] = useState(true);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockSuggestions: SearchSuggestion[] = [
    { text: "Product Manager", category: "designation", count: 1247 },
    { text: "Senior Product Manager", category: "designation", count: 892 },
    { text: "Product Management", category: "skill", count: 643 },
    { text: "Product Strategy", category: "skill", count: 743 },
    { text: "Product Analytics", category: "skill", count: 567 },
    { text: "Product Planning", category: "skill", count: 445 },
    { text: "Product Launch", category: "skill", count: 389 },
    { text: "Product Marketing", category: "skill", count: 334 },
    { text: "Product Positioning", category: "skill", count: 298 },
    { text: "Product Innovation", category: "skill", count: 267 },
    { text: "Growth Manager", category: "designation", count: 234 },
    { text: "Product Owner", category: "designation", count: 201 },
    { text: "Associate Product Manager", category: "designation", count: 189 },
    { text: "VP Product", category: "designation", count: 156 }
  ];

  // Dynamic AI suggestions based on current query
  const getAISuggestions = (currentQuery: string) => {
    if (currentQuery.toLowerCase().includes("product")) {
      return [
        "Product Strategy", "Product Portfolio", "Product Launch", "Product Marketing",
        "Product Positioning", "Product Innovation", "Product Life Cycle",
        "Product Portfolio Management", "Product Roadmap", "Product Promotion"
      ];
    } else if (currentQuery.toLowerCase().includes("growth")) {
      return [
        "Growth Hacking", "Growth Strategy", "User Acquisition", "Conversion Optimization",
        "A/B Testing", "Analytics", "Performance Marketing", "Customer Retention"
      ];
    } else if (currentQuery.toLowerCase().includes("data")) {
      return [
        "Data Analysis", "Machine Learning", "Python", "SQL", "Statistics",
        "Data Visualization", "Big Data", "Data Mining", "Predictive Analytics"
      ];
    }
    return [
      "Leadership", "Strategy", "Analytics", "Communication", "Problem Solving",
      "Project Management", "Team Management", "Innovation"
    ];
  };

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase()) &&
        !selectedSkills.includes(s.text)
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
      
      // Update AI suggestions based on current query
      if (selectedSkills.length > 0) {
        setAiSuggestions(getAISuggestions(selectedSkills[selectedSkills.length - 1]));
      } else {
        setAiSuggestions(getAISuggestions(query));
      }
    } else {
      setShowSuggestions(false);
      // Show default AI suggestions when no query
      if (selectedSkills.length > 0) {
        setAiSuggestions(getAISuggestions(selectedSkills[selectedSkills.length - 1]));
      } else {
        setAiSuggestions([]);
      }
    }
  }, [query, selectedSkills]);

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setQuery("");
      setShowSuggestions(false);
      // Update AI suggestions based on newly added skill
      setAiSuggestions(getAISuggestions(skill));
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(newSkills);
    // Update AI suggestions based on remaining skills
    if (newSkills.length > 0) {
      setAiSuggestions(getAISuggestions(newSkills[newSkills.length - 1]));
    } else {
      setAiSuggestions([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      addSkill(query.trim());
    }
  };

  const handleSearch = () => {
    if (selectedSkills.length > 0) {
      onSearch(selectedSkills.join(booleanOff ? " AND " : " OR "));
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Boolean Toggle */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Boolean</span>
          <Switch 
            checked={!booleanOff} 
            onCheckedChange={(checked) => setBooleanOff(!checked)}
          />
          <span className="text-xs text-slate-500">
            {booleanOff ? 'AND' : 'OR'}
          </span>
        </div>
      </div>

      {/* Key Skills Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Key skills</span>
          <span className="text-red-500">*</span>
        </div>
        
        {/* Selected Skills Container */}
        <div className="min-h-[80px] p-4 border-2 border-slate-200 rounded-xl bg-white focus-within:border-primary transition-colors relative">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-slate-50 border-slate-300 hover:bg-slate-100 px-3 py-1 text-sm"
              >
                {skill}
                <X 
                  className="h-3 w-3 ml-2 cursor-pointer hover:text-red-500" 
                  onClick={() => removeSkill(skill)}
                />
              </Badge>
            ))}
            <div className="flex-1 min-w-[200px]">
              <Input
                ref={inputRef}
                placeholder={selectedSkills.length === 0 ? placeholder : "Add more skills..."}
                className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => query.length > 0 && setShowSuggestions(true)}
              />
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                  onClick={() => addSkill(suggestion.text)}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-slate-800">{suggestion.text}</div>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-400">{suggestion.count} results</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Suggested Skills - Only show when we have selections */}
        {selectedSkills.length > 0 && aiSuggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">AI suggested key skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.filter(skill => !selectedSkills.includes(skill)).slice(0, 8).map((skill) => (
                <Badge 
                  key={skill}
                  variant="outline" 
                  className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors text-sm py-1 px-3"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Experience Range */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Input 
            placeholder="Min. experience" 
            className="border-slate-200 focus:border-primary"
          />
          <div className="flex items-center justify-center">
            <span className="text-slate-500">to</span>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder="Max. experience" 
              className="border-slate-200 focus:border-primary"
            />
            <div className="flex items-center px-3 text-slate-500 border border-slate-200 rounded-md bg-slate-50">
              Years
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base font-medium"
            onClick={handleSearch}
            disabled={selectedSkills.length === 0}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
