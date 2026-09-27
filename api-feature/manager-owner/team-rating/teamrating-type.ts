export interface ratingType {
    skillName: string,
    skillSymbol: string,
    avgGrade: number
}

export interface teamRatingType {
    skillSymbol: string,
    skillName: string,
    currentAvg: number,
    growth: number
}