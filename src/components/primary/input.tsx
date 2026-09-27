import React, { ChangeEvent, FC, ReactNode, useState } from "react"
import LockIcon from "../../../public/svgs/lock_icon.svg"
import ArrowIcon from "../../../public/svgs/arrow2-icon.svg"
import useClickOutside from "../util/useClickOutside";
import Loading from "../secondary/LoadingSpinner";

interface Props {
  searchInput?: string;
  handleSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  optionsLoading?: boolean
  label?: ReactNode; 
  placeholder: string; 
  type?: "email" | "text" | "password" | "textarea";
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  // options?: string[]; // For select input options
  options?: {value: string | number; name: string}[]; // For select input options
  select?: boolean; // If true, render a select input
  className?: string;
  disabled?: boolean;
  inputClassname?: string;
  selectIcon?: boolean
}

const Input: FC<Props> = React.memo(({searchInput, selectIcon, optionsLoading, handleSearchChange, label, placeholder, type = "text",  disabled, inputClassname, name, value, onChange, options, select, className }) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls dropdown visibility

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsDropdownOpen(false));

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Filter options based on search term
  const filteredOptions = !searchInput ? options : options?.filter((option) =>
    option.name.toLowerCase().includes(searchInput?.toLowerCase())
  );

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (optionValue: string | number) => {
    if (onChange) {
      onChange({ target: { value: optionValue, name } } as React.ChangeEvent<HTMLInputElement>);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className={`flex w-full flex-col items-start mb-5 ${className}`}>
      {label}
      <div className="relative w-full">
        {select ? (
          <div className="relative" ref={dropdownRef} >
            <div
              className={`w-full mt-1 border border-[#D0D5DD] rounded-md cursor-pointer ${inputClassname ? inputClassname : "p-2"}`}
              onClick={handleDropdownToggle}
            >
              {options?.find(item => item.value === value)?.name || placeholder}
            </div>
            
            {selectIcon && <ArrowIcon className="absolute top-[4.5px] right-1 rotate-[90deg]" />}

            {isDropdownOpen && (
              <div className="absolute flex flex-col top-[-5px] z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {/* Search input within the dropdown */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput ?? ""}
                  onChange={handleSearchChange ? handleSearchChange : () => {}}
                  className="w-full p-2 border-b border-gray-200"
                />

                {/* Options */}
                {optionsLoading ? <Loading /> : filteredOptions?.length ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionSelect(option?.value)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {option.name}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No options found</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            {isPassword && <LockIcon onClick={handleShowPassword} className=" cursor-pointer absolute bottom-[25%] right-4" />}
            {type !== "textarea" ? (
              <input
                disabled={disabled}
                value={value}
                onChange={onChange}
                className={`w-full mt-1 border border-[#D0D5DD] rounded-md text-[15px] ${inputClassname ? inputClassname : "p-2"}`}
                type={!isPassword ? type : showPassword ? "text" : "password"}
                placeholder={placeholder}
                name={name}
              />
            ) : (
              <textarea
                disabled={disabled}
                value={value}
                // @ts-ignore
                onChange={onChange}
                className="w-full mt-1 min-h-[10em] max-h-[10em] p-2 border border-[#D0D5DD] rounded-md"
                placeholder={placeholder}
                name={name}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
});


// const Input: FC<Props> = React.memo(({ label, placeholder, type = 'text', disabled, name, value, onChange, options, select, className }) => {
//   const isPassword = type === "password"
//   const [showPassword, setShowPassword] = useState(false)

//   const handleShowPassword = () => {
//     setShowPassword(prev => !prev)
//   }

//   return (
//     <div className={`flex w-full flex-col items-start mb-5 ${className}`}>
//       {label}
//       <div className="relative w-full">
//         {select ? (
//           <select
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="w-full mt-1 p-2 border border-[#D0D5DD] rounded-md"
//           >
//             <option disabled selected value={""} hidden >{value ? value : placeholder}</option>
//             {options?.map((option, index) => (
//               <option key={index} value={option?.value}>
//                 {option?.name}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <>
//             {isPassword && <LockIcon onClick={handleShowPassword} className=" cursor-pointer absolute bottom-[25%] right-4" />}
//             {type !== "textarea" ? <input
//               disabled={disabled}
//               value={value}
//               onChange={onChange}
//               className="w-full mt-1 p-2 border border-[#D0D5DD] rounded-md text-[15px]"
//               type={!isPassword ? type : showPassword ? "text" : "password"}
//               placeholder={placeholder}
//               name={name}
//             /> : 
//               <textarea 
//                 disabled={disabled}
//                 value={value}
//                 // @ts-ignore
//                 onChange={onChange}
//                 className="w-full mt-1 min-h-[10em] max-h-[10em] p-2 border border-[#D0D5DD] rounded-md"
//                 type={type}
//                 placeholder={placeholder}
//                 name={name}
//               />
//             }


//           </>
//         )}
//       </div>
//     </div>
//   );
// })

export default Input;