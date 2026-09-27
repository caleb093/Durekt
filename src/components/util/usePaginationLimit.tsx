import { useState } from "react"

const usePaginationLimit = () => {
    const [dataLimit, setDataLimit] = useState(40)

    const getMoreData = () => {
        setDataLimit(prev => prev * 2)
    }

    return {dataLimit, getMoreData}
}

export default usePaginationLimit