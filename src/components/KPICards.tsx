
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Thermometer, TrendingUp, TrendingDown, Circle } from "lucide-react";

const KPICards = () => {
  const kpis = [
    {
      title: "Average SoC",
      value: "78%",
      progress: 78,
      trend: "up",
      change: "+2.5%",
      status: "good"
    },
    {
      title: "Average SoH",
      value: "94%",
      progress: 94,
      trend: "down",
      change: "-0.8%",
      status: "good"
    },
    {
      title: "Battery Temperature",
      value: "32°C",
      progress: 65,
      trend: "up",
      change: "+3°C",
      status: "warning"
    },
    {
      title: "Charging Status",
      value: "12 Active",
      progress: 30,
      trend: "up",
      change: "+4",
      status: "good"
    },
    {
      title: "Fleet Health",
      value: "98.5%",
      progress: 98.5,
      trend: "up",
      change: "+0.2%",
      status: "good"
    },
    {
      title: "Critical Alerts",
      value: "3",
      progress: 15,
      trend: "down",
      change: "-2",
      status: "critical"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-50 border-green-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className={`border ${getStatusColor(kpi.status)}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {kpi.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-800">
                {kpi.value}
              </span>
              <div className="flex items-center space-x-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-xs ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress 
                value={kpi.progress} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            
            <Badge 
              variant="outline" 
              className={`text-xs ${getStatusColor(kpi.status)}`}
            >
              <Circle className="w-2 h-2 mr-1 fill-current" />
              {kpi.status.charAt(0).toUpperCase() + kpi.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
