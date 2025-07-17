
import { useState, useEffect } from "react";
import { Users, Activity, Target, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  suffix?: string;
}

const initialStats: StatItem[] = [
  { label: "Premium Profiles", value: "2.8M", icon: Users, color: "text-primary", suffix: "+" },
  { label: "Active Today", value: "14K", icon: Activity, color: "text-green-600", suffix: "" },
  { label: "AI Match Accuracy", value: "99", icon: Target, color: "text-violet-600", suffix: "%" },
  { label: "Success Rate", value: "87", icon: TrendingUp, color: "text-amber-600", suffix: "%" }
];

export const LiveTalentStats = () => {
  const [stats, setStats] = useState(initialStats);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.label === "Active Today" 
          ? `${Math.floor(Math.random() * 3 + 13)}K`
          : stat.label === "AI Match Accuracy"
          ? `${Math.floor(Math.random() * 2 + 98)}`
          : stat.label === "Success Rate"
          ? `${Math.floor(Math.random() * 5 + 85)}`
          : stat.value
      })));
      setAnimationKey(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="glass-card premium-shadow rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-slate-200"
        >
          <div className="flex items-center justify-center mb-3">
            <div className={`p-3 rounded-full bg-slate-50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div 
            key={`${index}-${animationKey}`}
            className="text-3xl font-bold text-slate-800 mb-2 animate-counter"
          >
            {stat.value}<span className="text-slate-800">{stat.suffix}</span>
          </div>
          <div className="text-sm text-slate-600 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
