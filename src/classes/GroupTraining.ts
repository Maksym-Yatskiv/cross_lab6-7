import { IGroupTraining } from "../interfaces/ITraining";

export class GroupTraining implements IGroupTraining {
    constructor(
        public id: string,
        public title: string,
        public price: number,
        public durationMinutes: number,
        public level: "beginner" | "intermediate" | "advanced",
        public schedule: string,
        public groupSize: number
    ) {}

    getDescription(): string {
        return `Групове заняття (до ${this.groupSize} осіб)`;
    }
}
