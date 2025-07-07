
import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    { text: "Google", category: "company", count: 89 },
    { text: "Microsoft", category: "company", count: 76 },
    { text: "Amazon", category: "company", count: 67 },
    { text: "Bangalore", category: "location", count: 456 },
    { text: "Mumbai", category: "location", count: 234 },
    { text: "Delhi NCR", category: "location", count: 189 }
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'role': return '👤';
      case 'skill': return '🔧';
      case 'company': return '🏢';
      case 'location': return '📍';
      default: return '🔍';
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    onSearch(suggestion.text);
  };

  const handleSearch = () => {
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex-1 max-w-2xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          ref={inputRef}
          placeholder="Search by role, location, CTC, company..."
          className="pl-10 pr-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-blue-600 hover:bg-blue-700"
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
