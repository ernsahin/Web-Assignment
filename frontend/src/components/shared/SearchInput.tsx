interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onPageReset?: () => void;
}

function SearchInput({
  placeholder,
  value,
  onChange,
  onPageReset,
}: SearchInputProps) {
  const inputId = `search-input-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    onPageReset?.();
  };

  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        id={inputId}
        name={inputId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default SearchInput;
