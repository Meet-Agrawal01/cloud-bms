
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Circle } from "lucide-react";

const FleetMap = () => {
  const vehicles = [
    { id: "EV001", lat: 40.7589, lng: -73.9851, soc: 85, status: "charging", name: "Vehicle 1" },
    { id: "EV002", lat: 40.7505, lng: -73.9934, soc: 45, status: "driving", name: "Vehicle 2" },
    { id: "EV003", lat: 40.7614, lng: -73.9776, soc: 78, status: "parked", name: "Vehicle 3" },
    { id: "EV004", lat: 40.7549, lng: -73.9840, soc: 92, status: "charging", name: "Vehicle 4" },
    { id: "EV005", lat: 40.7580, lng: -73.9855, soc: 23, status: "critical", name: "Vehicle 5" },
  ];

  const getStatusColor = (status: string, soc: number) => {
    if (status === "critical" || soc < 30) return "bg-red-500";
    if (soc < 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "charging": return "Charging";
      case "driving": return "Driving";
      case "parked": return "Parked";
      case "critical": return "Critical";
      default: return "Unknown";
    }
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Fleet Map View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-slate-100 rounded-lg overflow-hidden">
          {/* Simulated map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <path d="M0,150 Q100,50 200,150 T400,150" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M0,100 Q150,200 300,100 T400,100" stroke="#94a3b8" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
          
          {/* Vehicle markers */}
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${((vehicle.lng + 74) * 100) % 100}%`,
                top: `${((vehicle.lat - 40.75) * 1000) % 100}%`
              }}
            >
              <div className={`w-4 h-4 rounded-full ${getStatusColor(vehicle.status, vehicle.soc)} border-2 border-white shadow-lg transition-transform group-hover:scale-125`}>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="text-sm font-medium text-slate-800">{vehicle.name}</div>
                <div className="text-xs text-slate-600">SoC: {vehicle.soc}%</div>
                <div className="text-xs text-slate-600">{getStatusText(vehicle.status)}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <Circle className="w-3 h-3 text-green-500 fill-current" />
            <span className="text-slate-600">Good (&gt;50%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Circle className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-slate-600">Warning (30-50%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Circle className="w-3 h-3 text-red-500 fill-current" />
            <span className="text-slate-600">Critical (&lt;30%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FleetMap;
