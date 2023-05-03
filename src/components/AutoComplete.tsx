import React, { memo, useCallback, useEffect, useRef, useState } from "react";

type AutocompleteProps = {
  options: string[];
  value: string;
  setValue(val: string): void;
};

const AutoComplete = ({ options = [], value, setValue }: AutocompleteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    setFilteredOptions(options.filter((option) => option.includes(value)));
  }, [value, options]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  return (
    <div className="w-full dropdown" ref={ref}>
      <div className="relative">
        <input
          type="text"
          className="w-full input input-bordered"
          value={value}
          onChange={handleInputChange}
          placeholder="search"
          tabIndex={0}
        />
        <button
          className="btn btn-square btn-outline absolute right-0"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setValue("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-col overflow-y-auto rounded-md dropdown-content bg-base-200 top-12 max-h-96">
        <ul
          className="menu menu-compact "
          style={{ width: ref.current?.clientWidth as number }}
        >
          {filteredOptions.map((option, index) => {
            return (
              <li
                key={index}
                tabIndex={index + 1}
                onClick={() => {
                  setValue(option);
                }}
                className="w-full border-b border-b-base-content/10"
              >
                <button>{option}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(AutoComplete);
