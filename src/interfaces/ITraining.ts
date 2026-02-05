export interface ITrainingBase {
    id: string;
    type: "personal" | "group" | "online" | "membership"
    title: string;
    price: number;
    durationMinutes: number;
    level: "beginner" | "intermediate" | "advanced";
    schedule: string;

    getDescription(): string;
}

export interface IPersonalTraining extends ITrainingBase {
    trainerName: string;
}

export interface IGroupTraining extends ITrainingBase {
    groupSize: number;
}

export interface IMembership extends ITrainingBase {
    durationMonths: number;
}

export interface IOnlineTraining extends ITrainingBase {
    platform: string;
}
