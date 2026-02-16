import { http } from "@/lib/http";
import { Trabajador, TrabajadorPOST } from "@/types/domain/trabajador";

export const TrabajadorService = {
    getAll: () =>
        http<Trabajador[]>("/api/trabajadores"),

    // getByEmail: (email: string) =>
    //     http<UsuarioApi>(`/api/Usuarios/Buscar-Por-correo/${email}`),

    create: async (payload: TrabajadorPOST) =>
        http<string>(`/api/trabajadores`, {
            method: "POST",
            data: payload
        })

    //     create: async (id: number, payload: PatchUserRequest) =>
    // http<PatchUserResponse>(`/api/Usuarios/editarUsuario?id=${id}`, {
    //     method: "PATCH",
    //     data: payload
    // })
};
