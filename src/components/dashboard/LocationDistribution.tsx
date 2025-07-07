
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Filter, TrendingUp, Users, DollarSign, Clock } from "lucide-react";

interface LocationDistributionProps {
  locationData: { name: string; count: number; percentage: number }[];
  onLocationClick: (location: any) => void;
}

export const LocationDistribution = ({ locationData, onLocationClick }: LocationDistributionProps) => {
  const handleBarClick = (data: any) => {
    onLocationClick(data);
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Enhanced availability data with horizontal layout in mind
  const availabilityData = [
    { location: "Bangalore", immediate: 45, within30: 35, within60: 20, totalActive: 456, activePercent: 72, medianCTC: "18.5L", medianExp: "5.2 years", femalePercent: 38 },
    { location: "Mumbai", immediate: 38, within30: 42, within60: 20, totalActive: 234, activePercent: 68, medianCTC: "22.3L", medianExp: "6.1 years", femalePercent: 35 },
    { location: "Delhi NCR", immediate: 32, within30: 48, within60: 20, totalActive: 189, activePercent: 65, medianCTC: "19.8L", medianExp: "5.8 years", femalePercent: 42 },
    { location: "Hyderabad", immediate: 52, within30: 28, within60: 20, totalActive: 167, activePercent: 75, medianCTC: "16.2L", medianExp: "4.9 years", femalePercent: 36 },
    { location: "Chennai", immediate: 41, within30: 39, within60: 20, totalActive: 123, activePercent: 69, medianCTC: "15.8L", medianExp: "5.3 years", femalePercent: 33 },
    { location: "Pune", immediate: 47, within30: 33, within60: 20, totalActive: 78, activePercent: 71, medianCTC: "17.1L", medianExp: "5.0 years", femalePercent: 40 }
  ];

  // Geography-based insights data
  const geoInsightsData = [
    { location: "Bangalore", tech: 65, fintech: 25, healthcare: 10, growth: "+15%" },
    { location: "Mumbai", tech: 45, fintech: 40, healthcare: 15, growth: "+12%" },
    { location: "Delhi NCR", tech: 55, fintech: 30, healthcare: 15, growth: "+8%" },
    { location: "Hyderabad", tech: 70, fintech: 20, healthcare: 10, growth: "+22%" },
    { location: "Chennai", tech: 60, fintech: 25, healthcare: 15, growth: "+10%" },
    { location: "Pune", tech: 58, fintech: 32, healthcare: 10, growth: "+18%" }
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="insights">Geo Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">1,247</div>
                <div className="text-sm text-blue-600">Total Candidates</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">68%</div>
                <div className="text-sm text-green-600">Active</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-700">₹18.2L</div>
                <div className="text-sm text-orange-600">Median CTC</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">5.4 yrs</div>
                <div className="text-sm text-purple-600">Median Exp</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData} layout="horizontal" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => [`${value} candidates`, 'Count']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar
                  dataKey="count"
                  fill="#10B981"
                  radius={[0, 4, 4, 0]}
                  onClick={handleBarClick}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="availability" className="space-y-4">
            <div className="space-y-4">
              {availabilityData.map((location) => (
                <div key={location.location} className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => handleBarClick(location)}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">{location.location}</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-blue-600" />
                        <span>{location.totalActive} active</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span>{location.medianCTC}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-orange-600" />
                        <span>{location.medianExp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-800">{location.activePercent}%</div>
                      <div className="text-xs text-slate-600">Active Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-800">{location.immediate}%</div>
                      <div className="text-xs text-slate-600">Immediate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-800">{location.within30}%</div>
                      <div className="text-xs text-slate-600">30 Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-800">{location.femalePercent}%</div>
                      <div className="text-xs text-slate-600">Female</div>
                    </div>
                  </div>

                  {/* Horizontal availability chart */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Availability Timeline</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full flex">
                        <div 
                          className="bg-red-500 rounded-l-full" 
                          style={{ width: `${location.immediate}%` }}
                        ></div>
                        <div 
                          className="bg-yellow-500" 
                          style={{ width: `${location.within30}%` }}
                        ></div>
                        <div 
                          className="bg-green-500 rounded-r-full" 
                          style={{ width: `${location.within60}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-6 text-sm mt-4">
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
          
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {geoInsightsData.map((location) => (
                <div key={location.location} className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => handleBarClick(location)}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{location.location}</h4>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {location.growth}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tech</span>
                      <span className="font-medium">{location.tech}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${location.tech}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Fintech</span>
                      <span className="font-medium">{location.fintech}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${location.fintech}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Healthcare</span>
                      <span className="font-medium">{location.healthcare}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${location.healthcare}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
