import { globalState } from "../../../api-feature/apiSlice"
import AdminTraining from "./admin/training-admin"

const TrainingManagementComponent = () => {
    const {account_type} = globalState
    
    return (
        <div>
            {account_type === "admin" && <AdminTraining />}
        </div>
    )
}

export default TrainingManagementComponent