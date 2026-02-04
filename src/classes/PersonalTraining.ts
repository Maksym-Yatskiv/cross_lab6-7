import { IPersonalTraining } from "../interfaces/ITraining";

export class PersonalTraining implements IPersonalTraining {
    constructor(
        public id: string,
        public title: string,
        public price: number,
        public durationMinutes: number,
        public level: "beginner" | "intermediate" | "advanced",
        public schedule: string,
        public trainerName: string
    ) {}

    getDescription(): string {
        return `Персональне тренування з тренером ${this.trainerName}`;
    }
}
