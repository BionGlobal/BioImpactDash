import { Globe, User } from "lucide-react";

// Componente para o carrossel de texto animado
const TickerText = () => {
  // Mock de dados dinâmicos para o carrossel
  const messages = [
    "BIOSOLVIT: INOVAÇÃO E SUSTENTABILIDADE",
    "RASTREAMENTO DE IMPACTO EM TEMPO REAL",
    "TECNOLOGIA A FAVOR DO PLANETA",
    "6 TON DE CO2e EVITADOS POR BIOGREEN",
  ];

  return (
    <div className="text-center text-gray-700 font-medium text-xs tracking-wider overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-ticker">
        {messages.map((msg, i) => (
          <span key={i} className="mx-4">
            {msg}
          </span>
        ))}
        {/* Duplicamos para o efeito de scroll contínuo */}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="mx-4">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function TopBar() {
  return (
    <div className="w-full bg-transparent flex items-center justify-between px-4 md:px-8 py-2">
      {/* Lado Esquerdo: Placeholder para futuras funções */}
      <div className="w-1/4">
        {/* Exemplo de link futuro:
        <a href="#" className="text-xs font-medium text-gray-700 hover:text-black transition-colors">CORPORATE</a>
        */}
      </div>

      {/* Centro: Carrossel de Texto */}
      <div className="w-1/2">
        <TickerText />
      </div>

      {/* Lado Direito: Placeholder para futuras funções */}
      <div className="w-1/4 flex items-center justify-end space-x-4 text-gray-700">
        <button className="flex items-center space-x-1 text-xs font-medium hover:text-black transition-colors">
          <Globe size={14} />
          <span>PT</span>
        </button>
        <button className="flex items-center space-x-1 text-xs font-medium hover:text-black transition-colors">
          <User size={14} />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
}
