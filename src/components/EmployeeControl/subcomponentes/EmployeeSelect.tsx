"use client";
import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { EmployeeSearchProps } from "@/types/employee";
import { Label } from "@/components/ui/label";

interface Props {
  value: EmployeeSearchProps | null;
  onChange: (value: EmployeeSearchProps | null) => void;
  loadOptions: (inputValue: string) => Promise<EmployeeSearchProps[]>;
}

export default function EmployeeSelect({
  value,
  onChange,
  loadOptions,
}: Props) {
  // Se asegura de que el componente solo se renderice en el cliente
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Solo renderiza el componente en el cliente, evitando problemas de hidratación
  if (!mounted) {
    return null;
  }

  return (
    <div className="md:col-span-1">
      <Label
        htmlFor="nombres"
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        Búsqueda por Apellidos y Nombres
      </Label>
      <AsyncSelect
        inputId="nombres"
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        value={value}
        onChange={onChange}
        placeholder="Ingrese apellidos o nombres"
        className="mt-1"
        isClearable
        isSearchable
        loadingMessage={() => "Cargando opciones..."}
        noOptionsMessage={() => "No se encontraron resultados"}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#fef8f2" : "#d1d5db",
            boxShadow: "none",
            backgroundColor: state.selectProps.menuIsOpen
              ? "var(--color-bg-control-open)"
              : "var(--color-bg-control)",
            "&:hover": {
              borderColor: "#bb5f09",
            },
            color: "var(--color-text)",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--color-bg-menu)",
            color: "var(--color-text)",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--color-bg-option-selected)"
              : state.isFocused
              ? "var(--color-bg-option-hover)"
              : "var(--color-bg-menu)",
            color: "var(--color-text)",
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--color-text)",
          }),
          input: (base) => ({
            ...base,
            color: "var(--color-text)",
          }),
          placeholder: (base) => ({
            ...base,
            color: "var(--color-placeholder)",
          }),
        }}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastNameFather} ${option.lastNameMother}`
        }
        getOptionValue={(option) => option.id}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral0: "var(--color-bg-control)",
            neutral20: "#d1d5db",
            neutral30: "#a0aec0",
            primary25: "var(--color-bg-option-hover)",
            primary: "#4a5568",
            danger: "#e53e3e",
          },
        })}
      />
      <style jsx global>{`
        :root {
          --color-bg-control: #fff;
          --color-bg-control-open: #f9fafb;
          --color-bg-menu: #fff;
          --color-bg-option-selected: #edf2f7;
          --color-bg-option-hover: #f1f5f9;
          --color-text: #2d3748;
          --color-placeholder: #a0aec0;
        }
        html.dark {
          --color-bg-control: #1a202c;
          --color-bg-control-open: #2d3748;
          --color-bg-menu: #2d3748;
          --color-bg-option-selected: #4a5568;
          --color-bg-option-hover: #2c5282;
          --color-text: #f7fafc;
          --color-placeholder: #a0aec0;
        }
      `}</style>
    </div>
  );
}
