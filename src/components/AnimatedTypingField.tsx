
import { useState, useEffect, useRef } from "react";
import { Upload, FileText, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AnimatedTypingFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  disabled?: boolean;
}

export const AnimatedTypingField = ({ 
  value, 
  onChange, 
  onSearch, 
  onFileUpload, 
  uploadedFile,
  disabled = false 
}: AnimatedTypingFieldProps) => {
  const [showTyping, setShowTyping] = useState(true);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const typingPrompts = [
    "Hiring a Growth Product Manager for a B2C App",
    "Looking for a CMO with startup experience", 
    "Need an AI/ML lead from Tier 1 institute",
    "Seeking Senior Data Scientist with ML expertise"
  ];

  useEffect(() => {
    if (value.trim()) {
      setShowTyping(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % typingPrompts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [value, typingPrompts.length]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Describe the role you are hiring for..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] text-base border-slate-200 focus:border-primary focus:ring-primary resize-none"
          disabled={disabled}
        />
        
        {showTyping && !value && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <div className="text-slate-400 animate-typing">
              {typingPrompts[currentPromptIndex]}
            </div>
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-slate-200 hover:border-primary hover:text-primary"
            disabled={disabled}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload JD
          </Button>

          {uploadedFile && (
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
              <FileText className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-700">{uploadedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="h-auto p-1 hover:bg-slate-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        <Button 
          onClick={onSearch}
          disabled={!value.trim() || disabled}
          className="bg-primary hover:bg-primary/90 px-8"
        >
          <Search className="h-4 w-4 mr-2" />
          {disabled ? "Searching..." : "Search"}
        </Button>
      </div>

      <p className="text-sm text-slate-500 text-center">
        Describe the role you are hiring for or just add the JD, Our AI does the rest
      </p>
    </div>
  );
};
