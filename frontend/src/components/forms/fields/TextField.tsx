interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  maxLength?: number;
  type?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
}

function TextField({
  label,
  value,
  onChange,
  required,
  maxLength,
  type = "text",
  name,
  disabled,
  placeholder,
}: TextFieldProps) {
  const fieldId =
    name || `textfield-${Math.random().toString(36).substr(2, 9)}`;
  const warnThreshold = maxLength ? Math.floor(maxLength * 0.8) : undefined;
  const danger = maxLength ? value.length >= maxLength : false;
  const warn = maxLength && !danger ? value.length >= warnThreshold! : false;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}: {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          name={name || fieldId}
          disabled={disabled}
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete="off"
          aria-label={label}
          aria-describedby={danger ? `${fieldId}-error` : undefined}
          className={`block w-full px-3 py-2 pr-16 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 ${
            danger
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
        {maxLength && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center text-xs ${
              danger
                ? "text-red-600"
                : warn
                  ? "text-yellow-600"
                  : "text-gray-500"
            }`}
          >
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {danger && maxLength && (
        <p id={`${fieldId}-error`} className="mt-1 text-sm text-red-600">
          {label} cannot exceed {maxLength} characters
        </p>
      )}
    </div>
  );
}

export default TextField;
