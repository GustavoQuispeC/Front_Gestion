import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { EmployeeSearchProps } from "@/types/employee";

interface Props {
  value: EmployeeSearchProps | null; // <-- AGREGA ESTO
  onChange: (value: EmployeeSearchProps | null) => void;
  loadOptions: (inputValue: string) => Promise<EmployeeSearchProps[]>;
}

export default function EmployeeSelect({
  value,
  onChange,
  loadOptions,
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // O un loader si prefieres
  }

  return (
    <div className="md:col-span-1">
      <label
        htmlFor="nombres"
        className="block text-sm font-medium text-gray-700"
      >
        Búsqueda por Apellidos y Nombres
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions} // Asegúrate de que esta función esté trabajando correctamente
        value={value} // El valor del empleado seleccionado
        onChange={onChange} // Actualiza el valor al seleccionar un empleado
        placeholder="Ingrese apellidos o nombres"
        className="mt-1"
        isClearable
        isSearchable
        loadingMessage={() => "Cargando opciones..."}
        noOptionsMessage={() => "No se encontraron resultados"}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#d1d5db",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#a0aec0",
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#edf2f7" : "white",
            color: state.isSelected ? "#4a5568" : "#2d3748",
          }),
        }}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastNameFather} ${option.lastNameMother}`
        }
        getOptionValue={(option) => option.id} // Usando `id` como valor único de la opción
      />
    </div>
  );
}
