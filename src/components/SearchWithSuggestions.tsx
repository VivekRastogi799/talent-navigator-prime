
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchSuggestion {
  text: string;
  category: 'role' | 'skill' | 'company' | 'location';
  count: number;
}

interface SearchWithSuggestionsProps {
  onSearch: (query: string) => void;
}

export const SearchWithSuggestions = ({ onSearch }: SearchWithSuggestionsProps) => {
  const [query, setQuery] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockSuggestions: SearchSuggestion[] = [
    { text: "Product Manager", category: "role", count: 1247 },
    { text: "Product Manager", category: "skill", count: 892 },
    { text: "Senior Product Manager", category: "role", count: 643 },
    { text: "Associate Product Manager", category: "role", count: 234 },
    { text: "Product Owner", category: "role", count: 156 },
    { text: "Product Strategy", category: "skill", count: 743 },
    { text: "Product Analytics", category: "skill", count: 567 },
    { text: "Product Development", category: "skill", count: 445 },
    { text: "Roadmap Planning", category: "skill", count: 389 },
    { text: "A/B Testing", category: "skill", count: 334 },
    { text: "Google", category: "company", count: 189 },
    { text: "Microsoft", category: "company", count: 176 },
    { text: "Amazon", category: "company", count: 167 },
    { text: "Meta", category: "company", count: 134 },
    { text: "Netflix", category: "company", count: 89 },
    { text: "Bangalore", category: "location", count: 856 },
    { text: "Mumbai", category: "location", count: 534 },
    { text: "Delhi NCR", category: "location", count: 456 },
    { text: "Hyderabad", category: "location", count: 378 },
    { text: "Chennai", category: "location", count: 289 }
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase()) &&
        !selectedKeywords.includes(s.text)
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, selectedKeywords]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'role': return '👤';
      case 'skill': return '🔧';
      case 'company': return '🏢';
      case 'location': return '📍';
      default: return '🔍';
    }
  };

  const addKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      const newKeywords = [...selectedKeywords, keyword];
      setSelectedKeywords(newKeywords);
      setQuery("");
      setShowSuggestions(false);
      onSearch(newKeywords.join(", "));
    }
  };

  const removeKeyword = (keyword: string) => {
    const newKeywords = selectedKeywords.filter(k => k !== keyword);
    setSelectedKeywords(newKeywords);
    onSearch(newKeywords.join(", "));
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    addKeyword(suggestion.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      addKeyword(query.trim());
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      addKeyword(query.trim());
    } else if (selectedKeywords.length > 0) {
      onSearch(selectedKeywords.join(", "));
    }
  };

  return (
    <div className="relative flex-1 max-w-2xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 z-10" />
        
        {/* Selected Keywords */}
        <div className="flex flex-wrap gap-2 pl-10 pr-20 py-2 min-h-[42px] bg-slate-50 border border-slate-200 rounded-lg focus-within:border-naukri-primary focus-within:ring-1 focus-within:ring-naukri-primary">
          {selectedKeywords.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {keyword}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => removeKeyword(keyword)}
              />
            </Badge>
          ))}
          <Input
            ref={inputRef}
            placeholder={selectedKeywords.length === 0 ? "Search by role, location, CTC, company..." : "Add more keywords..."}
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 flex-1 min-w-[200px] p-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
          />
        </div>
        
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-naukri-primary hover:bg-naukri-primary-dark"
        >
          Search
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getCategoryIcon(suggestion.category)}</span>
                <div>
                  <div className="font-medium text-slate-800">{suggestion.text}</div>
                  <div className="text-sm text-slate-500 capitalize">in {suggestion.category}</div>
                </div>
              </div>
              <div className="text-sm text-slate-400">{suggestion.count} results</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
