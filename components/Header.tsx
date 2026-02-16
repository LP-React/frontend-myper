import { Plus } from "lucide-react"
import { CreateTrabajadorDialog } from "./CreateTrabajadorDialog"

export const Header = () => {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Mantenimiento de
                    Trabajadores</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gestione la información y documentación de su
                    personal operativo.</p>
            </div>

            <CreateTrabajadorDialog />
        </header>
    )
}
