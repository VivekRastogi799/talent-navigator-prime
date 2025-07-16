
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

interface CompensationIntelligenceProps {
  compensationData?: { currentCtc: number; expectedCtc: number; candidates: number; experience: number }[];
  onChartClick: () => void;
}

export const CompensationIntelligence = ({ compensationData = [], onChartClick }: CompensationIntelligenceProps) => {
  const defaultData = [
    { currentCtc: 15, expectedCtc: 22, candidates: 45, experience: 3.5 },
    { currentCtc: 22, expectedCtc: 32, candidates: 67, experience: 5.2 },
    { currentCtc: 32, expectedCtc: 45, candidates: 38, experience: 7.1 },
    { currentCtc: 45, expectedCtc: 65, candidates: 23, experience: 9.5 },
    { currentCtc: 18, expectedCtc: 28, candidates: 52, experience: 4.2 },
    { currentCtc: 28, expectedCtc: 38, candidates: 41, experience: 6.0 },
    { currentCtc: 38, expectedCtc: 55, candidates: 29, experience: 8.3 }
  ];
  
  const data = compensationData.length > 0 ? compensationData : defaultData;
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
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="currentCtc"
              name="Current CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
              label={{ value: 'Current CTC (LPA)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              dataKey="expectedCtc"
              name="Expected CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
              label={{ value: 'Expected CTC (LPA)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'candidates') return [`${value} candidates`, 'Candidate Count'];
                return [value, name];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  const data = payload[0].payload;
                  return `Current: ₹${data.currentCtc}L → Expected: ₹${data.expectedCtc}L`;
                }
                return label;
              }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Scatter
              dataKey="candidates"
              fill="#F97316"
              onClick={onChartClick}
              className="cursor-pointer"
              r={6}
            />
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-600">
              ₹{Math.round(data.reduce((sum, d) => sum + d.currentCtc, 0) / data.length)}L
            </div>
            <div className="text-slate-600">Avg Current CTC</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              ₹{Math.round(data.reduce((sum, d) => sum + d.expectedCtc, 0) / data.length)}L
            </div>
            <div className="text-slate-600">Avg Expected CTC</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              {Math.round(((data.reduce((sum, d) => sum + d.expectedCtc, 0) / data.length) / 
                          (data.reduce((sum, d) => sum + d.currentCtc, 0) / data.length) - 1) * 100)}%
            </div>
            <div className="text-slate-600">Expected Hike</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
