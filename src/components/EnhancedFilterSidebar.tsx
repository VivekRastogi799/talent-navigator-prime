import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Search, Building, MapPin, Users, DollarSign, X, Clock, Target, Award, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EnhancedFilterSidebarProps {
  isOpen: boolean;
}

interface CompanySize {
  name: string;
  count: number;
}

const initialLocations = [
  "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Chennai", "Pune", "Kolkata"
];

const filterCategories = {
  "Company Type": {
    icon: Building,
    groups: {
      "FAANG": { items: ["Google", "Meta", "Amazon", "Apple", "Netflix"], count: 1250 },
      "Unicorns": { items: ["Flipkart", "Paytm", "Ola", "Swiggy", "Zomato"], count: 890 },
      "Product Companies": { items: ["Microsoft", "Adobe", "Salesforce", "Uber"], count: 675 },
      "Services": { items: ["TCS", "Infosys", "Wipro", "Accenture"], count: 2340 }
    }
  },
  "Experience": {
    icon: Award,
    groups: {
      "Entry Level": { items: ["0-2 years"], count: 450 },
      "Mid Level": { items: ["3-5 years"], count: 820 },
      "Senior Level": { items: ["6-10 years"], count: 650 },
      "Leadership": { items: ["10+ years"], count: 280 }
    }
  },
  "Work Mode": {
    icon: Target,
    groups: {
      "Remote": { items: ["Fully Remote"], count: 320 },
      "Hybrid": { items: ["2-3 days office"], count: 560 },
      "On-site": { items: ["Office based"], count: 1120 }
    }
  },
  "Notice Period": {
    icon: Clock,
    groups: {
      "Immediate": { items: ["0-15 days"], count: 180 },
      "Short": { items: ["16-30 days"], count: 420 },
      "Standard": { items: ["1-2 months"], count: 890 },
      "Long": { items: ["3+ months"], count: 510 }
    }
  }
};

const companySizes: CompanySize[] = [
  { name: "Startup (1-50)", count: 465 },
  { name: "Mid-size (51-500)", count: 1134 },
  { name: "Large (501-5000)", count: 777 },
  { name: "Enterprise (5000+)", count: 1624 }
];

const salaryRanges = [
  { range: "0-10 LPA", count: 580 },
  { range: "10-20 LPA", count: 920 },
  { range: "20-35 LPA", count: 650 },
  { range: "35-50 LPA", count: 380 },
  { range: "50+ LPA", count: 170 }
];

export const EnhancedFilterSidebar = ({ isOpen }: EnhancedFilterSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    companyType: true,
    experience: true,
    workMode: false,
    noticePeriod: false,
    location: false,
    companySize: false,
    salary: false
  });

  const handleFilterToggle = (category: string, item: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const handleGroupToggle = (category: string, groupName: string, items: string[]) => {
    const current = selectedFilters[category] || [];
    const allSelected = items.every(item => current.includes(item));
    
    if (allSelected) {
      // Deselect all
      setSelectedFilters(prev => ({
        ...prev,
        [category]: current.filter(item => !items.includes(item))
      }));
    } else {
      // Select all
      setSelectedFilters(prev => ({
        ...prev,
        [category]: [...new Set([...current, ...items])]
      }));
    }
  };

  const getAllSelectedFilters = () => {
    const all = [
      ...Object.values(selectedFilters).flat(),
      ...selectedLocations,
      ...selectedCompanySizes,
      ...selectedSalaryRanges
    ];
    return all;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-20 h-[calc(100vh-80px)] w-80 bg-white border-r border-slate-200 shadow-lg z-40 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Smart Filters</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search filters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Active Filters */}
        {getAllSelectedFilters().length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-slate-600">
                Active Filters ({getAllSelectedFilters().length})
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSelectedFilters({});
                  setSelectedLocations([]);
                  setSelectedCompanySizes([]);
                  setSelectedSalaryRanges([]);
                }}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              {Object.entries(selectedFilters).flatMap(([category, items]) =>
                items.map(item => (
                  <Badge key={`${category}-${item}`} variant="secondary" className="text-xs">
                    {item}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                      handleFilterToggle(category, item)
                    } />
                  </Badge>
                ))
              )}
              {selectedLocations.map(location => (
                <Badge key={location} variant="secondary" className="text-xs">
                  {location}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                    setSelectedLocations(prev => prev.filter(l => l !== location))
                  } />
                </Badge>
              ))}
              {selectedCompanySizes.map(size => (
                <Badge key={size} variant="secondary" className="text-xs">
                  {size}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                    setSelectedCompanySizes(prev => prev.filter(s => s !== size))
                  } />
                </Badge>
              ))}
              {selectedSalaryRanges.map(range => (
                <Badge key={range} variant="secondary" className="text-xs">
                  {range}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                    setSelectedSalaryRanges(prev => prev.filter(r => r !== range))
                  } />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Dynamic Filter Categories */}
        {Object.entries(filterCategories).map(([categoryName, category]) => {
          const Icon = category.icon;
          const sectionKey = categoryName.toLowerCase().replace(' ', '');
          
          return (
            <Card key={categoryName} className="border-slate-100">
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-600" />
                    {categoryName}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedSections(prev => ({
                      ...prev,
                      [sectionKey]: !prev[sectionKey as keyof typeof expandedSections]
                    }))}
                  >
                    {expandedSections[sectionKey as keyof typeof expandedSections] ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                </CardTitle>
              </CardHeader>
              {expandedSections[sectionKey as keyof typeof expandedSections] && (
                <CardContent className="pt-0 space-y-3">
                  {Object.entries(category.groups).map(([groupName, group]) => {
                    const selectedItems = selectedFilters[categoryName] || [];
                    const allSelected = group.items.every(item => selectedItems.includes(item));
                    const someSelected = group.items.some(item => selectedItems.includes(item));
                    
                    return (
                      <div key={groupName} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={allSelected}
                              onCheckedChange={() => handleGroupToggle(categoryName, groupName, group.items)}
                            />
                            <label className="text-sm font-medium text-slate-700">{groupName}</label>
                          </div>
                          <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                            {group.count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>
          );
        })}

        <Separator className="my-2" />

        {/* Company Size */}
        <Card className="border-slate-100">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-600" />
                Company Size
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  companySize: !prev.companySize
                }))}
              >
                {expandedSections.companySize ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedSections.companySize && (
            <CardContent className="pt-0 space-y-2">
              {companySizes.map(size => (
                <div key={size.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCompanySizes.includes(size.name)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCompanySizes(prev => [...prev, size.name]);
                        } else {
                          setSelectedCompanySizes(prev => prev.filter(s => s !== size.name));
                        }
                      }}
                    />
                    <label className="text-sm text-slate-700">{size.name}</label>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                    {size.count}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Locations */}
        <Card className="border-slate-100">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-600" />
                Location
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  location: !prev.location
                }))}
              >
                {expandedSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedSections.location && (
            <CardContent className="pt-0 space-y-2">
              {initialLocations.map((location, index) => (
                <div key={location} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedLocations(prev => [...prev, location]);
                        } else {
                          setSelectedLocations(prev => prev.filter(l => l !== location));
                        }
                      }}
                    />
                    <label className="text-sm text-slate-700">{location}</label>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                    {[145, 230, 180, 95, 120, 85, 65][index]}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Salary Range */}
        <Card className="border-slate-100">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-slate-600" />
                Salary Range
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  salary: !prev.salary
                }))}
              >
                {expandedSections.salary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedSections.salary && (
            <CardContent className="pt-0 space-y-2">
              {salaryRanges.map(salary => (
                <div key={salary.range} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedSalaryRanges.includes(salary.range)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSalaryRanges(prev => [...prev, salary.range]);
                        } else {
                          setSelectedSalaryRanges(prev => prev.filter(r => r !== salary.range));
                        }
                      }}
                    />
                    <label className="text-sm text-slate-700">{salary.range}</label>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                    {salary.count}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
