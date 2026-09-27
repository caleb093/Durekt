export interface teamType {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    roles: number[]
    userId: number;
}

export interface createTeambodyType {
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    roleIds: number[]
}

export interface teamRoleType {
    id: number;
    name: string
}