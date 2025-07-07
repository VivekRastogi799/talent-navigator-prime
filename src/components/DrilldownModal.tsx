
import { useState } from "react";
import { X, Users, Filter, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface DrilldownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  type: 'location' | 'company' | 'skill' | 'tier' | 'compensation';
  onViewCandidates: () => void;
}

export const DrilldownModal = ({ isOpen, onClose, title, data, type, onViewCandidates }: DrilldownModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getDrilldownData = () => {
    switch (type) {
      case 'location':
        return {
          overview: [
            { name: "Tech", count: 156, percentage: 45 },
            { name: "Finance", count: 89, percentage: 26 },
            { name: "Healthcare", count: 67, percentage: 19 },
            { name: "Others", count: 34, percentage: 10 }
          ],
          experience: [
            { range: "0-2 years", count: 45, ctc: "8-12L" },
            { range: "3-5 years", count: 123, ctc: "12-18L" },
            { range: "6-8 years", count: 98, ctc: "18-25L" },
            { range: "9+ years", count: 67, ctc: "25L+" }
          ],
          skills: [
            { skill: "Product Strategy", count: 234, growth: "+12%" },
            { skill: "Data Analytics", count: 189, growth: "+8%" },
            { skill: "A/B Testing", count: 156, growth: "+15%" }
          ]
        };
      case 'company':
        return {
          overview: [
            { name: "Product", count: 89, percentage: 65 },
            { name: "Engineering", count: 32, percentage: 23 },
            { name: "Design", count: 16, percentage: 12 }
          ],
          experience: [
            { range: "Junior", count: 23, ctc: "15-20L" },
            { range: "Mid", count: 45, ctc: "20-30L" },
            { range: "Senior", count: 21, ctc: "30L+" }
          ]
        };
      default:
        return { overview: [], experience: [], skills: [] };
    }
  };

  const drilldownData = getDrilldownData();
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            {title} - Detailed Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onViewCandidates} className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              View All Candidates
            </Button>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              <Filter className="h-4 w-4 mr-2" />
              Apply as Filter
            </Button>
          </div>

          {/* Tabs for different drill-down views */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience Split</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Department Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <Pie
                          data={drilldownData.overview}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="count"
                        >
                          {drilldownData.overview.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Count by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={drilldownData.overview}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Experience & Compensation Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {drilldownData.experience.map((exp, index) => (
                      <div key={exp.range} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                        <div>
                          <div className="font-medium">{exp.range}</div>
                          <div className="text-sm text-slate-600">{exp.count} candidates</div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {exp.ctc}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Skills Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drilldownData.skills?.map((skill, index) => (
                      <div key={skill.skill} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{skill.skill}</div>
                          <div className="text-sm text-slate-600">{skill.count} professionals</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {skill.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
