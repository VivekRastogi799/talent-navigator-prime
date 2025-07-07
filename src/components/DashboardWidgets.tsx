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

  const locationData = [
    { name: "Bangalore", count: 456, percentage: 36.6 },
    { name: "Mumbai", count: 234, percentage: 18.8 },
    { name: "Delhi NCR", count: 189, percentage: 15.2 },
    { name: "Hyderabad", count: 167, percentage: 13.4 },
    { name: "Chennai", count: 123, percentage: 9.9 },
    { name: "Pune", count: 78, percentage: 6.3 },
  ];

  const employerTierData = [
    { name: "FAANG", value: 28, color: "#3B82F6" },
    { name: "Unicorn", value: 35, color: "#10B981" },
    { name: "GCC", value: 22, color: "#F59E0B" },
    { name: "Others", value: 15, color: "#6366F1" },
  ];

  const compensationData = [
    { currentCtc: 12, expectedCtc: 18, candidates: 45, experience: 4 },
    { currentCtc: 18, expectedCtc: 25, candidates: 67, experience: 6 },
    { currentCtc: 25, expectedCtc: 35, candidates: 34, experience: 8 },
    { currentCtc: 35, expectedCtc: 45, candidates: 23, experience: 10 },
    { currentCtc: 45, expectedCtc: 60, candidates: 12, experience: 12 },
  ];

  const candidateIntentData = [
    { category: "Last Seen", activeCount: 234, passiveCount: 123 },
    { category: "Profile Views", activeCount: 189, passiveCount: 278 },
    { category: "Job Applications", activeCount: 156, passiveCount: 89 },
    { category: "Response Rate", activeCount: 98, passiveCount: 45 },
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

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geo + Availability Mapping */}
        <LocationDistribution locationData={locationData} onLocationClick={handleLocationClick} />

        {/* Pedigree & Brand Clusters */}
        <EmployerTierMapping tierData={employerTierData} onTierClick={handleTierClick} />

        {/* Top Companies */}
        <TopCompanies topCompanies={topCompanies} onCompanyClick={handleCompanyClick} />

        {/* Skills Distribution */}
        <SkillsDistribution skillsData={skillsData} onSkillClick={handleSkillClick} />

        {/* Notice Period Distribution */}
        <NoticePeriod noticePeriod={noticePeriod} />

        {/* Designation Split */}
        <DesignationSplit designationSplit={designationSplit} />
      </div>

      {/* Department/Industry & Intent Analysis */}
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
