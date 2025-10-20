"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registrarProducto } from "@/helpers/producto.helper";
import { ProveedoresListar } from "@/helpers/proveedor.helper";
import { ProductoRegistrarProps } from "@/types/producto";
import { ListarProveedoresProps } from "@/types/proveedor";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBrush, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import Image from "next/image";
import { uploadProductoImagen } from "@/helpers/uploadProductoImagenToFirebase";
import { Marcas } from "../../../types/marca";
import { ListarMarcas } from "@/helpers/marca.helper";
import { Categorias } from "@/types/categoria";
import { ListarCategorias } from "@/helpers/categoria.helper";

export default function ProductoRegistrar() {
  const [hasPermission, setHasPermission] = useState(true);
  const [token, setToken] = useState("");
  const [proveedor, setProveedor] = useState<ListarProveedoresProps[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [marcas, setMarcas] = useState<Marcas[]>([]);
  const [categorias, setCategorias] = useState<Categorias[]>([]);

  const [productoRegistrar, setProductoRegistrar] =
    useState<ProductoRegistrarProps>({
      descripcion: "",
      precio: 0,
      stock: 0,
      proveedorId: "",
      imageUrl: "",
      categoriaId: "",
      marcaId: "",
    });

  //! Validación de permisos
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.roles?.[0];
    const storedToken = user?.token;

    if (
      !role ||
      !["Administrador", "Supervisor"].includes(role) ||
      !storedToken
    ) {
      setHasPermission(false);
    } else {
      setToken(storedToken);
      ListarProveedores();
      ObtenerMarcas();
      ObtenerCategorias();
    }
  }, []);

  //! Obtener lista de proveedores
  const ListarProveedores = async () => {
    try {
      const proveedoresData = await ProveedoresListar();
      setProveedor(proveedoresData);
    } catch (e) {
      toast.error("Error al listar los proveedores");
      console.error("Error al listar proveedores:", e);
    }
  };
  //! Cambio de proveedor
  const handleChangeProveedor = (value: string) => {
    setProductoRegistrar({ ...productoRegistrar, proveedorId: value });
  };

  //! Obtener lista de marcas
  const ObtenerMarcas = async () => {
    try {
      const marcasData = await ListarMarcas();
      setMarcas(marcasData);
    } catch (e) {
      toast.error("Error al listar las marcas");
      console.error("Error al listar marcas:", e);
    }
  };
  //!Cambio de marca
  const handleChangeMarca = (value: string) => {
    setProductoRegistrar({ ...productoRegistrar, marcaId: value });
  };

  //! Obtener lista de categorias
  const ObtenerCategorias = async () => {
    try {
      const categoriasData = await ListarCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      toast.error("Error al listar las categorias");
      console.error("Error al listar categorias:", error);
    }
  };
  //!Cambio de categoria
  const handleChangeCategoria = (value: string) => {
    setProductoRegistrar({ ...productoRegistrar, categoriaId: value });
  };

  //! Limpiar formulario
  const handleReset = () => {
    setProductoRegistrar({
      descripcion: "",
      precio: 0,
      stock: 0,
      proveedorId: "",
      imageUrl: "",
      categoriaId: "",
      marcaId: "",
    });
    setPreviewUrl(null);
    setSelectedImage(null);
  };

  //! Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setProductoRegistrar((prev) => ({ ...prev, imageUrl }));
    } else {
      setProductoRegistrar((prev) => ({ ...prev, [name]: value }));
    }
  };

  //! Registrar producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrl = "";
    if (selectedImage) {
      uploadedImageUrl = await uploadProductoImagen(selectedImage);
    }
    const finalImageUrl = uploadedImageUrl || productoRegistrar.imageUrl;

    if (
      !productoRegistrar.descripcion ||
      !productoRegistrar.precio ||
      !productoRegistrar.stock ||
      !productoRegistrar.proveedorId ||
      !productoRegistrar.marcaId ||
      !productoRegistrar.categoriaId
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    const productoRegistrarData = {
      ...productoRegistrar,
      precio: productoRegistrar.precio,
      stock: productoRegistrar.stock,
      imageUrl: finalImageUrl,
    };

    try {
      const response = await registrarProducto(productoRegistrarData, token);
      if (response?.message === "Producto registrado correctamente") {
        toast.success("Producto registrado con éxito.");
        handleReset();
      } else {
        toast.error(
          response?.message ||
            response?.error ||
            "Error al registrar el producto"
        );
      }
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Error desconocido al registrar el producto"
      );
    }
  };

  console.log(productoRegistrar);

  //! Si no tiene permisos
  if (!hasPermission) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-semibold text-red-600">
          Lo siento, no tiene permisos suficientes
        </h2>
        <p className="text-xl mt-2">
          Por favor comuníquese con el administrador del sistema.
        </p>
        <Link href="/dashboard/main">
          <Button className="mt-6 px-4 py-2">Volver al Dashboard</Button>
        </Link>
      </div>
    );
  }

  //! Render
  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl text-blue-900 dark:text-blue-500 font-semibold mb-6 text-left mx-10">
        Registro de Productos
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2 mx-10">Descripción</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="text"
              name="descripcion"
              placeholder="Ingrese nombre"
              value={productoRegistrar.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Precio</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="number"
              name="precio"
              placeholder="0.00"
              value={productoRegistrar.precio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Stock</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="number"
              name="stock"
              placeholder="0"
              value={productoRegistrar.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Proveedor</Label>
          <div className="relative flex items-center mx-10">
            <Select
              value={productoRegistrar.proveedorId}
              onValueChange={handleChangeProveedor}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {proveedor.map((p) => (
                    <SelectItem
                      key={p.proveedorId}
                      value={p.proveedorId.toString()}
                    >
                      {p.razonSocial}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/*select de categoria*/}
        <div>
          <Label className="mb-2 mx-10">Marcas</Label>
          <div className="relative flex items-center mx-10">
            <Select
              value={productoRegistrar.marcaId}
              onValueChange={handleChangeMarca}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {marcas.map((m) => (
                    <SelectItem key={m.marcaId} value={m.marcaId.toString()}>
                      {m.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/*select de categoria*/}
        <div>
          <Label className="mb-2 mx-10">Categorias</Label>
          <div className="relative flex items-center mx-10">
            <Select
              value={productoRegistrar.categoriaId}
              onValueChange={handleChangeCategoria}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categorias.map((c) => (
                    <SelectItem
                      key={c.categoriaId}
                      value={c.categoriaId.toString()}
                    >
                      {c.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Adjuntar Foto */}
        <div className="flex flex-col mx-10">
          <Label htmlFor="imageUrl" className="font-medium mb-3 block">
            Adjuntar imagen del producto
          </Label>

          <Input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          />

          <p className="text-xs text-slate-500 mt-2">
            Solo se permiten archivos .jpg, .jpeg y .png
          </p>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-slate-700 mb-2">Vista previa:</p>
              <Image
                src={previewUrl}
                alt="Vista previa"
                className="object-cover rounded-lg border"
                width={160}
                height={192}
                style={{ height: "auto" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mx-10">
        <Link href="/dashboard/proveedorListar">
          <Button variant="outline" className="w-full">
            <IoMdArrowRoundBack className="text-base" />
            Volver
          </Button>
        </Link>

        <Button type="submit" className="w-full">
          <FaSave className="text-base" />
          Registrar
        </Button>

        <Button type="reset" variant="secondary" className="w-full">
          <FaBrush className="text-base" />
          Limpiar
        </Button>
      </div>
    </form>
  );
}
