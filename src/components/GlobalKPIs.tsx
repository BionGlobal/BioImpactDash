import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, Recycle, Package, Mountain } from "lucide-react";

const kpis = [
    { title: "CO₂e evitado", value: "947.2k", unit: "toneladas", icon: Leaf },
    { title: "Água purificada", value: "125.8M", unit: "litros", icon: Droplets },
    { title: "Biomassa reciclada", value: "92.4k", unit: "toneladas", icon: Recycle },
    { title: "Plástico PET neutralizado", value: "34.1k", unit: "toneladas", icon: Package },
    { title: "Uso da Terra evitado", value: "2.1k", unit: "hectares", icon: Mountain },
];

export default function GlobalKPIs() {
  return (
    <Card className="bg-white/50 backdrop-blur-lg border-gray-200/50 rounded-2xl w-64 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-800">Impacto Global</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="flex items-start space-x-3">
            <kpi.icon className="h-5 w-5 text-gray-600 mt-1" />
            <div>
              <p className="text-sm font-light text-gray-600">{kpi.title}</p>
              <p className="text-lg font-semibold text-gray-900">
                {kpi.value} <span className="text-sm font-light text-gray-500">{kpi.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
