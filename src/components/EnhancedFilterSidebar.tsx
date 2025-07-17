
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, Building, MapPin, Users, DollarSign, X, Clock, Target, Award, Briefcase, Factory, GraduationCap, TrendingUp } from "lucide-react";
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
  "Company Cluster": {
    icon: Building,
    groups: {
      "FAANG": { items: ["Google", "Meta", "Amazon", "Apple", "Netflix"], count: 1250 },
      "Unicorns": { items: ["Flipkart", "Paytm", "Ola", "Swiggy", "Zomato"], count: 890 },
      "Product Companies": { items: ["Microsoft", "Adobe", "Salesforce", "Uber"], count: 675 },
      "Services": { items: ["TCS", "Infosys", "Wipro", "Accenture"], count: 2340 }
    }
  },
  "Sector": {
    icon: Factory,
    groups: {
      "Technology": { items: ["Fintech", "EdTech", "HealthTech", "E-commerce"], count: 1800 },
      "Finance": { items: ["Banking", "Insurance", "Investment", "NBFCs"], count: 950 },
      "Healthcare": { items: ["Pharma", "Biotech", "Medical Devices", "Digital Health"], count: 620 },
      "Retail": { items: ["Fashion", "FMCG", "Food & Beverage", "Lifestyle"], count: 780 }
    }
  },
  "Company Stage": {
    icon: TrendingUp,
    groups: {
      "Growth": { items: ["Series A", "Series B", "Series C"], count: 650 },
      "Unicorn": { items: ["Valued $1B+"], count: 89 },
      "Mature": { items: ["IPO", "Public", "Established"], count: 1200 },
      "Startup": { items: ["Pre-Series A", "Seed", "Bootstrap"], count: 450 }
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

const educationFilters = [
  { name: "Tier 1 Education", count: 890 },
  { name: "IIT/IIM", count: 234 },
  { name: "Top Engineering Colleges", count: 567 },
  { name: "MBA", count: 445 },
  { name: "B.Tech", count: 1234 },
  { name: "M.Tech", count: 345 }
];

export const EnhancedFilterSidebar = ({ isOpen }: EnhancedFilterSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    companyCluster: true,
    sector: false,
    companyStage: false,
    experience: true,
    workMode: false,
    noticePeriod: false,
    location: false,
    companySize: false,
    salary: false,
    education: false
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
      setSelectedFilters(prev => ({
        ...prev,
        [category]: current.filter(item => !items.includes(item))
      }));
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [category]: [...new Set([...current, ...items])]
      }));
    }
  };

  const removeFilter = (category: string, item: string) => {
    if (category === 'location') {
      setSelectedLocations(prev => prev.filter(l => l !== item));
    } else if (category === 'companySize') {
      setSelectedCompanySizes(prev => prev.filter(s => s !== item));
    } else if (category === 'salary') {
      setSelectedSalaryRanges(prev => prev.filter(r => r !== item));
    } else if (category === 'education') {
      setSelectedEducation(prev => prev.filter(e => e !== item));
    } else {
      handleFilterToggle(category, item);
    }
  };

  const getAllSelectedFilters = () => {
    const filterMap = new Map<string, string[]>();
    
    Object.entries(selectedFilters).forEach(([category, items]) => {
      items.forEach(item => {
        filterMap.set(item, [category, item]);
      });
    });
    
    selectedLocations.forEach(location => {
      filterMap.set(location, ['location', location]);
    });
    
    selectedCompanySizes.forEach(size => {
      filterMap.set(size, ['companySize', size]);
    });
    
    selectedSalaryRanges.forEach(range => {
      filterMap.set(range, ['salary', range]);
    });
    
    selectedEducation.forEach(education => {
      filterMap.set(education, ['education', education]);
    });
    
    return filterMap;
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setSelectedLocations([]);
    setSelectedCompanySizes([]);
    setSelectedSalaryRanges([]);
    setSelectedEducation([]);
  };

  if (!isOpen) return null;

  const allFilters = getAllSelectedFilters();

  return (
    <div className="fixed left-0 top-20 h-[calc(100vh-80px)] w-80 bg-white border-r border-naukri-blue-200 shadow-xl z-40 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-naukri-blue-100 bg-naukri-blue-50">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Smart Filters</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search filters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-naukri-blue-200 focus:border-naukri-primary"
          />
        </div>

        {/* Active Filters */}
        {allFilters.size > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-naukri-blue-700">
                Active Filters ({allFilters.size})
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearAllFilters}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              {Array.from(allFilters.entries()).map(([filterName, [category, item]]) => (
                <Badge 
                  key={filterName} 
                  variant="secondary" 
                  className="text-xs bg-naukri-blue-100 text-naukri-blue-800 border-naukri-blue-200"
                >
                  {item}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer hover:text-red-500" 
                    onClick={() => removeFilter(category, item)}
                  />
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
          const sectionKey = categoryName.toLowerCase().replace(/\s+/g, '');
          
          return (
            <Card key={categoryName} className="border-naukri-blue-100 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-naukri-primary" />
                    {categoryName}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedSections(prev => ({
                      ...prev,
                      [sectionKey]: !prev[sectionKey as keyof typeof expandedSections]
                    }))}
                    className="hover:bg-naukri-blue-50"
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
                          <span className="text-xs text-slate-500 bg-naukri-blue-50 px-2 py-1 rounded">
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

        {/* Education */}
        <Card className="border-naukri-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-naukri-primary" />
                Education
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  education: !prev.education
                }))}
                className="hover:bg-naukri-blue-50"
              >
                {expandedSections.education ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedSections.education && (
            <CardContent className="pt-0 space-y-2">
              {educationFilters.map(education => (
                <div key={education.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedEducation.includes(education.name)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedEducation(prev => [...prev, education.name]);
                        } else {
                          setSelectedEducation(prev => prev.filter(e => e !== education.name));
                        }
                      }}
                    />
                    <label className="text-sm text-slate-700">{education.name}</label>
                  </div>
                  <span className="text-xs text-slate-500 bg-naukri-blue-50 px-2 py-1 rounded">
                    {education.count}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Company Size */}
        <Card className="border-naukri-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-naukri-primary" />
                Company Size
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  companySize: !prev.companySize
                }))}
                className="hover:bg-naukri-blue-50"
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
                  <span className="text-xs text-slate-500 bg-naukri-blue-50 px-2 py-1 rounded">
                    {size.count}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Locations */}
        <Card className="border-naukri-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-naukri-primary" />
                Location
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  location: !prev.location
                }))}
                className="hover:bg-naukri-blue-50"
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
                  <span className="text-xs text-slate-500 bg-naukri-blue-50 px-2 py-1 rounded">
                    {[145, 230, 180, 95, 120, 85, 65][index]}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Salary Range */}
        <Card className="border-naukri-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-naukri-primary" />
                Salary Range
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  salary: !prev.salary
                }))}
                className="hover:bg-naukri-blue-50"
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
                  <span className="text-xs text-slate-500 bg-naukri-blue-50 px-2 py-1 rounded">
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
