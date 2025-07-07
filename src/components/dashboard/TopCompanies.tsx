
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopCompaniesProps {
  topCompanies: { name: string; count: number; percentage: number }[];
  onCompanyClick: (company: any) => void;
}

export const TopCompanies = ({ topCompanies, onCompanyClick }: TopCompaniesProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const handleBarClick = (data: any) => {
    setSelectedCompany(data);
    setDropdownOpen(true);
  };

  const handleViewCandidates = () => {
    if (selectedCompany) {
      onCompanyClick(selectedCompany);
    }
    setDropdownOpen(false);
  };

  const availableDrilldowns = [
    { label: "Location", value: "location" },
    { label: "Experience", value: "experience" },
    { label: "Skills", value: "skills" },
    { label: "CTC Range", value: "ctc" },
    { label: "Notice Period", value: "notice" }
  ];

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Top Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topCompanies}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => [`${value} candidates`, 'Count']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar
                dataKey="count"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                onClick={handleBarClick}
                className="cursor-pointer"
              />
            </BarChart>
          </ResponsiveContainer>
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
