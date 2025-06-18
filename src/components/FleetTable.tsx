
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FleetTable = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const vehicles = [
    {
      id: "EV001",
      vin: "1HGBH41JXMN109186",
      lastSeen: "2 min ago",
      soc: 85,
      soh: 94,
      charging: "Charging",
      faultCode: "None",
      status: "good",
      details: {
        voltage: 400,
        current: -15,
        temperature: 32,
        location: "Charging Station A",
        mileage: "45,230 mi"
      }
    },
    {
      id: "EV002",
      vin: "1HGBH41JXMN109187",
      lastSeen: "5 min ago",
      soc: 45,
      soh: 92,
      charging: "Not Charging",
      faultCode: "None",
      status: "warning",
      details: {
        voltage: 385,
        current: 25,
        temperature: 35,
        location: "Downtown Route",
        mileage: "38,450 mi"
      }
    },
    {
      id: "EV003",
      vin: "1HGBH41JXMN109188",
      lastSeen: "1 min ago",
      soc: 23,
      soh: 89,
      charging: "Not Charging",
      faultCode: "BMS_LOW_SOC",
      status: "critical",
      details: {
        voltage: 370,
        current: 18,
        temperature: 38,
        location: "Highway 101",
        mileage: "52,100 mi"
      }
    },
    {
      id: "EV004",
      vin: "1HGBH41JXMN109189",
      lastSeen: "3 min ago",
      soc: 78,
      soh: 96,
      charging: "Fast Charging",
      faultCode: "None",
      status: "good",
      details: {
        voltage: 420,
        current: -45,
        temperature: 30,
        location: "Charging Station B",
        mileage: "31,890 mi"
      }
    },
    {
      id: "EV005",
      vin: "1HGBH41JXMN109190",
      lastSeen: "8 min ago",
      soc: 67,
      soh: 91,
      charging: "Not Charging",
      faultCode: "TEMP_WARNING",
      status: "warning",
      details: {
        voltage: 390,
        current: 22,
        temperature: 42,
        location: "City Center",
        mileage: "47,650 mi"
      }
    }
  ];

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-50 border-green-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Fleet Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Vehicle</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">VIN</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Last Seen</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">SoC</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">SoH</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Charging</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <>
                  <tr key={vehicle.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-800">{vehicle.id}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-sm">{vehicle.vin}</td>
                    <td className="py-3 px-4 text-slate-600">{vehicle.lastSeen}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Progress value={vehicle.soc} className="w-16 h-2" />
                        <span className="text-sm text-slate-700">{vehicle.soc}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Progress value={vehicle.soh} className="w-16 h-2" />
                        <span className="text-sm text-slate-700">{vehicle.soh}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {vehicle.charging}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusColor(vehicle.status)}`}>
                        <Circle className="w-2 h-2 mr-1 fill-current" />
                        {vehicle.faultCode === "None" ? "OK" : vehicle.faultCode}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRow(vehicle.id)}
                        className="p-1"
                      >
                        {expandedRows.includes(vehicle.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                  
                  {expandedRows.includes(vehicle.id) && (
                    <tr className="bg-slate-50">
                      <td colSpan={8} className="py-4 px-4">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-600">Voltage:</span>
                            <div className="text-slate-800">{vehicle.details.voltage}V</div>
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">Current:</span>
                            <div className="text-slate-800">{vehicle.details.current}A</div>
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">Temperature:</span>
                            <div className="text-slate-800">{vehicle.details.temperature}°C</div>
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">Location:</span>
                            <div className="text-slate-800">{vehicle.details.location}</div>
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">Mileage:</span>
                            <div className="text-slate-800">{vehicle.details.mileage}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FleetTable;
