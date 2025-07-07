
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface CandidateIntentProps {
  intentData: { category: string; activeCount: number; passiveCount: number }[];
  onIntentClick: (intent: any) => void;
}

export const CandidateIntent = ({ intentData, onIntentClick }: CandidateIntentProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Eye className="h-5 w-5 text-indigo-600" />
          Candidate Intent & Behaviour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={intentData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => [`${value} candidates`, name === 'activeCount' ? 'Active' : 'Passive']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar
              dataKey="activeCount"
              fill="#10B981"
              radius={[2, 2, 0, 0]}
              onClick={(data) => onIntentClick(data)}
              className="cursor-pointer"
            />
            <Bar
              dataKey="passiveCount"
              fill="#94A3B8"
              radius={[2, 2, 0, 0]}
              onClick={(data) => onIntentClick(data)}
              className="cursor-pointer"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-slate-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span className="text-sm text-slate-600">Passive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
