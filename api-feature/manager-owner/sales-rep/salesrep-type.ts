export interface SalesrepType {
    firstName: string,
    lastName: string,
    grade: number,
    skills: string,
    skillSymbol: string
    url?: string
}

export interface AreaofconcernType {
    grade: number;
    skillName: string;
    skillSymbol: string
}

export interface scheduleTrainingsType {
    progress: string;
    trainingTopic: {
        title: string;
        training: {
            title: string
        }
    }
}

export interface AssignedDealsType {
    name: string
}

export interface SalesRepPerformanceType {
    user: {
        firstName: string;
        lastName: string;
        id: number;
        CompanyUser: {position: string}[]
        url?: string
    },
    overall: number;
    role: string;
    skills: {} 
}

export interface salesrepActivitiesType {
    report?: string, 
    dealCount: number, 
    meetingCount: string
}