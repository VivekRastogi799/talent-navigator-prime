import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, MapPin, Building, GraduationCap, Eye, Download, Filter } from "lucide-react";

interface DashboardWidgetsProps {
  onDrilldown: (title: string, data: any[], type: 'companies' | 'skills' | 'locations' | 'candidates') => void;
}

interface QuickStatsProps {
  totalProfiles: number;
  medianCTC: string;
  activePercent: number;
  femalePercent: number;
  avgAvailability: string;
  onChartClick: () => void;
}

const QuickStats = ({ totalProfiles, medianCTC, activePercent, femalePercent, avgAvailability, onChartClick }: QuickStatsProps) => {
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

interface TopCompaniesProps {
  topCompanies: { name: string; count: number; percentage: number }[];
  onCompanyClick: (company: any) => void;
}

const TopCompanies = ({ topCompanies, onCompanyClick }: TopCompaniesProps) => {
  const handleBarClick = (data: any) => {
    onCompanyClick(data);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Top Companies
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topCompanies}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => [`${value} candidates`, 'Count']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar
              dataKey="count"
              fill="#3B82F6"
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

interface SkillsDistributionProps {
  skillsData: { skill: string; count: number; size: number }[];
  onSkillClick: (skill: any) => void;
}

const SkillsDistribution = ({ skillsData, onSkillClick }: SkillsDistributionProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800">Skills Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {skillsData.map((skill) => (
            <Badge
              key={skill.skill}
              variant="outline"
              className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              style={{ fontSize: `${skill.size}px`, padding: `${Math.max(4, skill.size / 4)}px ${Math.max(8, skill.size / 2)}px` }}
              onClick={() => onSkillClick(skill)}
            >
              {skill.skill} ({skill.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface DesignationSplitProps {
  designationSplit: { name: string; value: number; color: string }[];
}

const DesignationSplit = ({ designationSplit }: DesignationSplitProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-purple-600" />
          Designation Split
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={designationSplit}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {designationSplit.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          {designationSplit.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface NoticePeriodProps {
  noticePeriod: { name: string; value: number; color: string }[];
}

const NoticePeriod = ({ noticePeriod }: NoticePeriodProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800">Notice Period Spread</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={noticePeriod}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              {noticePeriod.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {noticePeriod.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface CtcVsExpProps {
  ctcVsExp: { experience: number; ctc: number; candidates: number }[];
  onChartClick: () => void;
}

const CtcVsExp = ({ ctcVsExp, onChartClick }: CtcVsExpProps) => {
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
          <ScatterChart data={ctcVsExp}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="experience"
              name="Experience"
              unit=" years"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="ctc"
              name="CTC"
              unit=" LPA"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'candidates') return [`${value} candidates`, 'Count'];
                if (name === 'CTC') return [`₹${value}L`, 'CTC'];
                return [value, name];
              }}
              labelFormatter={(value) => `${value} years experience`}
            />
            <Scatter
              dataKey="candidates"
              fill="#3B82F6"
              onClick={handleScatterClick}
              className="cursor-pointer"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const SmartSummary = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Market Summary</h3>
            <p className="text-blue-100">Get intelligent insights and recommendations for your Product Manager hiring strategy</p>
          </div>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardWidgets = ({ onDrilldown }: DashboardWidgetsProps) => {
  const quickStats = {
    totalProfiles: 1247,
    medianCTC: "12.5L",
    activePercent: 68,
    femalePercent: 34,
    avgAvailability: "45 days"
  };

  const topCompanies = [
    { name: "Google", count: 89, percentage: 7.1 },
    { name: "Microsoft", count: 76, percentage: 6.1 },
    { name: "Amazon", count: 67, percentage: 5.4 },
    { name: "Flipkart", count: 54, percentage: 4.3 },
    { name: "Swiggy", count: 43, percentage: 3.4 },
  ];

  const designationSplit = [
    { name: "Senior PM", value: 42, color: "#3B82F6" },
    { name: "Product Manager", value: 38, color: "#10B981" },
    { name: "Associate PM", value: 20, color: "#F59E0B" },
  ];

  const skillsData = [
    { skill: "Product Strategy", count: 892, size: 24 },
    { skill: "Data Analytics", count: 743, size: 20 },
    { skill: "A/B Testing", count: 634, size: 18 },
    { skill: "SQL", count: 567, size: 16 },
    { skill: "User Research", count: 445, size: 14 },
    { skill: "Agile/Scrum", count: 423, size: 13 },
    { skill: "Figma", count: 334, size: 12 },
    { skill: "Python", count: 267, size: 11 },
  ];

  const noticePeriod = [
    { name: "Immediate", value: 12, color: "#EF4444" },
    { name: "15 days", value: 18, color: "#F97316" },
    { name: "1 month", value: 35, color: "#EAB308" },
    { name: "2 months", value: 25, color: "#22C55E" },
    { name: "3+ months", value: 10, color: "#6366F1" },
  ];

  const ctcVsExp = [
    { experience: 3, ctc: 8.5, candidates: 45 },
    { experience: 4, ctc: 10.2, candidates: 67 },
    { experience: 5, ctc: 12.8, candidates: 89 },
    { experience: 6, ctc: 15.1, candidates: 123 },
    { experience: 7, ctc: 17.5, candidates: 98 },
    { experience: 8, ctc: 20.2, candidates: 76 },
    { experience: 9, ctc: 23.1, candidates: 54 },
    { experience: 10, ctc: 26.8, candidates: 43 },
  ];

  const handleCompanyClick = (company: any) => {
    onDrilldown(`${company.name} Candidates`, [], 'candidates');
  };

  const handleSkillClick = (skill: any) => {
    onDrilldown(`${skill.skill} Candidates`, [], 'candidates');
  };

  const handleChartClick = () => {
    onDrilldown('Filtered Candidates', [], 'candidates');
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <QuickStats
        totalProfiles={quickStats.totalProfiles}
        medianCTC={quickStats.medianCTC}
        activePercent={quickStats.activePercent}
        femalePercent={quickStats.femalePercent}
        avgAvailability={quickStats.avgAvailability}
        onChartClick={handleChartClick}
      />

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <TopCompanies topCompanies={topCompanies} onCompanyClick={handleCompanyClick} />

        {/* Designation Split */}
        <DesignationSplit designationSplit={designationSplit} />

        {/* Skills Distribution */}
        <SkillsDistribution skillsData={skillsData} onSkillClick={handleSkillClick} />

        {/* Notice Period */}
        <NoticePeriod noticePeriod={noticePeriod} />
      </div>

      {/* CTC vs Experience - Full Width */}
      <CtcVsExp ctcVsExp={ctcVsExp} onChartClick={handleChartClick} />

      {/* Smart Summary Generator */}
      <SmartSummary />
    </div>
  );
};
