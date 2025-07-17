"use client";

import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import { getAllRoles } from "@/helpers/role.helper";
import { registerUser } from "@/helpers/user.helpers";
import { RoleListProps } from "@/types/role";
import { UserRegisterProps } from "@/types/user";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBrush, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const UserRegister = () => {
  const [roles, setRoles] = useState<RoleListProps[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  interface Employee {
    employeeId: number;
    firstName: string;
    lastNameFather: string;
    lastNameMother: string;
    email: string;
  }

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]); // Estado para los empleados filtrados
  const [employeeData, setEmployeeData] = useState<Employee>({
    employeeId: 0,
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    email: "",
  });

  const [userRegister, setUserRegister] = useState<UserRegisterProps>({
    employeeId: 0,
    userName: "",
    password: "",
    roleId: "",
    isActive: true,
  });

  //! Función para obtener todos los roles
  const GetRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (e) {
      toast.error("Error al obtener los roles", { theme: "colored" });
      console.error("Error al obtener los roles:", e);
    }
  };

  //! Función para buscar empleado por número de documento
  const handleSearch = async (fullname: string) => {
    if (fullname.length >= 1) {
      try {
        const empleadoData = await getEmployeeByFullname(fullname);

        if (empleadoData.length === 0) {
          setFilteredEmployees([]); // Si no hay resultados, limpiar la lista de empleados
          toast.error("No se encontró el empleado", { theme: "colored" });
          return;
        }

        setFilteredEmployees(empleadoData); // Guardar los empleados encontrados en el estado
      } catch (e) {
        toast.error("Error al buscar el empleado", { theme: "colored" });
        console.error("Error al buscar el empleado:", e);
      }
    } else {
      setFilteredEmployees([]); // Limpiar los resultados si no se ingresa ningún texto
    }
  };

  useEffect(() => {
    // Aquí validamos el rol del usuario antes de permitirle ver la página
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.roles?.[0];

    if (!role || !["Administrador", "Gerente"].includes(role)) {
      setHasPermission(false); // Si no tiene el rol, se oculta el formulario y muestra el mensaje
    } else {
      GetRoles(); // Si tiene el rol, continuamos con la obtención de roles
    }
  }, []);

  //! Función para manejar el cambio del rol
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRegister({
      ...userRegister,
      roleId: e.target.value,
    });
  };

  //! Función para manejar el registro de usuario
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userRegister.userName ||
      !userRegister.password ||
      !userRegister.roleId
    ) {
      toast.error("Todos los campos son obligatorios", { theme: "colored" });
      return;
    }

    const userRegisterData: UserRegisterProps = {
      employeeId: employeeData.employeeId,
      userName: userRegister.userName,
      password: userRegister.password,
      roleId: userRegister.roleId,
      isActive: userRegister.isActive,
    };

    try {
      const response = await registerUser(userRegisterData);

      if (response?.message === "Usuario creado correctamente") {
        toast.success("Usuario registrado con éxito", { theme: "colored" });
      } else {
        toast.error("Error al registrar el usuario", { theme: "colored" });
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      toast.error("Error al registrar el usuario", { theme: "colored" });
    }
  };

  const handleReset = () => {
    setEmployeeData({
      employeeId: 0,
      firstName: "",
      lastNameFather: "",
      lastNameMother: "",
      email: "",
    });
    setUserRegister({
      employeeId: 0,
      userName: "",
      password: "",
      roleId: "",
      isActive: false,
    });
  };

  if (!hasPermission) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-red-600">
            Lo siento, no tiene permisos suficientes
          </h2>
          <p className="text-xl mt-2">
            Por favor comuníquese con el administrador del sistema.
          </p>
          <Link href="/dashboard/main">
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Volver al Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <form
        className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-xl"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-semibold mb-6 text-left mx-10">
          Registro de usuario
        </h2>

        {/* Buscar empleado por apellidos y nombres*/}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? `${employeeData.lastNameFather} ${employeeData.lastNameMother} ${employeeData.firstName}`
                : "Buscar empleado..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Buscar empleado..."
                className="h-9"
                value={value}
                onValueChange={(val: string) => {
                  setValue(val); // Actualiza el valor con el texto ingresado
                  handleSearch(val); // Llama a la función de búsqueda
                }}
              />
              <CommandList>
                <CommandEmpty>No se encontraron empleados.</CommandEmpty>
                <CommandGroup>
                  {filteredEmployees.map((employee) => (
                    <CommandItem
                      key={employee.employeeId}
                      value={employee.firstName + " " + employee.lastNameFather}
                      onSelect={() => {
                        setEmployeeData(employee); // Establecer el empleado seleccionado
                        setValue(
                          employee.firstName + " " + employee.lastNameFather
                        ); // Mostrar el nombre seleccionado
                        setOpen(false); // Cerrar el Popover
                      }}
                    >
                      {employee.firstName} {employee.lastNameFather}
                      <Check
                        className={`ml-auto ${
                          value ===
                          employee.firstName + " " + employee.lastNameFather
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Fila de Apellido y Nombre + Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mx-10">
          {/* Apellido y Nombre */}
          <div className="flex flex-col">
            <Label htmlFor="fullName" className="mb-1 text-sm font-medium">
              Apellido y Nombres:{" "}
            </Label>
            <span id="fullName" className="text-gray-700">
              {`${employeeData.lastNameFather} ${employeeData.lastNameMother} ${employeeData.firstName}`}
            </span>
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <Label htmlFor="userName" className="mb-1 text-sm font-medium">
              Nombre de Usuario
            </Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={userRegister.userName}
              onChange={(e) =>
                setUserRegister({ ...userRegister, userName: e.target.value })
              }
              className="input input-info w-full"
            />
          </div>
        </div>

        {/* Fila de Correo, Contraseña y Rol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mx-10">
          {/* Correo */}
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-1 text-sm font-medium">
              Correo Electrónico
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={employeeData.email}
              readOnly
              className="input input-info w-full"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <Label htmlFor="password" className="mb-1 text-sm font-medium">
              Contraseña
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={userRegister.password}
              onChange={(e) =>
                setUserRegister({ ...userRegister, password: e.target.value })
              }
              className="input input-info w-full"
              placeholder="Ingrese una contraseña"
            />
          </div>

          {/* Rol */}
          <div className="flex flex-col">
            <Label htmlFor="role" className="mb-1 text-sm font-medium">
              Rol
            </Label>
            <div className="relative">
              <Select
                value={userRegister.roleId}
                onValueChange={(value) =>
                  setUserRegister({ ...userRegister, roleId: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

          <Button
            type="reset"
            onClick={handleReset}
            variant="reset"
            className="w-full"
          >
            <FaBrush className="text-base" />
            Limpiar
          </Button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UserRegister;
