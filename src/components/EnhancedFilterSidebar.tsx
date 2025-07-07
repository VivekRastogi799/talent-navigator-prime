
import { useState } from "react";
import { Filter, MapPin, Building2, DollarSign, Clock, GraduationCap, Users, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const locations = [
    { name: "Bangalore", count: 456 },
    { name: "Mumbai", count: 234 },
    { name: "Delhi NCR", count: 189 },
    { name: "Hyderabad", count: 167 },
    { name: "Chennai", count: 123 },
    { name: "Pune", count: 78 },
    { name: "Kolkata", count: 45 },
    { name: "Ahmedabad", count: 34 },
    { name: "Kochi", count: 28 },
    { name: "Noida", count: 67 }
  ];

  const companies = [
    { name: "Google", count: 89, tier: "FAANG" },
    { name: "Microsoft", count: 76, tier: "FAANG" },
    { name: "Amazon", count: 67, tier: "FAANG" },
    { name: "Netflix", count: 23, tier: "FAANG" },
    { name: "Apple", count: 18, tier: "FAANG" },
    { name: "Flipkart", count: 54, tier: "Unicorn" },
    { name: "Swiggy", count: 43, tier: "Unicorn" },
    { name: "Zomato", count: 38, tier: "Unicorn" },
    { name: "PhonePe", count: 32, tier: "Unicorn" },
    { name: "Paytm", count: 29, tier: "Unicorn" },
    { name: "Goldman Sachs", count: 41, tier: "GCC" },
    { name: "JPMorgan", count: 35, tier: "GCC" },
    { name: "Deutsche Bank", count: 28, tier: "GCC" },
    { name: "Accenture", count: 52, tier: "Others" },
    { name: "TCS", count: 47, tier: "Others" }
  ];

  const skills = [
    { name: "Product Strategy", count: 892 },
    { name: "Data Analytics", count: 743 },
    { name: "A/B Testing", count: 634 },
    { name: "SQL", count: 567 },
    { name: "User Research", count: 445 },
    { name: "Agile/Scrum", count: 423 },
    { name: "Figma", count: 334 },
    { name: "Python", count: 267 },
    { name: "Tableau", count: 234 },
    { name: "Market Research", count: 198 },
    { name: "Competitive Analysis", count: 167 },
    { name: "Roadmap Planning", count: 156 }
  ];

  const educationLevels = [
    { name: "BTech/BE", count: 567 },
    { name: "MBA", count: 423 },
    { name: "MTech/MS", count: 234 },
    { name: "BBA", count: 123 },
    { name: "BSc", count: 89 },
    { name: "PhD", count: 45 }
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
              <CardContent className="pt-0 space-y-2">
                {locations.slice(0, 6).map((location) => (
                  <div key={location.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`loc-${location.name}`} />
                      <label htmlFor={`loc-${location.name}`} className="text-sm">{location.name}</label>
                    </div>
                    <Badge variant="outline" className="text-xs">{location.count}</Badge>
                  </div>
                ))}
                <button className="text-xs text-blue-600 hover:underline">Show more</button>
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
                  <label className="text-sm text-slate-600 mb-2 block">Years: 2 - 12</label>
                  <Slider defaultValue={[2, 12]} max={15} min={0} step={1} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["0-2 years", "3-5 years", "6-8 years", "9+ years"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`exp-${range}`} />
                      <label htmlFor={`exp-${range}`} className="text-xs">{range}</label>
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
              <CardContent className="pt-0 space-y-3">
                {["FAANG", "Unicorn", "GCC", "Others"].map((tier) => (
                  <div key={tier}>
                    <h4 className="text-xs font-medium text-slate-700 mb-2">{tier}</h4>
                    <div className="space-y-1">
                      {companies.filter(c => c.tier === tier).slice(0, 3).map((company) => (
                        <div key={company.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`comp-${company.name}`} />
                            <label htmlFor={`comp-${company.name}`} className="text-xs">{company.name}</label>
                          </div>
                          <Badge variant="outline" className="text-xs">{company.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
                  <label className="text-sm text-slate-600 mb-2 block">₹8L - ₹50L</label>
                  <Slider defaultValue={[8, 50]} max={100} min={5} step={2} className="w-full" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {["8-15 LPA", "15-25 LPA", "25-40 LPA", "40+ LPA"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`ctc-${range}`} />
                      <label htmlFor={`ctc-${range}`} className="text-xs">{range}</label>
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
              <CardContent className="pt-0 space-y-2">
                {skills.slice(0, 6).map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`skill-${skill.name}`} />
                      <label htmlFor={`skill-${skill.name}`} className="text-xs">{skill.name}</label>
                    </div>
                    <Badge variant="outline" className="text-xs">{skill.count}</Badge>
                  </div>
                ))}
                <button className="text-xs text-blue-600 hover:underline">Show more</button>
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
              <CardContent className="pt-0 space-y-2">
                {educationLevels.map((edu) => (
                  <div key={edu.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`edu-${edu.name}`} />
                      <label htmlFor={`edu-${edu.name}`} className="text-xs">{edu.name}</label>
                    </div>
                    <Badge variant="outline" className="text-xs">{edu.count}</Badge>
                  </div>
                ))}
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
              <CardContent className="pt-0 space-y-2">
                {["Female", "Male", "Differently Abled", "LGBTQ+"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`div-${category}`} />
                    <label htmlFor={`div-${category}`} className="text-xs">{category}</label>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
