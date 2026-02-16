import { http } from "@/lib/http";
import { Trabajador, TrabajadorPatch, TrabajadorPOST } from "@/types/domain/trabajador";

export const TrabajadorService = {
    getAll: () =>
        http<Trabajador[]>("/api/trabajadores"),

    create: async (payload: TrabajadorPOST) =>
        http<string>(`/api/trabajadores`, {
            method: "POST",
            data: payload
        }),


    edit: async (id: number, payload: TrabajadorPatch) =>
        http<string>(`/api/trabajadores/${id}`, {
            method: "PATCH",
            data: payload
        }),

    delete: (id: number) =>
        http<void>(`/api/trabajadores/${id}`, {
            method: "DELETE",
        }),
};
