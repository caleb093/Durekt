import ProgressCircle from "@/components/secondary/ProgressCircle"
import MoreIcon from "../../../../public/svgs/more-icon.svg"
import { FC } from "react"
import { useGetOverallRatingQuery } from "../../../../api-feature/apiSlice"
import { ApiType } from "../../../../api-feature/types"
import { ratingType } from "../../../../api-feature/manager-owner/team-rating/teamrating-type"
import Loading from "../../secondary/LoadingSpinner"

interface props {
    className?: string
    label?: string
    hideLabel?: boolean
}

interface ratingApiType extends ApiType {
    data: {data: ratingType, success: boolean}
}

const TeamDistribution:FC<props> = ({className, label, hideLabel}) => {
    const {data, status, error} = useGetOverallRatingQuery<ratingApiType>()

    return (
        <div className={` p-3 rounded-lg ${className ? className : "flex-[1.07] bg-white"}`}>
            {!hideLabel && 
                <div className="flex pb-8 justify-between text-[#333333] font-[600]">
                    <p>{label ? label : "Current Team Performance"}</p>
                    {/* <MoreIcon /> */}
                </div>
            }
            {status === "pending" && <Loading customStyle={{display: "flex"}} />}
            {status === "rejected" && 
                <div className="text-red-600 text-[14px] text-center pt-6">
                    <p>Error Occured</p>
                    <p>Reload Page</p>
                </div>
            }
            {(status === "fulfilled" && data?.data) &&
                <div className="flex flex-col gap-8">
                    <ProgressCircle type="progress" value={data?.data?.avgGrade} size={110} label="Overall Rating" />
                    <ProgressCircle type="skill" value={data?.data?.skillSymbol} size={110} label={data?.data?.skillSymbol} />
                </div>
            }
            {(status === "fulfilled" && !data?.data) && 
                <div className="text-[14px] text-[#333333] text-center pt-6">
                    <p>Data Unavailable</p>
                </div> 
            }
            
        </div>
    )
}

export default TeamDistribution