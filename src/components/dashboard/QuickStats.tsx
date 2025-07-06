
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, Eye } from "lucide-react";

interface QuickStatsProps {
  totalProfiles: number;
  medianCTC: string;
  activePercent: number;
  femalePercent: number;
  avgAvailability: string;
  onChartClick: () => void;
}

export const QuickStats = ({ totalProfiles, medianCTC, activePercent, femalePercent, avgAvailability, onChartClick }: QuickStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={onChartClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Profiles</p>
              <p className="text-2xl font-bold">{totalProfiles.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={onChartClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Median CTC</p>
              <p className="text-2xl font-bold">₹{medianCTC}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={onChartClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Active %</p>
              <p className="text-2xl font-bold">{activePercent}%</p>
            </div>
            <Eye className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={onChartClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Female %</p>
              <p className="text-2xl font-bold">{femalePercent}%</p>
            </div>
            <Users className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={onChartClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Avg Availability</p>
              <p className="text-2xl font-bold">{avgAvailability}</p>
            </div>
            <MapPin className="h-8 w-8 text-indigo-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
