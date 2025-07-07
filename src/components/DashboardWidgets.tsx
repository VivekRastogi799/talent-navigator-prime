import { QuickStats } from "@/components/dashboard/QuickStats";
import { TopCompanies } from "@/components/dashboard/TopCompanies";
import { SkillsDistribution } from "@/components/dashboard/SkillsDistribution";
import { DesignationSplit } from "@/components/dashboard/DesignationSplit";
import { NoticePeriod } from "@/components/dashboard/NoticePeriod";
import { CtcVsExp } from "@/components/dashboard/CtcVsExp";
import { SmartSummary } from "@/components/dashboard/SmartSummary";
import { LocationDistribution } from "@/components/dashboard/LocationDistribution";
import { EmployerTierMapping } from "@/components/dashboard/EmployerTierMapping";
import { CompensationIntelligence } from "@/components/dashboard/CompensationIntelligence";
import { CandidateIntent } from "@/components/dashboard/CandidateIntent";

interface DashboardWidgetsProps {
  onDrilldown: (title: string, data: any[], type: 'companies' | 'skills' | 'locations' | 'candidates') => void;
}

export const DashboardWidgets = ({ onDrilldown }: DashboardWidgetsProps) => {
  const quickStats = {
    totalProfiles: 2847,
    medianCTC: "18.2L",
    activePercent: 72,
    femalePercent: 37,
    avgAvailability: "42 days"
  };

  const topCompanies = [
    { name: "Google", count: 156, percentage: 5.5 },
    { name: "Microsoft", count: 142, percentage: 5.0 },
    { name: "Amazon", count: 134, percentage: 4.7 },
    { name: "Meta", count: 98, percentage: 3.4 },
    { name: "Netflix", count: 67, percentage: 2.4 },
    { name: "Apple", count: 54, percentage: 1.9 },
    { name: "Flipkart", count: 145, percentage: 5.1 },
    { name: "Swiggy", count: 123, percentage: 4.3 },
    { name: "Zomato", count: 98, percentage: 3.4 },
    { name: "PhonePe", count: 87, percentage: 3.1 },
  ];

  const designationSplit = [
    { name: "Senior PM", value: 45, color: "#3B82F6" },
    { name: "Product Manager", value: 35, color: "#10B981" },
    { name: "Associate PM", value: 20, color: "#F59E0B" },
  ];

  const skillsData = [
    { skill: "Product Strategy", count: 1892, size: 28 },
    { skill: "Data Analytics", count: 1743, size: 26 },
    { skill: "A/B Testing", count: 1534, size: 24 },
    { skill: "SQL", count: 1367, size: 22 },
    { skill: "User Research", count: 1245, size: 20 },
    { skill: "Agile/Scrum", count: 1123, size: 18 },
    { skill: "Figma", count: 934, size: 16 },
    { skill: "Python", count: 867, size: 14 },
    { skill: "Tableau", count: 756, size: 12 },
    { skill: "Market Research", count: 645, size: 11 },
    { skill: "Competitive Analysis", count: 567, size: 10 },
    { skill: "Roadmap Planning", count: 489, size: 9 },
  ];

  const noticePeriod = [
    { name: "Immediate", value: 15, color: "#EF4444" },
    { name: "15 days", value: 22, color: "#F97316" },
    { name: "1 month", value: 32, color: "#EAB308" },
    { name: "2 months", value: 21, color: "#22C55E" },
    { name: "3+ months", value: 10, color: "#6366F1" },
  ];

  const ctcVsExp = [
    { experience: 2, ctc: 6.5, candidates: 67 },
    { experience: 3, ctc: 8.5, candidates: 89 },
    { experience: 4, ctc: 11.2, candidates: 156 },
    { experience: 5, ctc: 13.8, candidates: 234 },
    { experience: 6, ctc: 16.1, candidates: 298 },
    { experience: 7, ctc: 18.5, candidates: 345 },
    { experience: 8, ctc: 21.2, candidates: 287 },
    { experience: 9, ctc: 24.1, candidates: 198 },
    { experience: 10, ctc: 27.8, candidates: 156 },
    { experience: 11, ctc: 31.2, candidates: 123 },
    { experience: 12, ctc: 35.5, candidates: 89 },
  ];

  const locationData = [
    { name: "Bangalore", count: 856, percentage: 30.1 },
    { name: "Mumbai", count: 534, percentage: 18.8 },
    { name: "Delhi NCR", count: 456, percentage: 16.0 },
    { name: "Hyderabad", count: 378, percentage: 13.3 },
    { name: "Chennai", count: 289, percentage: 10.2 },
    { name: "Pune", count: 198, percentage: 7.0 },
    { name: "Kolkata", count: 89, percentage: 3.1 },
    { name: "Ahmedabad", count: 47, percentage: 1.7 },
  ];

  const employerTierData = [
    { name: "FAANG", value: 32, color: "#3B82F6" },
    { name: "Unicorn", value: 28, color: "#10B981" },
    { name: "GCC", value: 25, color: "#F59E0B" },
    { name: "Others", value: 15, color: "#6366F1" },
  ];

  const compensationData = [
    { currentCtc: 8, expectedCtc: 12, candidates: 89, experience: 3 },
    { currentCtc: 12, expectedCtc: 18, candidates: 156, experience: 4 },
    { currentCtc: 16, expectedCtc: 22, candidates: 234, experience: 5 },
    { currentCtc: 20, expectedCtc: 28, candidates: 198, experience: 6 },
    { currentCtc: 25, expectedCtc: 35, candidates: 145, experience: 7 },
    { currentCtc: 30, expectedCtc: 42, candidates: 98, experience: 8 },
    { currentCtc: 35, expectedCtc: 50, candidates: 67, experience: 9 },
    { currentCtc: 40, expectedCtc: 60, candidates: 45, experience: 10 },
  ];

  const candidateIntentData = [
    { category: "Last Seen", activeCount: 534, passiveCount: 323 },
    { category: "Profile Views", activeCount: 456, passiveCount: 578 },
    { category: "Job Applications", activeCount: 356, passiveCount: 189 },
    { category: "Response Rate", activeCount: 298, passiveCount: 145 },
  ];

  const handleCompanyClick = (company: any) => {
    onDrilldown(`${company.name} Candidates`, [], 'candidates');
  };

  const handleSkillClick = (skill: any) => {
    onDrilldown(`${skill.skill} Candidates`, [], 'candidates');
  };

  const handleLocationClick = (location: any) => {
    onDrilldown(`${location.name} Candidates`, [], 'candidates');
  };

  const handleTierClick = (tier: any) => {
    onDrilldown(`${tier.name} Companies Candidates`, [], 'candidates');
  };

  const handleIntentClick = (intent: any) => {
    onDrilldown(`${intent.category} Candidates`, [], 'candidates');
  };

  const handleChartClick = () => {
    onDrilldown('Filtered Candidates', [], 'candidates');
  };

  return (
    <div className="space-y-6">
      {/* Market Landscape - Quick Stats */}
      <QuickStats
        totalProfiles={quickStats.totalProfiles}
        medianCTC={quickStats.medianCTC}
        activePercent={quickStats.activePercent}
        femalePercent={quickStats.femalePercent}
        avgAvailability={quickStats.avgAvailability}
        onChartClick={handleChartClick}
      />

      {/* Enhanced Geo & Brand Analysis - Full Width */}
      <div className="grid grid-cols-1 gap-6">
        {/* Geo + Availability Mapping - Enhanced */}
        <LocationDistribution locationData={locationData} onLocationClick={handleLocationClick} />

        {/* Pedigree & Brand Clusters - Enhanced */}
        <EmployerTierMapping tierData={employerTierData} onTierClick={handleTierClick} />
      </div>

      {/* Company & Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <TopCompanies topCompanies={topCompanies} onCompanyClick={handleCompanyClick} />

        {/* Skills Distribution */}
        <SkillsDistribution skillsData={skillsData} onSkillClick={handleSkillClick} />
      </div>

      {/* Workforce Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notice Period Distribution */}
        <NoticePeriod noticePeriod={noticePeriod} />

        {/* Designation Split */}
        <DesignationSplit designationSplit={designationSplit} />
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Intent & Behaviour */}
        <CandidateIntent intentData={candidateIntentData} onIntentClick={handleIntentClick} />

        {/* CTC vs Experience Analysis */}
        <CtcVsExp ctcVsExp={ctcVsExp} onChartClick={handleChartClick} />
      </div>

      {/* Compensation Intelligence - Full Width */}
      <CompensationIntelligence compensationData={compensationData} onChartClick={handleChartClick} />

      {/* Smart Summary Generator */}
      <SmartSummary />
    </div>
  );
};
