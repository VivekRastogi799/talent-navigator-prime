
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CtcVsExpProps {
  ctcVsExp?: { experience: number; ctc: number; candidates: number }[];
  onChartClick: () => void;
}

export const CtcVsExp = ({ ctcVsExp = [], onChartClick }: CtcVsExpProps) => {
  const defaultData = [
    { experience: 2, ctc: 12, candidates: 45 },
    { experience: 3, ctc: 18, candidates: 67 },
    { experience: 4, ctc: 22, candidates: 52 },
    { experience: 5, ctc: 28, candidates: 41 },
    { experience: 6, ctc: 35, candidates: 38 },
    { experience: 7, ctc: 42, candidates: 29 },
    { experience: 8, ctc: 48, candidates: 23 },
    { experience: 10, ctc: 65, candidates: 18 },
    { experience: 12, ctc: 85, candidates: 12 }
  ];
  
  const data = ctcVsExp.length > 0 ? ctcVsExp : defaultData;
  
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
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="experience"
              name="Experience"
              unit=" years"
              tick={{ fontSize: 12 }}
              label={{ value: 'Years of Experience', position: 'insideBottom', offset: -5 }}
              domain={[0, 'dataMax + 1']}
            />
            <YAxis
              dataKey="ctc"
              name="CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
              label={{ value: 'CTC (LPA)', angle: -90, position: 'insideLeft' }}
              domain={[0, 'dataMax + 5']}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'candidates') return [`${value} candidates`, 'Count'];
                return [value, name];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  const data = payload[0].payload;
                  return `${data.experience} years exp → ₹${data.ctc}L CTC`;
                }
                return `${label} years experience`;
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
              fill="#3B82F6"
              onClick={handleScatterClick}
              className="cursor-pointer"
              r={6}
            />
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {Math.round(data.reduce((sum, d) => sum + d.experience, 0) / data.length * 10) / 10}
            </div>
            <div className="text-slate-600">Avg Experience</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              ₹{Math.round(data.reduce((sum, d) => sum + d.ctc, 0) / data.length)}L
            </div>
            <div className="text-slate-600">Avg CTC</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-600">
              {data.reduce((sum, d) => sum + d.candidates, 0)}
            </div>
            <div className="text-slate-600">Total Candidates</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
