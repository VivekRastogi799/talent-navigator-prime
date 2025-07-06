
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Filter } from "lucide-react";

interface TopCompaniesProps {
  topCompanies: { name: string; count: number; percentage: number }[];
  onCompanyClick: (company: any) => void;
}

export const TopCompanies = ({ topCompanies, onCompanyClick }: TopCompaniesProps) => {
  const handleBarClick = (data: any) => {
    onCompanyClick(data);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Top Companies
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
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
  );
};
