import { ChevronDown, Search } from "lucide-react";

interface FiltrosProps {
  sexo: string;
  onSexoChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const Filtros = ({ sexo, onSexoChange, search, onSearchChange }: FiltrosProps) => {
  return (
    <section className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-6 flex flex-wrap items-center gap-6 shadow-sm">
      
      {/* Filtrar por Sexo */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sexo:</label>
        <div className="relative">
          <select
            className="appearance-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-primary focus:border-primary min-w-[160px]"
            value={sexo}
            onChange={(e) => onSexoChange(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* Buscador */}
      <div className="flex-grow max-w-md ml-auto">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            <Search />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre o documento..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </section>
  );
};
