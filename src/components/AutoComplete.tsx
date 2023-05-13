import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "./CloseIcon";

type AutocompleteProps = {
  options: string[];
  value: string | string[];
  setValue: any;
  disabled?: boolean;
};

const AutoComplete = ({
  options = [],
  value,
  setValue,
  disabled,
}: AutocompleteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>(
    typeof value === "string" ? value : ""
  );
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      )
    );
  }, [text, options]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.addEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.length === 0) setText("");
  }, [value]);

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const isSelectedOption = (option: string) => {
    return value.includes(option);
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    []
  );

  const handleClickOption = (option: string) => {
    if (isSelectedOption(option)) return;

    setText(option);
    if (typeof value === "object") {
      setValue([...value, option]);
    } else {
      setValue(option);
    }
    setOpen(false);
  };

  return (
    <div className="w-full" ref={ref}>
      <div className="relative flex">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md input-bordered"
          value={text}
          onChange={handleInputChange}
          placeholder="search"
          tabIndex={0}
          onFocus={() => setOpen(true)}
          disabled={disabled}
        />
        <button
          className="absolute right-0 flex items-center justify-center w-10 h-10 transition-all border border-white rounded-md hover:bg-gray-400 group "
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            setText("");
            setOpen(true);
          }}
        >
          <CloseIcon className="w-6 h-6 transition-all stroke-white group-hover:stroke-gray-900" />
        </button>
      </div>
      {open && (
        <div className="absolute z-30 flex-col overflow-x-hidden overflow-y-auto rounded-md dropdown-content bg-base-200 max-h-96">
          <ul
            className="menu menu-compact "
            style={{
              width:
                (ref.current?.clientWidth as number) -
                (filteredOptions.length > 1 ? 14 : 0),
            }}
          >
            {filteredOptions.map((option, index) => {
              return (
                <li
                  key={index}
                  tabIndex={index + 1}
                  onClick={() => handleClickOption(option)}
                  className={`w-full border-b border-b-base-content/10  ${
                    isSelectedOption(option) ? "bg-gray-600" : ""
                  }`}
                >
                  <button>{option}</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(AutoComplete);
