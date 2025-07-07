
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Filter, TrendingUp, Users } from "lucide-react";

interface LocationDistributionProps {
  locationData: { name: string; count: number; percentage: number }[];
  onLocationClick: (location: any) => void;
}

export const LocationDistribution = ({ locationData, onLocationClick }: LocationDistributionProps) => {
  const handleBarClick = (data: any) => {
    onLocationClick(data);
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const availabilityData = [
    { location: "Bangalore", immediate: 25, within30: 45, within60: 30 },
    { location: "Mumbai", immediate: 30, within30: 40, within60: 30 },
    { location: "Delhi NCR", immediate: 20, within30: 50, within60: 30 },
    { location: "Hyderabad", immediate: 35, within30: 35, within60: 30 },
    { location: "Chennai", immediate: 28, within30: 42, within60: 30 },
    { location: "Pune", immediate: 32, within30: 38, within60: 30 }
  ];

  return (
    <Card className="shadow-lg border-0 col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Geo Distribution & Availability Mapping
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-600">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="trends">Growth Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
              </div>
              
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                      onClick={handleBarClick}
                      className="cursor-pointer"
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} candidates`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="availability" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={availabilityData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="location" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="immediate" stackId="a" fill="#EF4444" name="Immediate" />
                <Bar dataKey="within30" stackId="a" fill="#F59E0B" name="Within 30 days" />
                <Bar dataKey="within60" stackId="a" fill="#10B981" name="Within 60 days" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Immediate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Within 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Within 60 days</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locationData.map((location, index) => (
                <div key={location.name} className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => handleBarClick(location)}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{location.name}</h4>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{location.count}</div>
                  <div className="text-sm text-slate-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {location.percentage}% of total
                  </div>
                  <div className="text-xs text-green-600 mt-1">+12% from last month</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
