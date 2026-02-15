import { http } from "@/lib/http";
import { Trabajador } from "@/types/domain/trabajador";

export const TrabajadorService = {
    getAll: () =>
        http<Trabajador[]>("/api/trabajadores"),

    // getById: (id: number) =>
    //     http<UsuarioApi>(`/api/Usuarios/Buscar${id}`),

    // getByEmail: (email: string) =>
    //     http<UsuarioApi>(`/api/Usuarios/Buscar-Por-correo/${email}`),

    // editUser: async (id: number, payload: PatchUserRequest) =>
    //     http<PatchUserResponse>(`/api/Usuarios/editarUsuario?id=${id}`, {
    //         method: "PATCH",
    //         data: payload
    //     })

};
