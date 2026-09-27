export type dealStage = "Prospecting" | "Negotiating" | "Closing" | "Abadoned" | "Hanging"

export interface dealsType {
    id: number
    client: string
    name: string
    status: string
    stage: {name: string}
    _count: {
        salesReps: string
    }
}

export interface dealStagesType {
    id: number;
    name: dealStage
}

export interface dealSalesrepPerformanceType {
    user: {
        firstName: string;
        lastName: string;
        id: number;
        companyUser: []
    }
    role: string;
    overall: number;
    skills: {}
}

export interface dealsOverviewType {
    details: {
        id: number;
        name: string;
        client: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        stage: {
            name: string;
        }
        report?: string
    }
    overall_deal_health: number
}

export interface dealMeetingsDataType {
    meetingName: string;
    date: Date;
    status: string;
    grades: {
        CP: 0;
        CC: 0;
        BR: 0
    }
}

export interface notesType {
    id: number
    message: string;
    updatedAt: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        url?: string
    }
}