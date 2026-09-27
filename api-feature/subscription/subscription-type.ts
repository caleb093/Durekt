export interface subscriptionType {
    id: number;
    name: string;
    price: number;
    billingCycle: string;
    maxAgents: number;
    maxTeam: number;
    features: string[];
    currency: {
        name: string;
        symbol: string;
    }
}

export interface subHistoryType {
    id: number,
    amountPaid: number,
    billingEnd: Date,
    billingStart: Date,
    status: string,
    subscriptionPlan: {
        name: string
    }
}