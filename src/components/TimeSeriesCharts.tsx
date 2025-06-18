
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TimeSeriesCharts = () => {
  const data = [
    { time: "00:00", soc: 85, voltage: 400, current: 15, temperature: 28 },
    { time: "04:00", soc: 78, voltage: 395, current: 20, temperature: 30 },
    { time: "08:00", soc: 72, voltage: 390, current: 25, temperature: 32 },
    { time: "12:00", soc: 65, voltage: 385, current: 30, temperature: 35 },
    { time: "16:00", soc: 70, voltage: 392, current: -40, temperature: 33 },
    { time: "20:00", soc: 80, voltage: 398, current: -35, temperature: 31 },
    { time: "24:00", soc: 85, voltage: 400, current: -10, temperature: 29 },
  ];

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Battery Telemetry Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="soc" 
              stroke="#10b981" 
              strokeWidth={2}
              name="SoC (%)"
              dot={{ fill: '#10b981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="voltage" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Voltage (V)"
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Current (A)"
              dot={{ fill: '#f59e0b', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Temperature (°C)"
              dot={{ fill: '#ef4444', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesCharts;
