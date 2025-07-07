
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

interface CompensationIntelligenceProps {
  compensationData: { currentCtc: number; expectedCtc: number; candidates: number; experience: number }[];
  onChartClick: () => void;
}

export const CompensationIntelligence = ({ compensationData, onChartClick }: CompensationIntelligenceProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Compensation Intelligence
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={compensationData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="currentCtc"
              name="Current CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="expectedCtc"
              name="Expected CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'candidates') return [`${value} candidates`, 'Count'];
                if (name === 'Current CTC') return [`₹${value}L`, 'Current CTC'];
                if (name === 'Expected CTC') return [`₹${value}L`, 'Expected CTC'];
                return [value, name];
              }}
            />
            <Scatter
              dataKey="candidates"
              fill="#F97316"
              onClick={onChartClick}
              className="cursor-pointer"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
