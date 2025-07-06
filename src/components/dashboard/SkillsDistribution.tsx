
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillsDistributionProps {
  skillsData: { skill: string; count: number; size: number }[];
  onSkillClick: (skill: any) => void;
}

export const SkillsDistribution = ({ skillsData, onSkillClick }: SkillsDistributionProps) => {
  return (
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
              style={{ fontSize: `${skill.size}px`, padding: `${Math.max(4, skill.size / 4)}px ${Math.max(8, skill.size / 2)}px` }}
              onClick={() => onSkillClick(skill)}
            >
              {skill.skill} ({skill.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
