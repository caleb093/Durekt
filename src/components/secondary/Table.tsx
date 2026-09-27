import React, { ReactNode, useEffect, useState } from "react";
import { GridColDef, GridEventListener, GridPreferencePanelsValue, GridRowHeightParams, GridRowHeightReturnValue, useGridApiRef } from "@mui/x-data-grid";
import Search from "./Search";
import FilterIcon from "../../../public/svgs/filter-icon.svg"
import { Box, Checkbox } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import CustomGridFooter from "./TableFooter";
import { ChangeEvent, FC } from "react";
import Button from "../primary/Button";
import useClickOutside from "../util/useClickOutside";
 
interface props {
    searchInput: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    filteredRows: {}[];
    columns: GridColDef[];
    csv?: boolean;
    handleSelectCell?: GridEventListener<"cellClick">;
    title?: string | ReactNode
    columnHeaderHeight?: number
    rowHeight?: number
    className?: string,
    containerClassName?: string;
    getRowHeight?: (params: GridRowHeightParams) => GridRowHeightReturnValue,
    admin?: boolean
    checkbox?: boolean
    hideFooter?: boolean
    hideHelpers?: boolean
    disableRowSelectionOnClick?: boolean
    hideHeader?: boolean
    loading: boolean
    getRowIdField: string
    fetchMoreData?: () => void
    customHeader?: ReactNode;
    hideColumns?: Record<string, boolean>
}

const Table: FC<props> = React.memo(({ searchInput, hideColumns, customHeader, fetchMoreData, containerClassName, getRowIdField, loading, getRowHeight, disableRowSelectionOnClick, checkbox, hideFooter, hideHeader, hideHelpers, columnHeaderHeight, admin, rowHeight, className, handleSearchChange, filteredRows, columns, csv, handleSelectCell = () => { }, title }) => {
    const apiRef = useGridApiRef();
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<Record<string, boolean>>(hideColumns ?? {});
    const [openManageColums, setOpenManageColumns] = useState(false)
    const columnRef = useClickOutside<HTMLDivElement>(() => closeToggleColumn());
    const [searchText, setSearchText] = useState(""); // State for search input

    const filteredColumns = Object.keys(columnVisibilityModel).filter((key) =>
        key.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleColumnSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const toggleDisplayColumn = () => {
        setOpenManageColumns(prev => !prev)
    }

    const resetColumnVisibility = () => {
        setColumnVisibilityModel(prev => Object.fromEntries(
            Object.keys(prev).map(key => [key, false])
        ));
        setSearchText("")
    };

    const closeToggleColumn = () => {
        setOpenManageColumns(false)
        setSearchText("")
    }

    const toggleColumn = (field: string) => {
        setColumnVisibilityModel((prev) => {
            return {
                ...prev,
                [field]: !(prev[field] ?? false), // Ensure it toggles safely
            };
        });
    };

    // const toggleColumn = (field: string) => {
    //     console.log(field)
    //     console.log(columnVisibilityModel[field])
    //     setColumnVisibilityModel((prev) => ({
    //         ...prev,
    //         [field]: !prev[field],
    //     }));
    // };


    function handleExport() {
        apiRef.current.exportDataAsCsv();
    }

    function handleFilter() {
        apiRef.current.showFilterPanel()
    }

    function manageColumns() {
        apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    }

    const getNestedFieldValue = (obj: Record<string, any>, path: string): any => {
        return path?.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const filterElement =
        <div onClick={handleFilter} className={`${!admin ? "text-white" : "text-[#5B5B5B]"} cursor-pointer border hover:bg-[#5B5B5B] hover:text-white active:scale-[0.95] transition-all border-[#D4D4D4] flex items-center text-[14px] gap-2 rounded-md px-3 py-1`}>
            <FilterIcon className="h-5 w-5" />
            <p>Filter by</p>
        </div>
    

    return (
        <div className={`${containerClassName ? containerClassName : `${!admin ? "bg-[#121121] text-white" : "bg-white"} p-4 rounded-2xl pb-[25px] relative `} `}>
            {customHeader ? customHeader :
                <>
                    {!hideHeader && <h1 className={`pb-3 ${!admin ? "text-white" : "text-[#333333]"} text-[20px] font-[500]`}>{title ? title : "Durekt Table"}</h1>}
                    {!hideHelpers && <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <div className="flex gap-3">
                            <Search
                                className="w-full sm:w-[14em] text-black"
                                value={searchInput}
                                onChange={handleSearchChange}
                                showIcon
                            />
                            {hideColumns && filterElement}
                        </div>
                        <div className="flex gap-3 items-center">
                            {!hideColumns ? filterElement : <button className="flex bg-white h-full active:scale-[0.97] transition-all px-3 rounded-lg items-center border border-[#C32781]" onClick={toggleDisplayColumn}><p className="text-[#C32781]">Cusomize Table</p></button>}
                            {csv && <div onClick={handleExport} className=" cursor-pointer border-[0.1px] hover:bg-[#C32781] hover:text-white active:scale-[0.95] transition-all rounded-md border-[#C32781] px-3 py-1 text-[14px] text-[#C32781] font-[500]">
                                Export CSV
                            </div>}
                        </div>
                    </div>}
                </>
            }

            {/* Custom Manage Columns UI */}
            {openManageColums && <div ref={columnRef} className="custom-manage-columns bg-white text-[#4A4949] absolute z-[7] border left-0 w-[60%] mt-3 py-2 max-h-[60vh] overflow-auto">
                <div className="px-3 ">
                    <Search value={searchText} onChange={handleColumnSearchChange} placeholder="search" className="w-full" />
                    <div className="flex flex-col mt-2">
                        {/* {columns.map((col) => (
                            <label key={col.field} className="flex items-center">
                                <Checkbox 
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "#B3387F"
                                        }
                                    }} 
                                    checked={columnVisibilityModel[col.field] ?? true} 
                                    onChange={() => toggleColumn(col.field)} 
                                />
                                {col.headerName ?? col.field}
                            </label>
                        ))} */}
                        {/* {Object.entries(columnVisibilityModel).map(([field, isVisible]) => (
                            <label key={field} className="flex items-center">
                                <Checkbox 
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "#B3387F"
                                        }
                                    }} 
                                    checked={isVisible} 
                                    onChange={() => toggleColumn(field)} 
                                />
                                {field.replace(/_/g, ' ')}
                            </label>
                        ))} */}
                        {filteredColumns.map((field) => (
                            <label key={field} className="flex items-center">
                                <Checkbox 
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "#B3387F"
                                        }
                                    }} 
                                    checked={columnVisibilityModel[field] ?? true} 
                                    onChange={() => setColumnVisibilityModel(prev => ({
                                        ...prev,
                                        [field]: !prev[field]
                                    }))}
                                />
                                {field.replace(/_/g, ' ')}
                            </label>
                        ))}
                    </div>
                </div>
                <hr className="pb-4 mt-1" />
                <div className="flex items-center px-4 ">
                    <div className="w-[8em]">
                        <Button onClick={() => {setOpenManageColumns(false), setSearchText(""), resetColumnVisibility()}} className="bg-white border border-[#B3387F]"><span className="text-[#B3387F]">Cancel</span></Button>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <Button onClick={toggleDisplayColumn} className="px-5">Apply</Button>
                        <Button onClick={resetColumnVisibility} className="bg-transparent"><span className="text-[#4A4949]" >Clear</span></Button>
                    </div>
                </div>
            </div>}

            <div className="overflow-hidden flex-1">
                <Box
                    m={hideHelpers ? "10px 0 0 0" : "40px 0 0 0"}
                    sx={{
                        "& .MuiDataGrid-root .MuiDataGrid-container--top [role=row]": !admin ? {
                            background: "linear-gradient(to right, #B3387F, #6FA9E2)",
                            color: "white",
                        } : {
                            backgroundColor: "#F4F7FE",
                            borderRadius: "20px"
                        },
                        "& .MuiDataGrid-root": {
                            border: "none" // To remove table surrounding border
                        },
                        "& .center-cell-text": {
                            textAlign: "center",
                            backgroundColor: "transparent"
                        },
                        "& .date-column--cell": {
                            whiteSpace: "normal", // Allows text to wrap
                            wordWrap: "break-word", // Breaks long words onto the next line
                            lineHeight: "1.2", // Adjust line height for better readability
                            display: "flex",
                            alignItems: "center",
                        },
                        "& .MuiDataGrid-row": !admin ? {
                            backgroundColor: "rgba(82, 77, 94, 1)",
                            color: "white",
                        } : {
                            backgroundColor: "white"
                        },
                        "& .MuiDataGrid-root .MuiDataGrid-row": !admin ? {
                            // '--rowBorderColor': 'transparent', // remove horizontal row lines
                        } : {},
                        "& .fullLength-column--cell": {
                            whiteSpace: "normal", // Ensures text wraps
                            wordWrap: "break-word", // Allows long words to wrap
                            display: "block", // Ensures the cell can stretch vertically
                        },
                        "& .MuiDataGrid-root .MuiDataGrid-cell": admin ? {
                            borderTop: "none !important",
                        } : {},
                        "& .MuiCheckbox-root": {
                            color: `#333333 !important`,
                            transform: "scale(0.8)",       // Reduce size to 80% (adjust as needed)
                        }
                    }}
                >
                    <DataGrid
                        sx={admin ? {
                            border: "none",
                        } : {}}
                        style={admin ? { backgroundColor: 'white' } : { backgroundColor: "rgba(60, 56, 69, 1)" }}
                        loading={loading}
                        getRowId={(row) =>
                            typeof getRowIdField === "function"
                                // @ts-ignore
                                ? getRowIdField(row) // If a custom function is provided, use it
                                : getNestedFieldValue(row, getRowIdField) // Otherwise, handle both direct and nested fields
                        }
                        checkboxSelection={checkbox}
                        disableRowSelectionOnClick={disableRowSelectionOnClick}
                        hideFooter={hideFooter}
                        className={className}
                        apiRef={apiRef}
                        // @ts-ignore
                        slots={{ footer: CustomGridFooter }}
                        slotProps={{
                            footer: {
                                fetchMoreData,
                                admin
                            } as any
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }, // Set the number of rows per page to 5
                            },
                            // columns: {
                            //     // columnVisibilityModel: hideColumns ? hideColumns : {}
                            //     columnVisibilityModel: columnVisibilityModel ? columnVisibilityModel : {}, // Control visibility
                            // },
                        }}
                        columnVisibilityModel={columnVisibilityModel}
                        onColumnVisibilityModelChange={(newModel) => {
                            console.log("Updated Column Visibility:", newModel); // Debugging
                            setColumnVisibilityModel(newModel);
                        }}
                        columnHeaderHeight={columnHeaderHeight ? columnHeaderHeight : 68}
                        rowHeight={rowHeight ? rowHeight : 75}
                        getRowHeight={getRowHeight ? getRowHeight : undefined} // will take a higher precedence over "rowHeight" if defined
                        pageSizeOptions={([5, 10, 20])}
                        rows={filteredRows}
                        columns={columns}
                        onCellClick={handleSelectCell}
                        autoHeight
                    />
                </Box>
            </div>
        </div>
    )
});

export default Table