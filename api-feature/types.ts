export type ACCOUNT_TYPE = "" | "admin" | "manager" | "sales personel" | "owner" 

export type APISTATUS = "fulfilled" | "pending" | "rejected" | "uninitialized"

export const TOKEN_NAME = "durket-token"

export interface AuthResponseType {
    success: boolean,
    data: {
        accessToken: string
    }
}

export interface ApiType {
  status: APISTATUS,
  error: unknown
}

export interface SkillsType {
    id: number,
    name: string,
    symbol: string
}

export interface topSkillType {
    name: string, 
    skillId: number, 
    is_favourite: boolean, 
    symbol: string, 
    description: string
}

export interface successResponseType {
    success: boolean;
    message: string
}

type paginatedDataType = {
    totalDeal: number,
    totalPages: number,
    currentPage: number
}

export interface profileType {
    id: number;
    firstName: string;
    lastName: string;
    url?: string;
    email: string;
    company: {
        id: number;
        name: string;
        position: string;
        roles: {position: string, roles: {title: ACCOUNT_TYPE, id: number, is_active: boolean}[]}[]
    }
    current_subscription?: {
        status: string,
        billingStart: Date,
        billingEnd: Date,
        subscriptionPlan: {
            name: string
        }
    }
}

// export interface subscriptionType {
//     id: number;
//     name: string;
//     price: number;
//     billingCycle: string;
//     maxAgents: number;
//     maxTeam: number;
//     features: string[];
//     currency: {
//         name: string;
//         symbol: string;
//     }
// }

export interface insightsType {
    skill: string; grade: number; skillSymbol: string
}

export interface platformType {
    id: number;
    name: string;
    status: boolean;
    logo: string
}

export interface notificationsType {
    id: string;
    title: string;
    message: string;
    read: boolean
}