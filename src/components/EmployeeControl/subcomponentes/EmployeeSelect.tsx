import AsyncSelect from "react-select/async";
import { EmployeeSearchProps } from "@/types/employee";

interface Props {
  onChange: (value: EmployeeSearchProps | null) => void;
  loadOptions: (inputValue: string) => Promise<EmployeeSearchProps[]>;
}

export default function EmployeeSelect({ onChange, loadOptions }: Props) {
  return (
    <div className="md:col-span-1">
      <label
        htmlFor="nombres"
        className="block text-sm font-medium text-gray-700"
      >
        Apellidos y Nombres
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={onChange}
        placeholder="Ingrese apellidos o nombres"
        className="mt-1"
        isClearable
        isSearchable
        loadingMessage={() => "Cargando opciones..."} // Indicador de carga
        noOptionsMessage={() => "No se encontraron resultados"}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#d1d5db", // Color del borde
            boxShadow: "none",
            "&:hover": {
              borderColor: "#a0aec0", // Color del borde al hacer hover
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#edf2f7" : "white", // Cambiar fondo al seleccionar
            color: state.isSelected ? "#4a5568" : "#2d3748", // Color del texto
          }),
        }}
      />
    </div>
  );
}
