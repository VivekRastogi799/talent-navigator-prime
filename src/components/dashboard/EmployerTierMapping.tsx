
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, TrendingUp, Star, Award } from "lucide-react";

interface EmployerTierMappingProps {
  tierData: { name: string; value: number; color: string }[];
  onTierClick: (tier: any) => void;
}

export const EmployerTierMapping = ({ tierData, onTierClick }: EmployerTierMappingProps) => {
  const detailedTierData = [
    { name: "FAANG", value: 28, color: "#3B82F6", avgCtc: "35L", companies: 12, growth: "+15%" },
    { name: "Unicorn", value: 35, color: "#10B981", avgCtc: "28L", companies: 24, growth: "+22%" },
    { name: "GCC", value: 22, color: "#F59E0B", avgCtc: "22L", companies: 18, growth: "+8%" },
    { name: "Others", value: 15, color: "#6366F1", avgCtc: "18L", companies: 45, growth: "+5%" },
  ];

  const brandValueData = [
    { tier: "FAANG", brandValue: 95, retention: 88, satisfaction: 92 },
    { tier: "Unicorn", brandValue: 85, retention: 82, satisfaction: 87 },
    { tier: "GCC", brandValue: 75, retention: 78, satisfaction: 80 },
    { tier: "Others", brandValue: 65, retention: 70, satisfaction: 75 }
  ];

  return (
    <Card className="shadow-lg border-0 col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Building className="h-5 w-5 text-purple-600" />
          Employer Brand & Tier Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="metrics">Brand Metrics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={tierData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      onClick={(data) => onTierClick(data)}
                      className="cursor-pointer"
                    >
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {detailedTierData.map((tier) => (
                  <div 
                    key={tier.name} 
                    className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => onTierClick(tier)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: tier.color }}
                        ></div>
                        <span className="font-medium">{tier.name}</span>
                      </div>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {tier.growth}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                      <div>Avg CTC: {tier.avgCtc}</div>
                      <div>Companies: {tier.companies}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandValueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="tier" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="brandValue" fill="#3B82F6" name="Brand Value" />
                <Bar dataKey="retention" fill="#10B981" name="Retention %" />
                <Bar dataKey="satisfaction" fill="#F59E0B" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Brand Value</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Retention %</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Satisfaction %</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Premium Tier Insights</h4>
                </div>
                <p className="text-sm text-blue-700">
                  FAANG companies show highest brand value but lower candidate pool. 
                  Consider targeting Unicorns for balanced quality-quantity ratio.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Growth Opportunity</h4>
                </div>
                <p className="text-sm text-green-700">
                  Unicorn segment shows 22% growth, indicating strong talent migration 
                  from traditional companies to high-growth startups.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
