import { FC, ReactNode, useState } from "react";
import MoreIcon from "../../../public/svgs/more-icon.svg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

interface props {
    data: {},
    options: ReactNode,
    className?: string
}


const TableActionsMenu:FC<props> = ({data, className, options}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget as HTMLElement);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <div className=" cursor-pointer h-[30px] flex items-center ">
                    <MoreIcon className=" rotate-[90deg] scale-[0.7]" />
                </div>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <div className={className} onClick={handleClose}>{options}</div>
            </Menu>
        </>
    );
};

export default TableActionsMenu