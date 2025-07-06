
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CtcVsExpProps {
  ctcVsExp: { experience: number; ctc: number; candidates: number }[];
  onChartClick: () => void;
}

export const CtcVsExp = ({ ctcVsExp, onChartClick }: CtcVsExpProps) => {
  const handleScatterClick = () => {
    onChartClick();
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">CTC vs Experience Analysis</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              View Detailed Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={ctcVsExp}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="experience"
              name="Experience"
              unit=" years"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="ctc"
              name="CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'candidates') return [`${value} candidates`, 'Count'];
                if (name === 'CTC') return [`₹${value}L`, 'CTC'];
                return [value, name];
              }}
              labelFormatter={(value) => `${value} years experience`}
            />
            <Scatter
              dataKey="candidates"
              fill="#3B82F6"
              onClick={handleScatterClick}
              className="cursor-pointer"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
