import OrbitalDashboard from "@/components/OrbitalDashboard";

export default function Index() {
  return (
    // Adicionado um gradiente suave ao fundo ("céu") para dar profundidade
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-white to-gray-200 font-sans">
      <OrbitalDashboard />
    </div>
  );
}
