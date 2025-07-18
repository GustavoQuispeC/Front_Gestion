"use client";

import EmployeeSelect from "@/components/EmployeeControl/subcomponentes/EmployeeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { EmployeeSearchProps } from "@/types/employee";
import { RoleListProps } from "@/types/role";
import { UserRegisterProps } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBrush, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const UserRegister = () => {
  const [roles, setRoles] = useState<RoleListProps[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  const [employeeData, setEmployeeData] = useState<EmployeeSearchProps>({
    employeeId: "",
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    documentNumber: "",
    position: "",
    email: "",
    hireDate: "",
  });

  const [userRegister, setUserRegister] = useState<UserRegisterProps>({
    employeeId: "",
    userName: "",
    password: "",
    roleId: "",
    isActive: true,
  });

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);

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

  //! Función para cargar opciones de empleados
  const loadOptions = async (inputValue: string) => {
    if (inputValue.length < 1) return [];
    try {
      const data = await getEmployeeByFullname(inputValue);
      return data.map((empleado) => ({
        label: `${empleado.firstName} ${empleado.lastNameFather} ${empleado.lastNameMother}`,
        value: empleado.employeeId,
        ...empleado,
      }));
    } catch (error) {
      console.error("Error cargando empleados:", error);
      return [];
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
      employeeId: "",
      firstName: "",
      lastNameFather: "",
      lastNameMother: "",
      email: "",
      documentNumber: "",
      position: "",
      hireDate: "",
    });
    setUserRegister({
      employeeId: "",
      userName: "",
      password: "",
      roleId: "",
      isActive: false,
    });
  };

  const handleEmployeeChange = (employee: EmployeeSearchProps | null) => {
    setSelectedEmployee(employee); // Actualiza el empleado seleccionado
    if (employee) {
      setEmployeeData({
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastNameFather: employee.lastNameFather,
        lastNameMother: employee.lastNameMother,
        email: employee.email,
        documentNumber: employee.documentNumber,
        position: employee.position,
        hireDate: employee.hireDate,
      }); // Actualiza employeeData con los datos del empleado
    } else {
      setEmployeeData({
        employeeId: "",
        firstName: "",
        lastNameFather: "",
        lastNameMother: "",
        email: "",
        documentNumber: "",
        position: "",
        hireDate: "",
      }); // Limpiar datos si no hay empleado
    }
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
        <div className="my-4">
          <EmployeeSelect
            onChange={handleEmployeeChange}
            loadOptions={loadOptions}
            value={selectedEmployee}
          />
        </div>

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
