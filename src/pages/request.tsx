import HomeLayout from "@/components/layouts/HomeLayout"
import Button from "@/components/primary/Button"
import Input from "@/components/primary/input"
import { useState } from "react"
import toast from "react-hot-toast"
import ActivityIndicator from "@/components/secondary/ActivityIndicator"
import useLoading from "@/components/util/useLoading"

const RequestDemo = () => {
    const {loading, startLoading, stopLoading} = useLoading()
    const [formDetails, setFormDetails] = useState({
        name: "",
        email: ""
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormDetails(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async () => {
        const formData = {
            email: formDetails.email,
            name: formDetails.name
        };

        try {
            startLoading()
            await fetch("https://durekt-backend-engine.onrender.com/api/v1/subscriber", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send the form data as JSON
            })
                .then(response => response.json())
                .then(data => {
                    toast.success("Email submitted")
                    setFormDetails({name: "", email: ""})
                })
                .catch((error) => {
                    toast.error("Error occured")
            });
        } catch(error) {
            toast.error("Error occured")
        } finally {
            stopLoading()
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[55vh] flex flex-col items-center justify-center">
                <h1 className="text-[1.8em]">Request Demo</h1>
                <div className="w-[25em] mt-4 text-black">
                    <Input 
                        onChange={handleOnChange}
                        value={formDetails.name}
                        label={<label className="text-white">Name</label>}
                        name="name"
                        placeholder=""
                        type="text"
                    />
                    <Input 
                        onChange={handleOnChange}
                        value={formDetails.email}
                        label={<label className="text-white">Email</label>}
                        name="email"
                        placeholder=""
                        type="email"
                    />
                    <Button className="h-[2.68em]" onClick={handleSubmit} disabled={loading} >{loading ? <ActivityIndicator /> : "Request Demo"}</Button>
                </div>
            </div>
        </HomeLayout>
    )
}

export default RequestDemo