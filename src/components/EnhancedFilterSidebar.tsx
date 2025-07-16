import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Search, Building, MapPin, Users, DollarSign, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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

const companyTierGroups = {
  "Tier 1": ["Google", "Microsoft", "Amazon", "Facebook", "Apple"],
  "Tier 2": ["Infosys", "TCS", "Wipro", "HCL", "Accenture"],
  "Startups": ["Ola", "Uber", "Airbnb", "SpaceX", "Byju's"]
};

const companySizes: CompanySize[] = [
  { name: "1-10", count: 120 },
  { name: "11-50", count: 345 },
  { name: "51-200", count: 678 },
  { name: "201-500", count: 456 },
  { name: "501-1000", count: 321 },
  { name: "1001+", count: 987 }
];

export const EnhancedFilterSidebar = ({ isOpen }: EnhancedFilterSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCompanyTiers, setSelectedCompanyTiers] = useState<string[]>([]);
  const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    companyTiers: true,
    companySize: true,
    locations: false,
    salary: false
  });

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const handleSalaryRangeChange = (range: string) => {
    // Placeholder for salary range selection logic
    console.log("Selected salary range:", range);
  };

  const handleGroupToggle = (group: string, items: string[]) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const allSelected = items.every(item => 
      group === 'companies' ? selectedCompanies.includes(item) :
      group === 'companyTiers' ? selectedCompanyTiers.includes(item) :
      selectedCompanySizes.includes(item)
    );
    
    const someSelected = items.some(item => 
      group === 'companies' ? selectedCompanies.includes(item) :
      group === 'companyTiers' ? selectedCompanyTiers.includes(item) :
      selectedCompanySizes.includes(item)
    );

    // Set checkbox state
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = allSelected;
        checkboxRef.current.indeterminate = someSelected && !allSelected;
      }
    }, [allSelected, someSelected]);

    if (allSelected) {
      // Deselect all
      if (group === 'companies') {
        setSelectedCompanies(prev => prev.filter(item => !items.includes(item)));
      } else if (group === 'companyTiers') {
        setSelectedCompanyTiers(prev => prev.filter(item => !items.includes(item)));
      } else {
        setSelectedCompanySizes(prev => prev.filter(item => !items.includes(item)));
      }
    } else {
      // Select all
      if (group === 'companies') {
        setSelectedCompanies(prev => [...new Set([...prev, ...items])]);
      } else if (group === 'companyTiers') {
        setSelectedCompanyTiers(prev => [...new Set([...prev, ...items])]);
      } else {
        setSelectedCompanySizes(prev => [...new Set([...prev, ...items])]);
      }
    }
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
        {(selectedCompanies.length > 0 || selectedLocations.length > 0 || selectedCompanyTiers.length > 0 || selectedCompanySizes.length > 0) && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-600">Active Filters</div>
            <div className="flex flex-wrap gap-1">
              {selectedCompanies.map(company => (
                <Badge key={company} variant="secondary" className="text-xs">
                  {company}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                    setSelectedCompanies(prev => prev.filter(c => c !== company))
                  } />
                </Badge>
              ))}
              {selectedLocations.map(location => (
                <Badge key={location} variant="secondary" className="text-xs">
                  {location}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                    setSelectedLocations(prev => prev.filter(l => l !== location))
                  } />
                </Badge>
              ))}
              {selectedCompanyTiers.map(tier => (
                <Badge key={tier} variant="secondary" className="text-xs">
                  {tier}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => 
                    setSelectedCompanyTiers(prev => prev.filter(t => t !== tier))
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
            </div>
          </div>
        )}
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Company Tiers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Tiers
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  companyTiers: !prev.companyTiers
                }))}
              >
                {expandedSections.companyTiers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedSections.companyTiers && (
            <CardContent className="pt-0 space-y-3">
              {Object.entries(companyTierGroups).map(([tierName, companies]) => (
                <div key={tierName} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      ref={useRef<HTMLInputElement>(null)}
                      className="rounded"
                      onChange={() => handleGroupToggle('companyTiers', [tierName])}
                    />
                    <label className="text-sm font-medium text-slate-700">{tierName}</label>
                    <span className="text-xs text-slate-500">({companies.length})</span>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Company Size */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Company Size
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
                <div key={size.name} className="flex items-center space-x-2">
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
                  <span className="text-xs text-slate-500">({size.count})</span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Locations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Locations
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSections(prev => ({
                  ...prev,
                  locations: !prev.locations
                }))}
              >
                {expandedSections.locations ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          {expandedSections.locations && (
            <CardContent className="pt-0 space-y-2">
              {initialLocations.map(location => (
                <div key={location} className="flex items-center space-x-2">
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
              ))}
            </CardContent>
          )}
        </Card>

        {/* Salary Range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Salary Range (LPA)
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
              {["0-10", "10-20", "20-30", "30+"].map(range => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={`salary-${range}`}
                    onCheckedChange={() => handleSalaryRangeChange(range)}
                  />
                  <label htmlFor={`salary-${range}`} className="text-sm text-slate-700">{range}</label>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
