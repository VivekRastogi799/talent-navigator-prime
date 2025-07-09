
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SkillsDistributionProps {
  skillsData: { skill: string; count: number; size: number }[];
  onSkillClick: (skill: any) => void;
}

export const SkillsDistribution = ({ skillsData, onSkillClick }: SkillsDistributionProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
    setDropdownOpen(true);
  };

  const handleViewCandidates = () => {
    if (selectedSkill) {
      onSkillClick(selectedSkill);
    }
    setDropdownOpen(false);
  };

  const availableDrilldowns = [
    { label: "Location", value: "location" },
    { label: "Experience", value: "experience" },
    { label: "Company", value: "company" },
    { label: "CTC Range", value: "ctc" }
  ];

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-800">Skills Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {skillsData.map((skill) => (
              <Badge
                key={skill.skill}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                style={{ fontSize: `${Math.max(skill.size, 12)}px`, padding: `${Math.max(4, skill.size / 4)}px ${Math.max(8, skill.size / 2)}px` }}
                onClick={() => handleSkillClick(skill)}
              >
                {skill.skill} ({skill.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={handleViewCandidates} className="font-medium">
            View Candidates
          </DropdownMenuItem>
          <div className="px-2 py-1 text-xs text-slate-500">Drilldown by:</div>
          {availableDrilldowns.map((drill) => (
            <DropdownMenuItem key={drill.value} onClick={() => setDropdownOpen(false)}>
              {drill.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
