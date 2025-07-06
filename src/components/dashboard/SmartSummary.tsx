
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SmartSummary = () => {
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
