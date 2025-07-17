
import { useState, useEffect } from "react";
import { Search, Upload, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AnimatedTypingFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  disabled: boolean;
}

const typingPrompts = [
  "Hiring a Growth Product Manager for a B2C App",
  "Looking for a CMO with startup experience",
  "Need an AI/ML lead from Tier 1 institute",
  "Seeking a Backend Engineer with 5+ years Node.js",
  "Want a Data Scientist from FAANG background"
];

export const AnimatedTypingField = ({ 
  value, 
  onChange, 
  onSearch, 
  onFileUpload, 
  uploadedFile, 
  disabled 
}: AnimatedTypingFieldProps) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!value) {
      const currentPrompt = typingPrompts[currentPromptIndex];
      let charIndex = 0;
      setIsTyping(true);
      
      const typeInterval = setInterval(() => {
        if (charIndex < currentPrompt.length) {
          setDisplayedText(currentPrompt.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          // Wait 2 seconds then move to next prompt
          setTimeout(() => {
            setCurrentPromptIndex((prev) => (prev + 1) % typingPrompts.length);
            setDisplayedText("");
          }, 2000);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    }
  }, [currentPromptIndex, value]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSearch();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Textarea
          placeholder={value ? "Describe the role you're hiring for..." : displayedText}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="min-h-[120px] resize-none border-naukri-blue-200 focus:border-naukri-primary focus:ring-naukri-primary text-base pr-32 pl-4 py-4 rounded-xl transition-all duration-300 hover:border-naukri-primary/60"
          disabled={disabled}
        />
        
        {/* Animated typing cursor */}
        {!value && (
          <div className={`absolute left-4 top-4 text-slate-400 pointer-events-none transition-opacity duration-300 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
            <span className="animate-pulse">|</span>
          </div>
        )}
        
        {/* Upload button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
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
            className="border-naukri-blue-200 hover:border-naukri-primary hover:bg-naukri-blue-50 text-naukri-blue-700 transition-all duration-300"
            disabled={disabled}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload JD
          </Button>
          
          {value.trim() && (
            <Button
              onClick={onSearch}
              size="sm"
              className="bg-naukri-primary hover:bg-naukri-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={disabled}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Search
            </Button>
          )}
        </div>
      </div>
      
      {uploadedFile && (
        <div className="mt-3 text-sm text-naukri-blue-600 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Uploaded: {uploadedFile.name}
        </div>
      )}
      
      <div className="mt-4 text-sm text-slate-600 leading-relaxed">
        <p className="flex items-center gap-2">
          <span className="text-naukri-primary">✨</span>
          <strong>Paste or upload your JD to auto-discover relevant talent instantly. Our AI does the rest.</strong>
        </p>
      </div>
    </div>
  );
};
