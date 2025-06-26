import AsyncSelect from "react-select/async";
import { EmployeeSearchProps } from "@/types/employee";

interface Props {
  onChange: (value: EmployeeSearchProps | null) => void;
  loadOptions: (inputValue: string) => Promise<EmployeeSearchProps[]>;
}

export default function EmployeeSelect({ onChange, loadOptions }: Props) {
  return (
    <div className="md:col-span-1">
      <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
        Apellidos y Nombres
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={onChange}
        placeholder="Ingrese apellidos o nombres"
        className="mt-1"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#d1d5db",
            boxShadow: "none",
          }),
        }}
      />
    </div>
  );
}
