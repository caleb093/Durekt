import MoreIcon from "../../../../public/svgs/more-icon.svg"
import CloudIcon from "../../../../public/svgs/cloud-icon.svg"
import Arrow from "../../../../public/svgs/down-traingle-icon.svg"

const ResourceComponent = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-[600] text-[#333333]">Resource Usage</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mt-5">
                <div className="bg-white p-5 rounded-lg flex-1">
                </div>
                <div className="bg-white p-5 rounded-lg flex-1 relative">
                    <div className="bg-[#F4F7FE] absolute right-3 top-3 py-[13px] px-[5px] rounded-lg">
                        <MoreIcon className="scale-[0.85]" />
                    </div>
                    <div className="text-center">
                        <CloudIcon className="mx-auto scale-[0.85]" />
                        <h1 className="text-[#2B3674] font-[700] text-[20px] ">Your Storage</h1>
                        <p className="text-[#A3AED0] font-[400] text-[14px] w-[13em] mx-auto mt-1">Supervise your drive space in the easiest way</p>

                        <div className="mt-12">
                            <div className="flex justify-between text-[#A3AED0] text-[12.6px] mb-1"><p>25.6gb</p><p>50 GB</p></div>
                            <div className="text-[#2B3674] items-center flex text-[14px] flex-shrink-0 flex-[0.8]">
                                <div className="w-[100%] overflow-hidden bg-[#EFF4FB] h-[8px] rounded-lg ">
                                    <div className="w-[40%] rounded-lg h-full bg-[#B3387F]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-[#2B3674] text-[14px] font-[700] ">File Uploads</p>
                        <p className="flex items-center text-[10px] text-[#A3AED0] gap-1">Monthy<Arrow /></p>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white px-4 py-10 text-[#333333] rounded-xl">
                <h1 className="text-[20px] font-[600] text-[#333333]">Optimization suggestions</h1>

                <div className="mt-8 flex flex-col gap-3">
                    <p><span className="font-[700]">Monitoring and Alerts:</span> Set up automated monitoring and alerting systems to detect and respond to resource usage anomalies in real-time.</p>
                    <p><span className="font-[700]">Auto-Scaling:</span> Implement auto-scaling for servers and services, allowing the system to automatically adjust resource allocation based on current demand.</p>
                    <p><span className="font-[700]">Regular Updates:</span> Ensure all software components, including the operating system, drivers, and applications, are regularly updated to benefit from performance improvements and bug fixes.</p>
                    <p><span className="font-[700]">Virtualization:</span>Optimize virtualization settings, such as CPU and memory allocation for virtual machines, to ensure efficient resource utilization.</p>
                </div>
            </div>
        </div>
    )
}

export default ResourceComponent