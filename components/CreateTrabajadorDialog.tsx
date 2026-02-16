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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { TrabajadorPOST } from "@/types/domain/trabajador";
import { TrabajadorService } from "@/services/trabajador.service";
import axios from "axios";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rl8hm1rs");
    formData.append("folder", "user-avatars");

    const res = await axios.post("https://api.cloudinary.com/v1_1/diryo1oi1/image/upload", formData);
    return res.data.secure_url;
};

interface CreateTrabajadorDialogProps {
    onCreated?: () => void;
}

export function CreateTrabajadorDialog({ onCreated }: CreateTrabajadorDialogProps) {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [sexo, setSexo] = useState("Masculino");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false);


    const limpiarFormulario = () => {
        setNombres("");
        setApellidos("");
        setTipoDocumento("");
        setNumeroDocumento("");
        setSexo("Masculino");
        setFechaNacimiento("");
        setDireccion("");
        setAvatarFile(null);
        setAvatarPreview(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return;

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const validarFormulario = () => {
        const nombreRegex = /^[A-Za-z\s]+$/;

        if (!nombreRegex.test(nombres)) {
            toast.error("Los nombres no deben contener números ni caracteres especiales.");
            return false;
        }

        if (!nombreRegex.test(apellidos)) {
            toast.error("Los apellidos no deben contener números ni caracteres especiales.");
            return false;
        }

        const fechaMaxima = new Date("2007-12-31");
        if (fechaNacimiento && new Date(fechaNacimiento) > fechaMaxima) {
            toast.error("La fecha de nacimiento no puede ser mayor a 2007.");
            return false;
        }

        if (!tipoDocumento) {
            toast.error("Debe seleccionar un tipo de documento.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
        let fotoUrl = "";
        if (avatarFile) {
            fotoUrl = await uploadToCloudinary(avatarFile);
        }

        const payload: TrabajadorPOST = {
            nombres,
            apellidos,
            tipoDocumentoId: Number(tipoDocumento),
            numeroDocumento,
            sexo,
            fechaNacimiento,
            direccion,
            fotoUrl,
        };

        await TrabajadorService.create(payload);

        toast.success("Trabajador creado con éxito!");
        limpiarFormulario();
        setOpen(false);

        window.location.reload();
    } catch (err) {
        console.error("Error creando trabajador:", err);
        toast.error("Hubo un error al crear el trabajador.");
    }
};


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <span className="material-icons-outlined text-sm">
                        <Plus />
                    </span>
                    Nuevo Trabajador
                </Button>
            </DialogTrigger>

            <DialogContent className="w-200 sm:max-w-none">
                <DialogHeader>
                    <DialogTitle>Registrar Trabajador</DialogTitle>
                    <DialogDescription>
                        Complete los datos del nuevo integrante del equipo.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="col-span-12 md:col-span-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2">Nombres</Label>
                                <Input value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder="Carlos Andrés" />
                            </div>
                            <div>
                                <Label className="mb-2">Apellidos</Label>
                                <Input value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder="Pérez García" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2">Tipo de Documento</Label>
                                <Select onValueChange={(val) => setTipoDocumento(val)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccione" />
                                    </SelectTrigger>
                                    <SelectContent className="mb-2">
                                        <SelectItem value="1">DNI</SelectItem>
                                        <SelectItem value="2">Pasaporte</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="mb-2">Número de Documento</Label>
                                <Input value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} placeholder="00000000" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2">Sexo</Label>
                                <RadioGroup value={sexo} onValueChange={setSexo} className="flex gap-4 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Masculino" id="masculino" />
                                        <Label htmlFor="masculino">Masculino</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Femenino" id="femenino" />
                                        <Label htmlFor="femenino">Femenino</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <Label className="mb-2">Fecha de Nacimiento</Label>
                                <Input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <Label className="mb-2">Dirección de domicilio</Label>
                            <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Av. Los Pinos 123, Miraflores" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN - AVATAR */}
                    <div className="col-span-12 md:col-span-4 flex flex-col items-center gap-4">
                        <Label>Foto de Perfil</Label>
                        <Avatar className="w-32 h-32 border">
                            <AvatarImage src={avatarPreview ?? undefined} />
                            <AvatarFallback>Foto</AvatarFallback>
                        </Avatar>

                        <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {/* FOOTER */}
                    <DialogFooter className="col-span-12 flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                limpiarFormulario();
                                setOpen(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-[#137FEC]">Guardar Trabajador</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
