import { Plus } from "lucide-react"

export const Header = () => {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Mantenimiento de
                    Trabajadores</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gestione la información y documentación de su
                    personal operativo.</p>
            </div>
            <button
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                <span className="material-icons-outlined text-sm">
                    <Plus />
                </span>
                Nuevo Trabajador
            </button>
        </header>
    )
}
