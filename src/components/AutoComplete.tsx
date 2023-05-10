import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { SetterOrUpdater } from "recoil";
import CloseIcon from "./CloseIcon";

type AutocompleteProps = {
  options: string[];
  value: string | string[];
  setValue: any;
};

const AutoComplete = ({ options = [], value, setValue }: AutocompleteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    setFilteredOptions(options.filter((option) => option.includes(text)));
  }, [text, options]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.addEventListener("click", handleClickOutside);
  }, []);

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
      setValue(event.target.value);
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
          className="w-full py-2 px-4  input-bordered rounded-md"
          value={text}
          onChange={handleInputChange}
          placeholder="search"
          tabIndex={0}
          onFocus={() => setOpen(true)}
        />
        <button
          className=" h-10 w-10 flex items-center justify-center rounded-md border transition-all hover:bg-gray-400 border-white absolute right-0"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setText("");
            setOpen(true);
          }}
        >
          <CloseIcon className="h-6 w-6 stroke-whte hover:stroke-gray-900 transition-all" />
        </button>
      </div>
      {open && (
        <div className="z-30 absolute flex-col overflow-x-hidden overflow-y-auto rounded-md dropdown-content bg-base-200 max-h-96">
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
