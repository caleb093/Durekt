export interface overviewType {
    improvement_areas: number;
    average_performance: number;
    total_calls_analysed: number;
}

export interface recentCallsType {
    meetingName: string;
    date: string;
    status: string;
    grades: {}
    overallGrade: number
}