
import { useState } from "react";
import { ChevronDown, ChevronRight, MapPin, Building, GraduationCap, Briefcase, Clock, DollarSign, RotateCcw, Wrench, Calendar, Globe, Users, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  isOpen: boolean;
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, icon, children, defaultOpen = false }: FilterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  
  return (
    <Card className="mb-3">
      <CardHeader 
        className="pb-3 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-sm font-medium flex items-center justify-between text-slate-700">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 space-y-3">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export const FilterSidebar = ({ isOpen }: FilterSidebarProps) => {
  const [ctcRange, setCTCRange] = useState([800000, 1500000]);
  const [experienceRange, setExperienceRange] = useState([3, 10]);

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-20 w-80 h-[calc(100vh-80px)] bg-white border-r border-slate-200 shadow-sm overflow-y-auto z-10">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
            Clear All
          </Button>
        </div>

        <FilterSection title="Location" icon={<MapPin className="h-4 w-4 text-blue-600" />} defaultOpen>
          <div className="space-y-2">
            {["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai"].map((city) => (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox id={city.toLowerCase()} />
                <label htmlFor={city.toLowerCase()} className="text-sm text-slate-600 cursor-pointer">
                  {city}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Company" icon={<Building className="h-4 w-4 text-green-600" />}>
          <div className="space-y-2">
            {["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy"].map((company) => (
              <div key={company} className="flex items-center space-x-2">
                <Checkbox id={company.toLowerCase()} />
                <label htmlFor={company.toLowerCase()} className="text-sm text-slate-600 cursor-pointer">
                  {company}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Education" icon={<GraduationCap className="h-4 w-4 text-purple-600" />}>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Institute Tier</label>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-50">Tier 1</Badge>
                <Badge variant="outline" className="cursor-pointer border-slate-200 hover:bg-slate-50">Tier 2</Badge>
                <Badge variant="outline" className="cursor-pointer border-slate-200 hover:bg-slate-50">Tier 3</Badge>
              </div>
            </div>
            <div className="space-y-2">
              {["IIT", "IIM", "NIT", "Other Engineering", "Other MBA"].map((institute) => (
                <div key={institute} className="flex items-center space-x-2">
                  <Checkbox id={institute.toLowerCase().replace(/\s+/g, '-')} />
                  <label htmlFor={institute.toLowerCase().replace(/\s+/g, '-')} className="text-sm text-slate-600 cursor-pointer">
                    {institute}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Experience" icon={<Briefcase className="h-4 w-4 text-orange-600" />}>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-2 block">
                Years: {experienceRange[0]} - {experienceRange[1]}
              </label>
              <Slider
                value={experienceRange}
                onValueChange={setExperienceRange}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection title="CTC Range" icon={<DollarSign className="h-4 w-4 text-green-600" />}>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-2 block">
                ₹{(ctcRange[0] / 100000).toFixed(1)}L - ₹{(ctcRange[1] / 100000).toFixed(1)}L
              </label>
              <Slider
                value={ctcRange}
                onValueChange={setCTCRange}
                max={5000000}
                min={300000}
                step={100000}
                className="w-full"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Notice Period" icon={<Clock className="h-4 w-4 text-red-600" />}>
          <div className="space-y-2">
            {["Immediate", "15 days", "1 month", "2 months", "3+ months"].map((period) => (
              <div key={period} className="flex items-center space-x-2">
                <Checkbox id={period.toLowerCase().replace(/\s+/g, '-')} />
                <label htmlFor={period.toLowerCase().replace(/\s+/g, '-')} className="text-sm text-slate-600 cursor-pointer">
                  {period}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Skills" icon={<Wrench className="h-4 w-4 text-blue-600" />}>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {["SQL", "Python", "Product Analytics", "A/B Testing", "Agile", "Figma"].map((skill) => (
                <Badge key={skill} variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Diversity" icon={<Users className="h-4 w-4 text-pink-600" />}>
          <div className="space-y-2">
            {["Female candidates", "LGBTQ+ friendly", "Differently abled"].map((diversity) => (
              <div key={diversity} className="flex items-center space-x-2">
                <Checkbox id={diversity.toLowerCase().replace(/\s+/g, '-')} />
                <label htmlFor={diversity.toLowerCase().replace(/\s+/g, '-')} className="text-sm text-slate-600 cursor-pointer">
                  {diversity}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};
