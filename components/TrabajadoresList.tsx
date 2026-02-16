"use client";

import { TrabajadorService } from "@/services/trabajador.service";
import { Trabajador } from "@/types/domain/trabajador";
import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TrabajadoresListProps {
  filterSexo?: string;
  filterSearch?: string;
}

export default function TrabajadoresList({ filterSexo = "todos", filterSearch = "" }: TrabajadoresListProps) {
  const [data, setData] = useState<Trabajador[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const res = await TrabajadorService.getAll();
        setData(res);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchTrabajadores();
  }, []);

  // Filtrar según sexo y búsqueda
  const filteredData = data.filter((t) => {
    const matchSexo = filterSexo === "todos" || t.sexo === filterSexo;
    const matchSearch =
      t.nombres.toLowerCase().includes(filterSearch.toLowerCase()) ||
      t.numeroDocumento.toLowerCase().includes(filterSearch.toLowerCase());
    return matchSexo && matchSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Reset página al cambiar filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [filterSexo, filterSearch]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16 text-center">Foto</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nombres</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Apellidos</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tipo Doc.</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Número Doc.</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sexo</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">F. Nacimiento</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dirección</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentData.map((t) => (
              <tr className="hover:bg-primary/5 bg-[#eff6ff] dark:bg-primary/5 transition-colors group" key={t.trabajadorId}>
                <td className="px-6 py-4">
                  <Avatar className="w-10 h-10 border">
                    {t.fotoUrl ? (
                      <AvatarImage src={t.fotoUrl} alt={t.nombres} />
                    ) : (
                      <AvatarFallback>{t.nombres.charAt(0).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{t.nombres}</td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{t.apellidos}</td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{t.tipoDocumento}</td>
                <td className="px-4 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">{t.numeroDocumento}</td>
                <td className="px-4 py-4 text-sm">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{t.sexo}</span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400 text-center">
                  {new Date(t.fechaNacimiento).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-[200px] truncate">{t.direccion}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Editar">
                      <Pencil />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Eliminar">
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} trabajadores
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg font-medium transition-colors ${currentPage === i + 1
                ? "bg-primary text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
