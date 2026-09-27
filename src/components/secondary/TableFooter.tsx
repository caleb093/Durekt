import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector, gridRowCountSelector, GridToolbar } from '@mui/x-data-grid';
import NavIcon from "../../../public/svgs/next-icon.svg"
import React, { FC, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Props {
    fetchMoreData: () => void
    admin?: boolean
}

const CustomGridFooter:FC<Props> = React.memo(({fetchMoreData = () => {}, admin}) => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
    const [pageSize, setPageSize] = useState<number>(5);

    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, totalRowCount);

    const handleNextPage = async () => {
        if (end === totalRowCount) {
            fetchMoreData()
        }
        else if (page < pageCount - 1) {
            apiRef.current.setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            apiRef.current.setPage(page - 1);
        }
    };

    const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
        const newSize = event.target.value;
        // @ts-ignore
        setPageSize(newSize);
        // @ts-ignore
        apiRef.current.setPageSize(newSize);
    };

    return (
        <Box
            className="flex flex-col items-start mdx2:flex-row mdx2:items-center gap-3 mdx2:gap-0"
            sx={{
                justifyContent: 'space-between',
                paddingTop: '25px',
                backgroundColor: !admin ? '#121121' : '#f5f5f5',
                // borderTop: '1px solid #ccc',
            }}
        >

            <div className='mt-4 sm:mt-0'>
                <p className={`${!admin ? "text-white" : "text-[#626262]"} font-light text-[14px]`}>{`Showing ${start} - ${end} of ${totalRowCount} entries`}</p>
            </div>
            <div className='flex flex-col-reverse sm:flex-row gap-4  w-full sm:w-auto'>
                <div className='flex items-center gap-2 justify-between mt-4 sm:mt-0 '>
                    <button className={`${!admin && "text-slate-300 hover:text-black "}hover:bg-slate-300 mr-3 scale-[0.85] cursor-pointer rounded-lg active:scale-[1.05] transition-all p-1`} onClick={handlePreviousPage} disabled={page === 0}><NavIcon /></button>
                    <div className='flex items-center gap-1 text-[#333333]'>
                        <p className={`${!admin ? "text-[#524D5E]" : "text-[#626262]"}`}>Page</p>
                        <div className='bg-white border border-[#D4D4D4] ml-3 mr-1 rounded-md w-14 pl-2 '><p>{page + 1}</p></div>
                        <p className={`${!admin ? "text-[#524D5E]" : "text-[#626262]"}`}>of <span className='pl-1'>{pageCount}</span></p>
                    </div>
                    <button className={`${!admin && "text-slate-300 hover:text-black "} rotate-[180deg] ml-2 scale-[0.85]  cursor-pointer hover:bg-slate-300 rounded-lg active:scale-[1.05] transition-all p-1`} onClick={handleNextPage} ><NavIcon /></button>
                </div>
                
                <div className="flex items-center border border-[#D4D4D4CC] rounded-md pl-4 h-10 gap-3 bg-white">
                    <span className='text-[#333333] text-[14px] font-[400]'>Entries per page:</span>
                    <Select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        sx={{ height: "100%", border: "none"}}
                        className=' border-rose-600 w-[70px] text-[13px] font-[500] ml-auto'
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </div>

            </div>
        </Box>
    );
})

export default CustomGridFooter