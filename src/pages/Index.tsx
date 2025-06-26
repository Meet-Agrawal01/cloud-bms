
import { useState } from "react";
import Navbar from "../components/Navbar";
import KPICards from "../components/KPICards";
import TimeSeriesCharts from "../components/TimeSeriesCharts";
import FleetMap from "../components/FleetMap";
import FleetTable from "../components/FleetTable";
import AlertCenter from "../components/AlertCenter";
import OTAUpdates from "../components/OTAUpdates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedFleet, setSelectedFleet] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        selectedFleet={selectedFleet} 
        onFleetChange={setSelectedFleet} 
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Summary</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Details</TabsTrigger>
            <TabsTrigger value="alerts">Alert Center</TabsTrigger>
            <TabsTrigger value="ota">OTA Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <KPICards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TimeSeriesCharts />
              <FleetMap />
            </div>
          </TabsContent>
          
          <TabsContent value="fleet" className="space-y-6">
            <FleetTable />
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <AlertCenter />
          </TabsContent>
          
          <TabsContent value="ota" className="space-y-6">
            <OTAUpdates />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
