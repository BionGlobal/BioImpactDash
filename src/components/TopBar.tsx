import { useState } from "react";
import { Bot, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

// Mock de dados dinâmicos para o carrossel
const realTimeUpdates = [
  { unit: "BioGreen", value: "6 Ton", metric: "CO₂e Evitados" },
  { unit: "BioDust", value: "3.234", metric: "garrafas PET processadas hoje" },
  { unit: "Augen", value: "89M", metric: "litros de água salvos" },
  { unit: "Bio MPF", value: "12 Ton", metric: "Biomassa Reciclada" },
];

// Componente para o carrossel de texto animado
const TickerText = () => {
  const messages = realTimeUpdates.map(
    (update) => `${update.value} de ${update.metric} por ${update.unit}`
  );

  return (
    <div className="text-center text-gray-600 font-light text-xs tracking-wider overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-ticker">
        {messages.map((msg, i) => (
          <span key={i} className="mx-6">
            {msg.toUpperCase()}
          </span>
        ))}
        {/* Duplicamos para o efeito de scroll contínuo */}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="mx-6">
            {msg.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function TopBar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="w-full bg-transparent flex items-center justify-between px-4 md:px-8 py-2">
      {/* Lado Esquerdo: Placeholder para futuras funções */}
      <div className="w-1/4">
        {/* Espaço reservado */}
      </div>

      {/* Centro: Carrossel de Texto */}
      <div className="w-1/2">
        <TickerText />
      </div>

      {/* Lado Direito: Ícones de Ação */}
      <div className="w-1/4 flex items-center justify-end space-x-4 text-gray-600">
        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "150px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input 
                type="text" 
                placeholder="Pesquisar..." 
                className="h-8 text-xs bg-white/50 backdrop-blur-lg border-gray-200/50 rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button whileHover={{ scale: 1.1 }} className="hover:text-black transition-colors">
          <Bot size={16} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => setIsSearchVisible(!isSearchVisible)} className="hover:text-black transition-colors">
          <Search size={16} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} className="hover:text-black transition-colors">
          <User size={16} />
        </motion.button>
      </div>
    </div>
  );
}
