import DashboardLayout from "@/components/layouts/DashboardLayout"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"

const Index = () => {
    const router = useRouter()

    useLayoutEffect(() => {
        router.replace("/dashboard")
    })

    return (
        <DashboardLayout>
            <></>
        </DashboardLayout>
    )
}

export default Index