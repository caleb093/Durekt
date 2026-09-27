import { ChangeEvent, FC } from "react"
import SearchIcon from "../../../public/svgs/search-icon.svg"

interface props {
    className?: string
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    containerClassName?: string;
    showIcon?: boolean
}

const Search:FC<props> = ({className, value, onChange, placeholder, containerClassName, showIcon = true}) => {
    return (
        <div className={` rounded-md border font-light relative overflow-hidden ${containerClassName} `}>
            {showIcon && <SearchIcon className="absolute right-3 top-[19%]" />}
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder ? placeholder : "Search..."}
                type="text"
                className={`bg-[#F8F8FA] py-1 px-3 ${className ? className : "w-[20em]"} `}
            />
        </div>
    )
}

export default Search