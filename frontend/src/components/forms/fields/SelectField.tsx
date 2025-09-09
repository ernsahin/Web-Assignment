import Select from "react-select";

export interface SelectOption {
  value: number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: SelectOption | null;
  onChange: (opt: SelectOption | null) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  isClearable?: boolean;
  placeholder?: string;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  disabled,
  isClearable = true,
  placeholder,
}: SelectFieldProps) {
  const fieldId = `selectfield-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}: {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        inputId={fieldId}
        value={value}
        onChange={(opt) => onChange(opt as SelectOption | null)}
        options={options}
        isDisabled={disabled}
        isSearchable
        isClearable={isClearable}
        placeholder={placeholder}
        aria-label={label}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
            "&:hover": { borderColor: "#3b82f6" },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#3b82f6"
              : state.isFocused
                ? "#eff6ff"
                : "white",
            color: state.isSelected ? "white" : "#374151",
          }),
        }}
      />
    </div>
  );
}

export default SelectField;
