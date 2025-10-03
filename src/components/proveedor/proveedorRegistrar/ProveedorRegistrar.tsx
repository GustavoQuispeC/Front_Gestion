import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaBrush, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ProveedorRegistrar() {
  return (
    <form className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-xl">
      <h2 className="text-2xl text-blue-900 dark:text-blue-500 font-semibold mb-6 text-left mx-10">
        Registro de Proveedores
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 ">
        <div>
          <Label className="mb-2 mx-10">Razón Social</Label>
          <div className="relative flex items-center mx-10">
            <Input type="text" placeholder="Razón Social" />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">RUC</Label>
          <div className="relative flex items-center mx-10">
            <Input type="text" placeholder="RUC" />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Teléfono</Label>
          <div className="relative flex items-center mx-10">
            <Input type="text" placeholder="Teléfono" />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Dirección</Label>
          <div className="relative flex items-center mx-10">
            <Input type="text" placeholder="Dirección" />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mx-10">
        <Link href="/dashboard/userList">
          <Button variant="outline" className="w-full">
            <IoMdArrowRoundBack className="text-base" />
            Volver
          </Button>
        </Link>

        <Button type="submit" className="w-full">
          <FaSave className="text-base" />
          Registrar
        </Button>

        <Button type="reset" variant="reset" className="w-full">
          <FaBrush className="text-base" />
          Limpiar
        </Button>
      </div>
    </form>
  );
}
