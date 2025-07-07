
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LocationDistributionProps {
  locationData: { 
    name: string; 
    count: number; 
    percentage: number; 
    active: number; 
    medianCtc: number; 
    medianExp: number; 
    female: number; 
  }[];
  onLocationClick: (location: any) => void;
}

export const LocationDistribution = ({ locationData, onLocationClick }: LocationDistributionProps) => {
  const handleBarClick = (data: any) => {
    onLocationClick(data);
  };

  const totalCandidates = locationData.reduce((sum, loc) => sum + loc.count, 0);
  const averageActive = Math.round(locationData.reduce((sum, loc) => sum + loc.active, 0) / locationData.length);
  const averageCtc = (locationData.reduce((sum, loc) => sum + loc.medianCtc, 0) / locationData.length).toFixed(1);
  const averageDiversity = Math.round(locationData.reduce((sum, loc) => sum + loc.female, 0) / locationData.length);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Geo Distribution & Availability Mapping
        </CardTitle>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalCandidates.toLocaleString()}</div>
            <div className="text-xs text-slate-600">Total Available</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{averageActive}%</div>
            <div className="text-xs text-slate-600">Avg Active %</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">₹{averageCtc}L</div>
            <div className="text-xs text-slate-600">Median CTC</div>
          </div>
          <div className="text-center p-3 bg-pink-50 rounded-lg">
            <div className="text-2xl font-bold text-pink-600">{averageDiversity}%</div>
            <div className="text-xs text-slate-600">Diversity %</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Candidate Distribution Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3">Candidate Distribution by Location</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value} candidates (${((value / totalCandidates) * 100).toFixed(1)}%)`,
                    'Count'
                  ]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                  onClick={handleBarClick}
                  className="cursor-pointer"
                  name="Candidates"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Location Metrics */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3">Location Insights</h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {locationData.map((location) => (
                <div 
                  key={location.name} 
                  className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                  onClick={() => handleBarClick(location)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-slate-800">{location.name}</h5>
                    <Badge variant="outline" className="text-xs">
                      {location.count} candidates
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-green-600">{location.active}%</div>
                      <div className="text-slate-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-purple-600">₹{location.medianCtc}L</div>
                      <div className="text-slate-500">Med CTC</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{location.medianExp}Y</div>
                      <div className="text-slate-500">Med Exp</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-pink-600">{location.female}%</div>
                      <div className="text-slate-500">Female</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
