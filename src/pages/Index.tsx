import OrbitalDashboard from "@/components/OrbitalDashboard";

// Adiciona a fonte Montserrat e remove o overflow da página
export default function Index() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 font-montserrat">
      <OrbitalDashboard />
    </div>
  );
}
