import { FC, ReactNode, useEffect, useRef } from "react";
import CloseIcon from "../../../public/svgs/close-icon.svg"

interface modalType {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
    className?: unknown;
    containerClassname?: string
    closeOnClickOutside?: boolean;
    hideCloseIcon?: boolean;
}

const Modal: FC<modalType> = ({ isOpen, onClose, hideCloseIcon, children, className = "", containerClassname, closeOnClickOutside = true }) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      
      if (!closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        // FOR MATERIAL UI TIME AND DATE PICKER 
        const pickerPopups = Array.from(document.querySelectorAll(".MuiPopper-root, .MuiPopover-root"));
        for (let popup of pickerPopups) {
          if (popup.contains(event.target as Node)) {
            return;
          }
        }
        //////////////////////////////////////////

      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen) {
      return null;
    }

    return (
      <div className="fixed z-[8] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div ref={modalRef} className={`relative ${containerClassname ? containerClassname : " bg-white rounded-lg shadow-lg w-[90%] md:w-[35em]"}`}>
          {!hideCloseIcon && <button className="absolute text-[1.8em] right-4 sm:right-8 text-gray-600 z-[2] mt-5 bg-white" onClick={onClose}>
            <CloseIcon />
          </button>}
          <div className={`${className}`}>{children}</div>
        </div>
      </div>
    );
  };

export default Modal