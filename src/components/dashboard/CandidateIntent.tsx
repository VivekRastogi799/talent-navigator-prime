
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Users, Download, Clock } from "lucide-react";

interface CandidateIntentProps {
  intentData: { category: string; activeCount: number; passiveCount: number }[];
  onIntentClick: (intent: any) => void;
}

export const CandidateIntent = ({ intentData, onIntentClick }: CandidateIntentProps) => {
  
  const lastUpdateData = [
    { period: "Last 7 days", count: 324, percentage: 26 },
    { period: "8-30 days", count: 456, percentage: 37 },
    { period: "1-3 months", count: 287, percentage: 23 },
    { period: "3+ months", count: 180, percentage: 14 }
  ];

  const recruiterViewsData = [
    { range: "0-5 views", active: 145, passive: 89 },
    { range: "5-10 views", active: 234, passive: 156 },
    { range: "10-20 views", active: 298, passive: 198 },
    { range: "20+ views", active: 167, passive: 234 }
  ];

  const activityData = [
    { activity: "Profile Updated", active: 567, passive: 234 },
    { activity: "Job Applications", active: 423, passive: 89 },
    { activity: "Recruiter Messages", active: 345, passive: 456 },
    { activity: "Skill Assessments", active: 234, passive: 67 }
  ];

  const colors = ['#10B981', '#94A3B8'];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Eye className="h-5 w-5 text-indigo-600" />
          Candidate Intent & Behaviour Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="updates">Profile Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="activity" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => [`${value} candidates`, name === 'active' ? 'Active' : 'Passive']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar
                  dataKey="active"
                  fill="#10B981"
                  radius={[2, 2, 0, 0]}
                  onClick={(data) => onIntentClick(data)}
                  className="cursor-pointer"
                  name="Active"
                />
                <Bar
                  dataKey="passive"
                  fill="#94A3B8"
                  radius={[2, 2, 0, 0]}
                  onClick={(data) => onIntentClick(data)}
                  className="cursor-pointer"
                  name="Passive"
                />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600">Active Candidates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                <span className="text-sm text-slate-600">Passive Candidates</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Recruiter Views/Downloads</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={recruiterViewsData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="active" fill="#10B981" name="Active" />
                    <Bar dataKey="passive" fill="#94A3B8" name="Passive" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Engagement Insights</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">High Engagement</span>
                    </div>
                    <p className="text-sm text-green-700">
                      465 candidates with 10+ recruiter views show strong market demand
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Download className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Download Rate</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      23% profile download rate indicates strong recruiter interest
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Response Rate</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Active candidates show 67% higher response rates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="updates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={lastUpdateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      onClick={(data) => onIntentClick(data)}
                      className="cursor-pointer"
                    >
                      {lastUpdateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} candidates`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Last Profile Update</h4>
                {lastUpdateData.map((item, index) => (
                  <div 
                    key={item.period}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                    onClick={() => onIntentClick(item)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index] }}
                      ></div>
                      <span className="text-sm">{item.period}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.count}</div>
                      <div className="text-xs text-slate-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
