import axios from "axios"
import Google from "../../../public/svgs/icons_google.svg"
import Microsoft from "../../../public/svgs/microsoft_icon.svg"
import toast from "react-hot-toast"
import { FC } from "react"

interface props {
    changeRequestStatus: (status: "idle" | "pending") => void
}

const GoogleMicrosoft:FC<props> = ({changeRequestStatus}) => {

    const googleSignIn = async (type: "google" | "microsoft") => {
        const toastId = toast.loading("loading")
        changeRequestStatus("pending")
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${type}-auth`)
            const data = response.data
            console.log(data)
            window.open(data?.data, "_self");
            toast.success("Redirecting")
        } catch(error) {
            toast.error("Error occured")            
            console.error(error)
        } finally {
            toast.dismiss(toastId)
            changeRequestStatus("idle")
            console.log("Finally")
        }
    }


    return (
        <div className="flex gap-10 mt-7">
            <div onClick={() => googleSignIn("google")} className="hover:bg-[#B3387F] hover:text-white transition-all duration-[0.3s] cursor-pointer border text-[0.9em] text-[#333333] rounded-md font-normal border-[#D4D4D4] flex-1 text-center py-2 flex justify-center items-center gap-2">
                <Google />
                <p>Google</p>
                <div className="absolute z-[1]"></div>
            </div>
            <div onClick={() => googleSignIn("microsoft")} className="cursor-pointer hover:bg-[#B3387F] hover:text-white transition-all duration-[0.3s] border text-[0.9em] text-[#333333] rounded-md font-normal border-[#D4D4D4] flex-1 text-center py-2 flex justify-center items-center gap-2">
                <Microsoft />
                <p>Microsoft</p>
            </div>
        </div>
    )
}

export default GoogleMicrosoft