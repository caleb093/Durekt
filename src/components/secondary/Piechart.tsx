import { PieChart } from "@mui/x-charts"
import { LinearProgress } from "@mui/material"
import { FC } from "react"

interface props {
    data: {label: string, value: number, color: string}[]
}


const PiechartComponent:FC<props> = ({data}) => {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-0'>
            <div className='w-[100%] flex flex-col items-center sm:items-start sm:w-[40%]'>
                <PieChart 
                    series={[
                        {
                            data: data,
                            innerRadius: 50,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
                        }
                    ]}
                    slotProps={{
                        legend: {hidden: true}
                    }}
                    width={270}
                    height={210}
                />
            </div>
            <div className='flex max-h-[20em] pr-2 overflow-auto flex-col gap-4'>
                {data.map((item, i) => (
                    <div>
                        <p className='text-[14px] text-[#6D6D6D]'>{item.label}</p>
                        <div className='flex items-center gap-2'>
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                sx={{
                                    width: '150px',
                                    height: '10px',
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: item.color,
                                    },
                                }}
                            />
                            <span>{item.value}%</span>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default PiechartComponent