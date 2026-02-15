"use client"

import { Filtros } from "@/components/Filtros";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import TrabajadoresList from "@/components/TrabajadoresList";
import { useState } from "react";

export default function Home() {

  const [sexo, setSexo] = useState("todos");
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">

      <Header />

      <Filtros sexo={sexo} onSexoChange={setSexo} search={search} onSearchChange={setSearch} />

      <TrabajadoresList filterSexo={sexo} filterSearch={search} />

      <Footer />

    </div>
  );
}
