
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Circle, Download, Pause, Play } from "lucide-react";

const OTAUpdates = () => {
  const campaigns = [
    {
      id: "OTA001",
      name: "Battery Management System v2.3.1",
      description: "Improved charging efficiency and temperature management",
      version: "v2.3.1",
      currentVersion: "v2.2.8",
      status: "in_progress",
      progress: 65,
      totalVehicles: 120,
      completedVehicles: 78,
      failedVehicles: 3,
      createdDate: "2024-01-15",
      estimatedCompletion: "2024-01-20"
    },
    {
      id: "OTA002",
      name: "Vehicle Control Unit v1.8.2",
      description: "Enhanced regenerative braking and power distribution",
      version: "v1.8.2",
      currentVersion: "v1.8.1",
      status: "scheduled",
      progress: 0,
      totalVehicles: 85,
      completedVehicles: 0,
      failedVehicles: 0,
      createdDate: "2024-01-18",
      estimatedCompletion: "2024-01-25"
    },
    {
      id: "OTA003",
      name: "Infotainment System v3.1.0",
      description: "New dashboard interface and connectivity improvements",
      version: "v3.1.0",
      currentVersion: "v3.0.5",
      status: "completed",
      progress: 100,
      totalVehicles: 200,
      completedVehicles: 195,
      failedVehicles: 5,
      createdDate: "2024-01-05",
      estimatedCompletion: "2024-01-12"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "in_progress": return "text-blue-600 bg-blue-50 border-blue-200";
      case "scheduled": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "failed": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      case "scheduled": return "Scheduled";
      case "failed": return "Failed";
      default: return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          OTA Update Campaigns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-slate-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-slate-800">{campaign.name}</h3>
                    <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                      <Circle className="w-2 h-2 mr-1 fill-current" />
                      {getStatusText(campaign.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{campaign.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>From: <span className="font-medium">{campaign.currentVersion}</span></span>
                    <span>To: <span className="font-medium">{campaign.version}</span></span>
                    <span>Created: {campaign.createdDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {campaign.status === "in_progress" && (
                    <>
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    </>
                  )}
                  {campaign.status === "scheduled" && (
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Start Now
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Logs
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-medium text-slate-800">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{campaign.totalVehicles}</div>
                    <div className="text-xs text-slate-500">Total Vehicles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{campaign.completedVehicles}</div>
                    <div className="text-xs text-slate-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{campaign.failedVehicles}</div>
                    <div className="text-xs text-slate-500">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {campaign.totalVehicles - campaign.completedVehicles - campaign.failedVehicles}
                    </div>
                    <div className="text-xs text-slate-500">Pending</div>
                  </div>
                </div>
                
                {campaign.status !== "completed" && (
                  <div className="text-sm text-slate-500 mt-2">
                    Estimated completion: {campaign.estimatedCompletion}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OTAUpdates;
