import { FC, ReactNode, useState } from "react";
import ArrowIcon from "../../../public/svgs/arrow2-icon.svg"
import Loading from "./LoadingSpinner";

interface props<T> {
    items: T[],
    itemsPerPage: number
    // renderItems: (data: {}[]) => ReactNode
    renderItems: (data: T[]) => ReactNode;
    hidePaginationStatus?: boolean
    loading: boolean,
    error: boolean,
    footerClassname?: string
    footer?: (paginationProps: {
        currentPage: number,
        totalPages: number,
        handlePageChange: (page: number) => void,
        itemsPerPage: number,
        start: number,
        end: number,
        handlePageSizeChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
    }) => ReactNode, // Custom footer as a function
}
// @ts-ignore
export const getProgressColor = (value) => {
  if (value <= 69) return 'bg-[#FF5A60]';
  if (value >= 70 && value <= 79) return 'bg-[#F9CA24]';
  if (value >= 80 && value <= 89) return 'bg-[#80DD57]';
  if (value >= 90) return 'bg-[#4CB4FF]';
  return '';
};


const PaginationComponent = <T,>({ items, footerClassname, loading, error, footer, hidePaginationStatus, itemsPerPage: initialItemsPerPage, renderItems }: props<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const totalPages = Math.ceil(items?.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Get current items based on the current page
    const getPaginatedItems = () => {
        return items?.slice(start, end);
    };

    // Function to handle page change
    // @ts-ignore
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page whenever page size changes
    };

    return (
        <div className="flex flex-col h-full">
            {loading && <div className="my-auto flex justify-center items-center"><Loading /></div>}
            {error && <div className="text-red-600 italic text-center my-auto"><p>Error occured</p></div>}
            {(!loading && !error) && <div className="flex flex-col h-full overflow-auto mdx4:overflow-visible">
                {/* Display the paginated items */}
                {renderItems(getPaginatedItems())}
            </div>}
            
            {/* Footer END */}
            {(!loading && !error) &&
                <>
                    {footer ? (
                        <div className={`pt-5 mt-auto ${footerClassname ? footerClassname : ""}`}>
                            {footer({ currentPage, itemsPerPage, totalPages, start, end, handlePageChange, handlePageSizeChange})}
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row justify-between pt-5 mt-auto ">
                            {!hidePaginationStatus && (
                                <p className="text-[#626262]">
                                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, items?.length)}-
                                    {Math.min(currentPage * itemsPerPage, items?.length)} of {items?.length} entries
                                </p>
                            )}

                            <div className={`${footerClassname ? footerClassname : "gap-3"} ${hidePaginationStatus && "mx-auto"} justify-between flex mt-5 sm:mt-0`}>
                                <button
                                    className="rotate-[180deg] scale-[0.9] hover:bg-[#F1F1F1] active:scale-[0.8] rounded-md"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ArrowIcon className="text-[#333333]" />
                                </button>
                                <div className="flex gap-3 text-[14px] items-center">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            className={`${i + 1 === currentPage ? "bg-[#C32781] text-white" : "bg-[#F1F1F1] text-[#333333]"} rounded-md px-3 h-[28px] `}
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            style={{ fontWeight: i + 1 === currentPage ? 'bold' : 'normal' }}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="scale-[0.9] hover:bg-[#F1F1F1] active:scale-[0.8] rounded-md"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <ArrowIcon className="text-[#333333]" />
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Footer END */}   
                </>
            }
        </div>
    );
};

export default PaginationComponent;