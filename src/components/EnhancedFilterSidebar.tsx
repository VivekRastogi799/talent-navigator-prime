
import { useState } from "react";
import { Filter, MapPin, Building2, DollarSign, Clock, GraduationCap, Users, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EnhancedFilterSidebarProps {
  isOpen: boolean;
}

export const EnhancedFilterSidebar = ({ isOpen }: EnhancedFilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    experience: true,
    companies: true,
    skills: false,
    ctc: false,
    notice: false,
    education: false,
    diversity: false
  });

  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    location: [],
    companies: [],
    skills: [],
    education: [],
    diversity: []
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelectAll = (category: string, items: any[]) => {
    const allValues = items.map(item => item.name);
    setSelectedFilters(prev => ({ ...prev, [category]: allValues }));
  };

  const handleClearAll = (category: string) => {
    setSelectedFilters(prev => ({ ...prev, [category]: [] }));
  };

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const locations = [
    { name: "Bangalore", count: 856 },
    { name: "Mumbai", count: 534 },
    { name: "Delhi NCR", count: 456 },
    { name: "Hyderabad", count: 378 },
    { name: "Chennai", count: 289 },
    { name: "Pune", count: 198 },
    { name: "Kolkata", count: 145 },
    { name: "Ahmedabad", count: 89 },
    { name: "Kochi", count: 67 },
    { name: "Noida", count: 156 },
    { name: "Gurgaon", count: 234 },
    { name: "Coimbatore", count: 78 },
    { name: "Thiruvananthapuram", count: 45 },
    { name: "Bhubaneswar", count: 34 },
    { name: "Indore", count: 56 }
  ];

  const companies = [
    { name: "Google", count: 189, tier: "FAANG" },
    { name: "Microsoft", count: 176, tier: "FAANG" },
    { name: "Amazon", count: 167, tier: "FAANG" },
    { name: "Netflix", count: 89, tier: "FAANG" },
    { name: "Apple", count: 78, tier: "FAANG" },
    { name: "Meta", count: 134, tier: "FAANG" },
    { name: "Flipkart", count: 154, tier: "Unicorn" },
    { name: "Swiggy", count: 143, tier: "Unicorn" },
    { name: "Zomato", count: 128, tier: "Unicorn" },
    { name: "PhonePe", count: 112, tier: "Unicorn" },
    { name: "Paytm", count: 98, tier: "Unicorn" },
    { name: "Razorpay", count: 87, tier: "Unicorn" },
    { name: "CRED", count: 67, tier: "Unicorn" },
    { name: "Meesho", count: 78, tier: "Unicorn" },
    { name: "Goldman Sachs", count: 141, tier: "GCC" },
    { name: "JPMorgan", count: 135, tier: "GCC" },
    { name: "Deutsche Bank", count: 98, tier: "GCC" },
    { name: "Morgan Stanley", count: 87, tier: "GCC" },
    { name: "Barclays", count: 76, tier: "GCC" },
    { name: "Citibank", count: 89, tier: "GCC" },
    { name: "Accenture", count: 152, tier: "Others" },
    { name: "TCS", count: 247, tier: "Others" },
    { name: "Infosys", count: 198, tier: "Others" },
    { name: "Wipro", count: 167, tier: "Others" },
    { name: "HCL", count: 134, tier: "Others" },
    { name: "Cognizant", count: 123, tier: "Others" }
  ];

  const skills = [
    { name: "Product Strategy", count: 1892 },
    { name: "Data Analytics", count: 1743 },
    { name: "A/B Testing", count: 1534 },
    { name: "SQL", count: 1367 },
    { name: "User Research", count: 1245 },
    { name: "Agile/Scrum", count: 1123 },
    { name: "Figma", count: 934 },
    { name: "Python", count: 867 },
    { name: "Tableau", count: 756 },
    { name: "Market Research", count: 645 },
    { name: "Competitive Analysis", count: 567 },
    { name: "Roadmap Planning", count: 489 },
    { name: "Product Analytics", count: 445 },
    { name: "Customer Journey Mapping", count: 398 },
    { name: "Wireframing", count: 356 },
    { name: "Product Lifecycle", count: 334 },
    { name: "Go-to-Market", count: 298 },
    { name: "Feature Prioritization", count: 267 },
    { name: "Stakeholder Management", count: 234 },
    { name: "API Integration", count: 198 }
  ];

  const educationLevels = [
    { name: "BTech/BE", count: 1567 },
    { name: "MBA", count: 1023 },
    { name: "MTech/MS", count: 734 },
    { name: "BBA", count: 423 },
    { name: "BSc", count: 289 },
    { name: "PhD", count: 145 },
    { name: "MCA", count: 198 },
    { name: "BCA", count: 167 },
    { name: "Diploma", count: 134 },
    { name: "BCom", count: 89 }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-20 h-[calc(100vh-80px)] w-80 bg-white border-r border-slate-200 shadow-sm overflow-y-auto z-40">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-800">Advanced Filters</h2>
        </div>

        <div className="space-y-4">
          {/* Location Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('location')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  Location
                </div>
                {expandedSections.location ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.location && (
              <CardContent className="pt-0">
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSelectAll('location', locations)}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleClearAll('location')}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {locations.map((location) => (
                    <div key={location.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`loc-${location.name}`}
                          checked={selectedFilters.location.includes(location.name)}
                          onCheckedChange={() => toggleFilter('location', location.name)}
                        />
                        <label htmlFor={`loc-${location.name}`} className="text-sm cursor-pointer">{location.name}</label>
                      </div>
                      <Badge variant="outline" className="text-xs">{location.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Experience Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('experience')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Experience
                </div>
                {expandedSections.experience ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.experience && (
              <CardContent className="pt-0 space-y-4">
                <div>
                  <label className="text-sm text-slate-600 mb-2 block">Years: 0 - 15</label>
                  <Slider defaultValue={[2, 12]} max={15} min={0} step={1} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["0-2 years", "3-5 years", "6-8 years", "9-12 years", "13+ years"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`exp-${range}`} />
                      <label htmlFor={`exp-${range}`} className="text-xs cursor-pointer">{range}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Companies Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('companies')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  Companies
                </div>
                {expandedSections.companies ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.companies && (
              <CardContent className="pt-0">
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSelectAll('companies', companies)}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleClearAll('companies')}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {["FAANG", "Unicorn", "GCC", "Others"].map((tier) => (
                    <div key={tier}>
                      <h4 className="text-xs font-medium text-slate-700 mb-2">{tier}</h4>
                      <div className="space-y-1">
                        {companies.filter(c => c.tier === tier).map((company) => (
                          <div key={company.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`comp-${company.name}`}
                                checked={selectedFilters.companies.includes(company.name)}
                                onCheckedChange={() => toggleFilter('companies', company.name)}
                              />
                              <label htmlFor={`comp-${company.name}`} className="text-xs cursor-pointer">{company.name}</label>
                            </div>
                            <Badge variant="outline" className="text-xs">{company.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Skills Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('skills')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Skills
                </div>
                {expandedSections.skills ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.skills && (
              <CardContent className="pt-0">
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSelectAll('skills', skills)}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleClearAll('skills')}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`skill-${skill.name}`}
                          checked={selectedFilters.skills.includes(skill.name)}
                          onCheckedChange={() => toggleFilter('skills', skill.name)}
                        />
                        <label htmlFor={`skill-${skill.name}`} className="text-xs cursor-pointer">{skill.name}</label>
                      </div>
                      <Badge variant="outline" className="text-xs">{skill.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* CTC Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('ctc')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  CTC Range
                </div>
                {expandedSections.ctc ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.ctc && (
              <CardContent className="pt-0 space-y-4">
                <div>
                  <label className="text-sm text-slate-600 mb-2 block">₹5L - ₹100L</label>
                  <Slider defaultValue={[8, 50]} max={100} min={5} step={2} className="w-full" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {["5-10 LPA", "10-15 LPA", "15-25 LPA", "25-40 LPA", "40-60 LPA", "60+ LPA"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`ctc-${range}`} />
                      <label htmlFor={`ctc-${range}`} className="text-xs cursor-pointer">{range}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Education Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('education')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                  Education
                </div>
                {expandedSections.education ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.education && (
              <CardContent className="pt-0">
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSelectAll('education', educationLevels)}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleClearAll('education')}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {educationLevels.map((edu) => (
                    <div key={edu.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`edu-${edu.name}`}
                          checked={selectedFilters.education.includes(edu.name)}
                          onCheckedChange={() => toggleFilter('education', edu.name)}
                        />
                        <label htmlFor={`edu-${edu.name}`} className="text-xs cursor-pointer">{edu.name}</label>
                      </div>
                      <Badge variant="outline" className="text-xs">{edu.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Diversity Filter */}
          <Card>
            <CardHeader 
              className="pb-2 cursor-pointer" 
              onClick={() => toggleSection('diversity')}
            >
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-pink-600" />
                  Diversity
                </div>
                {expandedSections.diversity ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {expandedSections.diversity && (
              <CardContent className="pt-0">
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSelectAll('diversity', [
                      { name: "Female" }, { name: "Male" }, { name: "Differently Abled" }, { name: "LGBTQ+" }
                    ])}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleClearAll('diversity')}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Female", count: 1054 },
                    { name: "Male", count: 1793 },
                    { name: "Differently Abled", count: 89 },
                    { name: "LGBTQ+", count: 45 }
                  ].map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`div-${category.name}`}
                          checked={selectedFilters.diversity.includes(category.name)}
                          onCheckedChange={() => toggleFilter('diversity', category.name)}
                        />
                        <label htmlFor={`div-${category.name}`} className="text-xs cursor-pointer">{category.name}</label>
                      </div>
                      <Badge variant="outline" className="text-xs">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
