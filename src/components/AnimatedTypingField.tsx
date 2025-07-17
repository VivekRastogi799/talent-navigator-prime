
import { useState, useEffect } from "react";
import { Search, Upload, FileText, Loader, X } from "lucide-react";
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
  const [placeholder, setPlaceholder] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const placeholderTexts = [
    "Looking for a Senior Data Scientist with ML expertise...",
    "Need a Growth Product Manager for B2C apps...",
    "Hiring a Full Stack Developer with React experience...",
    "Seeking a DevOps Engineer with AWS certification..."
  ];

  useEffect(() => {
    // Only show animated placeholder when there's no user input
    if (value.length > 0) {
      setPlaceholder("");
      return;
    }

    const currentText = placeholderTexts[currentIndex];
    let charIndex = 0;

    if (isTyping) {
      const typeTimer = setInterval(() => {
        if (charIndex < currentText.length) {
          setPlaceholder(currentText.substring(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentIndex((prev) => (prev + 1) % placeholderTexts.length);
          }, 2000);
          clearInterval(typeTimer);
        }
      }, 50);

      return () => clearInterval(typeTimer);
    }
  }, [currentIndex, isTyping, value.length]);

  const handleFileSelect = (file: File) => {
    if (file && file.type === 'text/plain') {
      onFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = () => {
    onChange("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-slate-700">Describe the role you are hiring for, Our AI does the rest</span>
        <span className="text-red-500">*</span>
      </div>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-slate-200 bg-white'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploadedFile ? (
          <div className="p-6">
            <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium text-slate-800">{uploadedFile.name}</div>
                  <div className="text-sm text-slate-500">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={removeFile}
                className="text-slate-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-[120px] border-0 shadow-none resize-none focus-visible:ring-0 text-base"
              disabled={disabled}
            />
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" className="gap-2" type="button">
                    <Upload className="h-4 w-4" />
                    Upload JD
                  </Button>
                </label>
                <span className="text-xs text-slate-500">or drag & drop a .txt file</span>
              </div>
              
              <Button 
                onClick={onSearch} 
                disabled={!value.trim() || disabled}
                className="bg-primary hover:bg-primary/90 text-white px-6"
              >
                {disabled ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
