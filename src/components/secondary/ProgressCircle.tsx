import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface props {
    value: number | string
    size: number
    label?: string | ReactNode
    textClassname?: string
    labelClassname?: string
    type: "progress" | "skill"
}

const ProgressCircle:FC<props> = ({ value, type, size, label, labelClassname, textClassname }) => {
  const angle = type === "progress" ? (Number(value) * 4) - 40 : 290

  return (
        <div className=" flex flex-col sm:flex-row gap-3 items-center">
            <Box
                sx={{
                    background: `radial-gradient(white 50%, transparent 0%),
                        conic-gradient(transparent 0deg ${angle}deg, #F8F8FA ${angle}deg 360deg),
                        linear-gradient(to bottom, #6FA9E2, #B3387F)`,
                    borderRadius: "50%",
                    rotate: "110deg",
                    width: `${size}px`,
                    height: `${size}px`,
                    textAlign: "center",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <p className={` font-[700] rotate-[-110deg] ${textClassname ? textClassname : "text-[25px]"}`}>{value}</p>
            </Box>
            {type === "progress" && <p className={`text-[18px] font-[500] ${labelClassname}`}>{label}</p>}
            {type === "skill" && <p className={`text-[18px] font-[500] flex flex-col ${labelClassname}`}>Top Skills <span className=" inline-block text-[#828282] text-[14px]">{label}</span></p>}
        </div>
        
    );
};

export default ProgressCircle;
