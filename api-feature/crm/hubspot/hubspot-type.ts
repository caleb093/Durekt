
export interface crmDealsType {
    "id": string,
    "name"?: string,
    "stage"?: string,
    "contacts":
        {
            "firstname": string,
            "lastname": string,
            "email": string,
            "phone"?: string
        }[]
}