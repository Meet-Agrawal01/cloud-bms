
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Circle, Search, CheckCircle } from "lucide-react";

const AlertCenter = () => {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);

  const alerts = [
    {
      id: "ALT001",
      severity: "critical",
      message: "Battery temperature critical on EV003",
      vehicle: "EV003",
      timestamp: "2 min ago",
      code: "BMS_TEMP_CRITICAL",
      description: "Battery temperature exceeded 45°C threshold"
    },
    {
      id: "ALT002",
      severity: "critical",
      message: "Low SoC warning on EV002",
      vehicle: "EV002",
      timestamp: "5 min ago",
      code: "BMS_LOW_SOC",
      description: "State of charge droppe below 20%"
    },
    {
      id: "ALT003",
      severity: "warning",
      message: "Charging efficiency reduced on EV001",
      vehicle: "EV001",
      timestamp: "15 min ago",
      code: "CHG_EFF_REDUCED",
      description: "Charging efficiency is 15% below normal"
    },
    {
      id: "ALT004",
      severity: "info",
      message: "Scheduled maintenance due for EV004",
      vehicle: "EV004",
      timestamp: "1 hour ago",
      code: "MAINT_SCHEDULED",
      description: "Vehicle due for 50,000 mile service"
    },
    {
      id: "ALT005",
      severity: "warning",
      message: "High cell voltage variance on EV005",
      vehicle: "EV005",
      timestamp: "2 hours ago",
      code: "CELL_VARIANCE",
      description: "Cell voltage variance exceeds 50mV"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "info": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const acknowledgeAlert = (alertId: string) => {
    setAcknowledgedAlerts(prev => [...prev, alertId]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Alert Center
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
                acknowledgedAlerts.includes(alert.id) ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                      <Circle className="w-2 h-2 mr-1 fill-current" />
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-slate-500">{alert.code}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500">{alert.timestamp}</span>
                  </div>
                  
                  <h3 className="font-medium text-slate-800 mb-1">{alert.message}</h3>
                  <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>Vehicle: <span className="font-medium text-slate-700">{alert.vehicle}</span></span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {acknowledgedAlerts.includes(alert.id) ? (
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Acknowledged
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No alerts match your current filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCenter;
