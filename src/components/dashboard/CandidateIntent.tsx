
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, Download, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CandidateIntentProps {
  intentData: {
    category: string;
    ranges: { range: string; active: number; passive: number }[];
  }[];
  onIntentClick: (intent: any) => void;
}

export const CandidateIntent = ({ intentData, onIntentClick }: CandidateIntentProps) => {
  const handleBarClick = (data: any) => {
    onIntentClick(data);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "Last Profile Update": return <Clock className="h-4 w-4 text-blue-600" />;
      case "Recruiter Views": return <Eye className="h-4 w-4 text-green-600" />;
      case "Profile Downloads": return <Download className="h-4 w-4 text-purple-600" />;
      default: return <Activity className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-600" />
          Candidate Intent & Behaviour
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {intentData.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-2 mb-3">
                {getIcon(category.category)}
                <h4 className="text-sm font-medium text-slate-700">{category.category}</h4>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={category.ranges} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="range" 
                    tick={{ fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `${value} candidates`,
                      name === 'active' ? 'Active Candidates' : 'Passive Candidates'
                    ]}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar
                    dataKey="active"
                    fill="#22C55E"
                    radius={[2, 2, 0, 0]}
                    onClick={handleBarClick}
                    className="cursor-pointer"
                    name="Active"
                  />
                  <Bar
                    dataKey="passive"
                    fill="#94A3B8"
                    radius={[2, 2, 0, 0]}
                    onClick={handleBarClick}
                    className="cursor-pointer"
                    name="Passive"
                  />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Summary for this category */}
              <div className="flex gap-4 mt-2">
                <Badge variant="outline" className="text-xs bg-green-50">
                  Active: {category.ranges.reduce((sum, r) => sum + r.active, 0)}
                </Badge>
                <Badge variant="outline" className="text-xs bg-slate-50">
                  Passive: {category.ranges.reduce((sum, r) => sum + r.passive, 0)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
