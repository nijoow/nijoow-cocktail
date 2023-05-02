import classNames from "classnames";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

type AutocompleteProps = {
  options: string[];
  value: string;
  setValue(val: string): void;
};

const Autocomplete = ({ options = [], value, setValue }: AutocompleteProps) => {
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
      <input
        type="text"
        className="w-full input input-bordered"
        value={value}
        onChange={handleInputChange}
        placeholder="search"
        tabIndex={0}
      />
      <div className="flex-col overflow-auto rounded-md dropdown-content bg-base-200 top-12 max-h-96">
        <ul
          className="menu menu-compact "
          style={{ width: ref.current?.clientWidth }}
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

export default memo(Autocomplete);
