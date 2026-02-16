"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trabajador } from "@/types/domain/trabajador";
import { TrabajadorService } from "@/services/trabajador.service";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface DeleteTrabajadorDialogProps {
    trabajador: Trabajador;
    onDeleted?: () => void; // callback para actualizar lista
}

export function DeleteTrabajadorDialog({ trabajador, onDeleted }: DeleteTrabajadorDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await TrabajadorService.delete(trabajador.trabajadorId);
            toast.success("Trabajador eliminado con éxito!");
            setOpen(false);
            onDeleted?.();
        } catch (err) {
            console.error("Error eliminando trabajador:", err);
            toast.error("Hubo un error al eliminar el trabajador.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Eliminar"
                >
                    <Trash />
                </button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-md">
                <DialogHeader>
                    <DialogTitle>Confirmación de eliminación</DialogTitle>
                    <DialogDescription>
                        ¿Está seguro de eliminar el registro del trabajador? Esta acción es permanente y no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>

                {/* Información básica del trabajador */}
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                        {trabajador.fotoUrl ? (
                            <AvatarImage src={trabajador.fotoUrl} alt={trabajador.nombres} />
                        ) : (
                            <AvatarFallback>{trabajador.nombres.charAt(0)}</AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{trabajador.nombres} {trabajador.apellidos}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            ID: {trabajador.trabajadorId} • {trabajador.tipoDocumento} {trabajador.numeroDocumento}
                        </p>
                    </div>
                </div>

                <DialogFooter className="mt-4 flex flex-col sm:flex-row-reverse gap-2">
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Eliminando..." : "Eliminar"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
