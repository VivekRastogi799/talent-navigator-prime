
import { FileText, TrendingUp, Target, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CustomReportFooter = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Section - Main CTA */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-blue-200" />
              <h2 className="text-2xl font-bold">Need Deeper Insights?</h2>
            </div>
            <p className="text-lg text-blue-100 mb-6">
              Unlock strategic planning with custom reports tailored to your specific hiring needs. 
              Get comprehensive market analysis, compensation benchmarks, and talent pipeline insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-300" />
                <span className="text-sm text-blue-100">Market Trends Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-blue-300" />
                <span className="text-sm text-blue-100">Targeted Talent Mapping</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-300" />
                <span className="text-sm text-blue-100">Custom Dashboards</span>
              </div>
            </div>
            
            <div className="text-sm text-blue-200">
              ✓ Personalized insights based on your industry & requirements
              <br />
              ✓ Competitive intelligence & salary benchmarking
              <br />
              ✓ Expert consultation & strategic recommendations
            </div>
          </div>
          
          {/* Right Section - CTA Button */}
          <div className="flex flex-col items-center lg:items-end">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg shadow-lg"
            >
              Request Custom Report
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-xs text-blue-200 mt-3 text-center lg:text-right">
              Get your personalized report in 24-48 hours
              <br />
              Starting at ₹25,000 per report
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
