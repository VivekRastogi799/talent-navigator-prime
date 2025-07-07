
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";

interface LocationDistributionProps {
  locationData: { name: string; count: number; percentage: number }[];
  onLocationClick: (location: any) => void;
}

export const LocationDistribution = ({ locationData, onLocationClick }: LocationDistributionProps) => {
  const handleBarClick = (data: any) => {
    onLocationClick(data);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Geo + Availability Mapping
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-600">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={locationData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => [`${value} candidates`, 'Count']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar
              dataKey="count"
              fill="#10B981"
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
