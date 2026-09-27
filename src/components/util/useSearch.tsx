import { useState } from "react"

const useSearch = () => {
    const [searchInput, setSearchInput] = useState("")

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchInput(e.target.value)
    }

    return {searchInput, handleSearchChange}
}

export default useSearch